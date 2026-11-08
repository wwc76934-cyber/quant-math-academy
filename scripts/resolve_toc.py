"""Resolve real TOC page numbers by locating each entry's heading inside the printed PDF.

The DOM-based page simulation drifts (Chrome print inserts breaks that screen layout does
not), so page numbers are read back from the actual PDF instead.

Two robustness measures:
  * NFKC normalisation folds the Kangxi-radical glyphs that font subsetting produces
    (U+2F63 KANGXI RADICAL LIFE -> 生) back to the CJK characters headings actually use,
    and punctuation/whitespace is stripped so wrapped headings still compare equal.
  * Entries are searched monotonically forward with several distinctive probes each, so a
    handful of corrupted glyphs in one probe cannot hide the heading, and document order
    prevents a stray match from an earlier page being accepted.
"""
import json
import re
import sys
import unicodedata

sys.path.insert(0, r'C:\Users\18137\Documents\deepseek-harness\default-workspace\.python-packages')
from pypdf import PdfReader  # noqa: E402

pdf_path, items_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

DROP = re.compile(r'[\s\u00a0\u2000-\u200b\u3000.\u00b7\u2013\u2014\u2015\-_,，、。;；:：!！?？()（）\[\]【】"\'“”‘’]+')


def norm(s: str) -> str:
    return DROP.sub('', unicodedata.normalize('NFKC', s))


def probes(needle: str):
    """Distinctive fragments of the heading: the full string, then several inner windows."""
    out = [needle] if needle else []
    n = len(needle)
    if n > 14:
        for start in (4, n // 3, n // 2, max(1, n - 12)):
            frag = needle[start:start + 9]
            if len(frag) >= 7 and frag not in out:
                out.append(frag)
    elif n >= 7:
        out.append(needle[:7])
    # Very short headings get no inner window; tolerate one corrupted glyph at either end.
    if n >= 4:
        for frag in (needle[1:], needle[:-1], needle[1:-1]):
            if len(frag) >= 3 and frag not in out:
                out.append(frag)
    return out


items = json.load(open(items_path, encoding='utf-8'))
reader = PdfReader(pdf_path)
pages = [norm(p.extract_text() or '') for p in reader.pages]
total = len(pages)

# Pages carrying many entry strings are the table of contents itself; the body starts after them.
all_needles = [norm(it['text']) for it in items]
toc_pages = [i for i, p in enumerate(pages) if sum(1 for nd in all_needles if nd and nd in p) >= 8]
body_start = (max(toc_pages) + 1) if toc_pages else 0

resolved, unmatched = {}, []
cursor = body_start  # monotonic forward search
for it in items:
    needle = norm(it['text'])
    pr = probes(needle)
    if not pr:
        unmatched.append({'id': it['id'], 'type': it['type'], 'reason': 'empty text'})
        continue
    hit = None
    for i in range(cursor, total):
        if any(frag in pages[i] for frag in pr):
            hit = i
            break
    if hit is None:  # fall back to a whole-document search, still ordered from body_start
        for i in range(body_start, total):
            if any(frag in pages[i] for frag in pr):
                hit = i
                break
    if hit is None:
        unmatched.append({'id': it['id'], 'type': it['type'], 'reason': 'not found', 'text': needle[:40]})
        continue
    resolved[it['id']] = hit + 1  # 1-based printed page number
    cursor = hit

# Fill unresolved entries from their neighbours. Document order is monotonic, so a heading
# that could not be matched lies on the page of the last resolved entry before it; leading
# entries take the first known page. A wrong-by-one number beats an empty TOC cell.
interpolated = []
last = None
for it in items:
    if it['id'] in resolved:
        last = resolved[it['id']]
    elif last is not None:
        resolved[it['id']] = last
        interpolated.append(it['id'])
first_known = next((resolved[it['id']] for it in items if it['id'] in resolved), 1)
for it in items:
    if it['id'] not in resolved:
        resolved[it['id']] = first_known
        interpolated.append(it['id'])

ordered = [resolved[it['id']] for it in items if it['id'] in resolved]
out_of_order = sum(1 for a, b in zip(ordered, ordered[1:]) if b < a)

report = {
    'pdf': pdf_path,
    'totalPages': total,
    'tocPages': [i + 1 for i in toc_pages],
    'bodyStartsAtPage': body_start + 1,
    'resolved': len(resolved),
    'entries': len(items),
    'unmatchedCount': len(unmatched),
    'unmatched': unmatched[:20],
    'interpolated': interpolated,
    'outOfOrderCount': out_of_order,
}
json.dump(resolved, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps(report, ensure_ascii=False, indent=1))
