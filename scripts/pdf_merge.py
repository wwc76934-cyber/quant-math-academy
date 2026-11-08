"""Merge split-print PDFs and optionally stamp a page-number/running-head overlay.

usage:
  python pdf_merge.py merge <out.pdf> <in1.pdf> [<in2.pdf> ...]        # merge, print page count
  python pdf_merge.py overlay <in.pdf> <overlay.pdf> <out.pdf> <skip>   # stamp overlay onto pages[skip:]
"""
import json
import sys

PKGS = r'C:\Users\18137\Documents\deepseek-harness\default-workspace\.python-packages'
sys.path.insert(0, PKGS)
from pypdf import PdfReader, PdfWriter  # noqa: E402


def merge(out, inputs):
    w = PdfWriter()
    for p in inputs:
        w.append(PdfReader(p))
    with open(out, 'wb') as f:
        w.write(f)
    print(json.dumps({'output': out, 'pages': len(w.pages)}))


def overlay(src, ovl, out, skip):
    w = PdfWriter()
    r = PdfReader(src)
    o = PdfReader(ovl)
    need = len(r.pages) - skip
    if len(o.pages) != need:
        raise SystemExit(f'overlay page mismatch: overlay {len(o.pages)} != needed {need}')
    for i, page in enumerate(r.pages):
        if i >= skip:
            page.merge_page(o.pages[i - skip])
        w.add_page(page)
    with open(out, 'wb') as f:
        w.write(f)
    print(json.dumps({'output': out, 'pages': len(w.pages)}))


if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'merge':
        merge(sys.argv[2], sys.argv[3:])
    elif mode == 'overlay':
        overlay(sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5]))
    else:
        raise SystemExit(f'unknown mode {mode}')
