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
    'src/App.jsx'
]

# Pattern to find: className="..." style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }}
# We'll just replace style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }} with nothing,
# and append the new classes to the className.
# Or simpler:
# If there's NO className, we just add className={`transition-colors ${isDarkMode ? 'text-[#f2ff00] hover:text-[#D4AF37]' : 'text-[#4B0082]'}`}
# If there IS a className, we need to inject the dynamic part.

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Quick and dirty approach:
    # 1. Replace `<span style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }}>` 
    # with `<span className={`transition-colors cursor-default ${isDarkMode ? 'text-[#f2ff00] hover:text-[#D4AF37]' : 'text-[#4B0082]'}`}>`
    content = content.replace(
        '<span style={{ color: isDarkMode ? \'#f2ff00\' : \'#4B0082\' }}>',
        '<span className={`transition-colors ${isDarkMode ? \'text-[#f2ff00] hover:text-[#D4AF37]\' : \'text-[#4B0082]\'}`}>'
    )
    
    content = content.replace(
        '<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8" style={{ color: isDarkMode ? \'#f2ff00\' : \'#4B0082\' }}>',
        '<h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 transition-colors ${isDarkMode ? \'text-[#f2ff00] hover:text-[#D4AF37]\' : \'text-[#4B0082]\'}`}>'
    )

    # For span with className:
    # <span className="text-xl font-bold font-mulish" style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }}>
    content = re.sub(
        r'className="([^"]+)"\s*style={{ color: isDarkMode \? \'#f2ff00\' : \'#4B0082\' }}',
        r'className={`\1 transition-colors ${isDarkMode ? \'text-[#f2ff00] hover:text-[#D4AF37]\' : \'text-[#4B0082]\'}`}',
        content
    )

    with open(filepath, 'w') as f:
        f.write(content)
