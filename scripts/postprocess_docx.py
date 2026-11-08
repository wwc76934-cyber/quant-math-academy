import re
import sys
from pathlib import Path
from docx import Document
from docx.shared import Pt, Mm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'build' / '量化数学进阶教材-raw.docx'
target = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / '量化数学进阶教材.docx'
doc = Document(source)
doc.core_properties.title = '量化数学进阶教材'
doc.core_properties.subject = '数学理论、推导证明与量化金融应用'
doc.core_properties.keywords = '量化研究, 数学分析, 概率论, 数理统计, 线性代数, 优化, 随机过程'

for section in doc.sections:
    section.page_width = Mm(176)
    section.page_height = Mm(250)
    section.top_margin = Mm(20)
    section.bottom_margin = Mm(20)
    section.left_margin = Mm(23)
    section.right_margin = Mm(19)
    section.header_distance = Mm(9)
    section.footer_distance = Mm(9)

for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        continue
    if re.match(r'^第[一二三四五六七八]篇[　\s]', text):
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(90)
        p.paragraph_format.space_after = Pt(22)
        p.paragraph_format.page_break_before = True
    elif re.match(r'^第\d+章[　\s]', text):
        p.paragraph_format.page_break_before = True
        p.paragraph_format.keep_with_next = True
    if re.match(r'^(定义|定理|引理|命题|推论|例|注记)\s+\d+\.\d+', text):
        if '数学环境标题' in doc.styles:
            p.style = doc.styles['数学环境标题']
        ppr = p._p.get_or_add_pPr()
        shd = OxmlElement('w:shd')
        shd.set(qn('w:fill'), 'F3F4F5')
        ppr.append(shd)
        pbdr = OxmlElement('w:pBdr')
        left = OxmlElement('w:left')
        left.set(qn('w:val'), 'single')
        left.set(qn('w:sz'), '14')
        left.set(qn('w:space'), '6')
        left.set(qn('w:color'), '263D52')
        pbdr.append(left)
        ppr.append(pbdr)
    elif text in {'证明', '解'}:
        if '证明标题' in doc.styles:
            p.style = doc.styles['证明标题']
    if text == '目录':
        p.paragraph_format.page_break_before = True

# Request field and TOC refresh on opening/conversion.
settings = doc.settings.element
if not settings.findall(qn('w:updateFields')):
    update = OxmlElement('w:updateFields')
    update.set(qn('w:val'), 'true')
    settings.append(update)

doc.save(target)
# Structural reopen check.
check = Document(target)
headings = [p.text for p in check.paragraphs if p.style and p.style.name.startswith('Heading')]
print({'output': str(target), 'paragraphs': len(check.paragraphs), 'tables': len(check.tables), 'headings': len(headings), 'bytes': target.stat().st_size})
