import re

with open(r'd:\Office\Landing pages\Credmont landing page\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove Teacher-Student ratio
text = re.sub(r'                <div class="stat-item" data-count="1" data-suffix=":15">.*?<div class="stat-label">Teacher-Student Ratio</div>\n                </div>\n', '', text, flags=re.DOTALL)

# 2. Update Icons
# Icon 1 - Integrated Learning (Puzzle/Blocks)
text = re.sub(r'(<div class="feature-icon">\s*)<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l-10-5V9.5l10 5 10-5V15l-10 5z"/></svg>(\s*</div>\s*<h3>Integrated Learning Approach</h3>)', r'\1<svg viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>\2', text, flags=re.DOTALL)

# Icon 2 - Structured Planning (Calendar)
text = re.sub(r'(<div class="feature-icon">\s*)<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z"/></svg>(\s*</div>\s*<h3>Structured Academic Planning</h3>)', r'\1<svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg>\2', text, flags=re.DOTALL)

# Icon 3 - Early Foundation (Trending Up / Growth)
text = re.sub(r'(<div class="feature-icon">\s*)<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>(\s*</div>\s*<h3>Early Foundation for Future Success</h3>)', r'\1<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>\2', text, flags=re.DOTALL)

# Icon 5 - Personalized Student Attention (Person)
text = re.sub(r'(<div class="feature-icon">\s*)<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>(\s*</div>\s*<h3>Personalized Student Attention</h3>)', r'\1<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>\2', text, flags=re.DOTALL)

# Icon 6 - Holistic Development (Category shapes)
text = re.sub(r'(<div class="feature-icon">\s*)<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>(\s*</div>\s*<h3>Holistic Development Focus</h3>)', r'\1<svg viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>\2', text, flags=re.DOTALL)

# 3. Move section 'Where Do You Want To Start?'
section_match = re.search(r'(    <!-- Grades / Curriculumn Section -->\n    <section class="section grades-section">.*?</section>\n)', text, flags=re.DOTALL)
if section_match:
    section_content = section_match.group(1)
    # remove from Original position
    text = text.replace(section_content, '')
    # place below Hero Section (Hero section ends with </section>\n\n    <!-- Stats Strip -->)
    text = text.replace('    </section>\n\n    <!-- Stats Strip -->', '    </section>\n\n' + section_content + '\n    <!-- Stats Strip -->')

with open(r'd:\Office\Landing pages\Credmont landing page\index.html', 'w', encoding='utf-8') as f:
    f.write(text)
