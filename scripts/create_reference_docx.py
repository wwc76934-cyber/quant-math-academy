from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
doc = Document()
section = doc.sections[0]
section.page_width = Mm(176)
section.page_height = Mm(250)
section.top_margin = Mm(20)
section.bottom_margin = Mm(20)
section.left_margin = Mm(23)
section.right_margin = Mm(19)
section.header_distance = Mm(9)
section.footer_distance = Mm(9)
section.different_first_page_header_footer = True

styles = doc.styles

def font(style, latin='Cambria', east='Noto Serif SC', size=10.5, bold=None, color='202124'):
    style.font.name = latin
    style.font.size = Pt(size)
    if bold is not None:
        style.font.bold = bold
    style.font.color.rgb = RGBColor.from_string(color)
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.rFonts
    if rfonts is None:
        rfonts = OxmlElement('w:rFonts')
        rpr.insert(0, rfonts)
    rfonts.set(qn('w:ascii'), latin)
    rfonts.set(qn('w:hAnsi'), latin)
    rfonts.set(qn('w:eastAsia'), east)

normal = styles['Normal']
font(normal)
normal.paragraph_format.line_spacing = 1.48
normal.paragraph_format.space_after = Pt(5)
normal.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
normal.paragraph_format.widow_control = True

for name in ['Body Text', 'First Paragraph']:
    if name in styles:
        st = styles[name]
        font(st)
        st.paragraph_format.line_spacing = 1.48
        st.paragraph_format.space_after = Pt(5)
        st.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

heading_specs = {
    'Title': (30, True, '263D52'),
    'Subtitle': (14, False, '56636E'),
    'Heading 1': (21, True, '263D52'),
    'Heading 2': (15, True, '263D52'),
    'Heading 3': (12, True, '263D52'),
    'Heading 4': (11, True, '263D52'),
}
for name, (size, bold, color) in heading_specs.items():
    if name not in styles:
        styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
    st = styles[name]
    font(st, latin='Cambria', east='Noto Sans SC', size=size, bold=bold, color=color)
    st.paragraph_format.space_before = Pt(14 if name != 'Title' else 0)
    st.paragraph_format.space_after = Pt(8)
    st.paragraph_format.keep_with_next = True
    if name in ['Heading 1', 'Heading 2']:
        st.paragraph_format.page_break_before = True
    if name in ['Title', 'Subtitle']:
        st.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER

for name in ['Header', 'Footer']:
    st = styles[name]
    font(st, east='Noto Sans SC', size=8.5, color='555555')
    st.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER

header = section.header.paragraphs[0]
header.text = '量化数学进阶教材'
header.style = styles['Header']
footer = section.footer.paragraphs[0]
footer.style = styles['Footer']
run = footer.add_run()
begin = OxmlElement('w:fldChar'); begin.set(qn('w:fldCharType'), 'begin')
instr = OxmlElement('w:instrText'); instr.set(qn('xml:space'), 'preserve'); instr.text = ' PAGE '
separate = OxmlElement('w:fldChar'); separate.set(qn('w:fldCharType'), 'separate')
text = OxmlElement('w:t'); text.text = '1'
end = OxmlElement('w:fldChar'); end.set(qn('w:fldCharType'), 'end')
for el in [begin, instr, separate, text, end]:
    run._r.append(el)

for name, base in [('数学环境标题', 'Normal'), ('证明标题', 'Normal')]:
    if name not in styles:
        st = styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
    else:
        st = styles[name]
    st.base_style = styles[base]
    font(st, east='Noto Sans SC', size=10.5, bold=True, color='263D52')
    st.paragraph_format.space_before = Pt(9)
    st.paragraph_format.space_after = Pt(4)
    st.paragraph_format.keep_with_next = True

settings = doc.settings.element
update = OxmlElement('w:updateFields')
update.set(qn('w:val'), 'true')
settings.append(update)

# Reference documents use styles and section properties, not this sample content.
doc.add_paragraph('量化数学进阶教材', style='Title')
doc.add_paragraph('样式模板', style='Subtitle')
doc.add_heading('章标题', level=1)
doc.add_heading('节标题', level=2)
doc.add_paragraph('正文样式。')
out = ROOT / 'assets' / 'reference.docx'
doc.save(out)
print(out)
