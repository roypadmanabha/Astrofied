import os
import re

files_to_process = [
    'src/components/Hero.jsx',
    'src/components/Services.jsx',
    'src/components/Testimonials.jsx',
    'src/components/Footer.jsx',
    'src/components/AstrofiedJournals.jsx',
    'src/components/Feedback.jsx',
    'src/components/FAQs.jsx',
    'src/components/ThemeToggle3D.jsx',
    'src/components/LegalModal.jsx',
    'src/components/Kundali.jsx',
    'src/components/Pricing.jsx',
    'src/App.jsx',
    'src/index.css'
]

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Inline styles: style={{ color: isDarkMode ? '#D4AF37' : '#4B0082' }}
    # We want to remove the style and use className instead, but we don't know the existing classNames.
    # Alternatively, just replace '#D4AF37' with '#f2ff00' in inline styles. The user might not expect text to have hover. 
    # But wait, let's just do a regex replace for style:
    content = content.replace("'#D4AF37'", "'#f2ff00'")
    content = content.replace('"#D4AF37"', '"#f2ff00"')
    content = content.replace('#D4AF37', '#f2ff00')

    with open(filepath, 'w') as f:
        f.write(content)
