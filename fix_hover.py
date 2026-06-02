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

    # Restore hover states to gold (#D4AF37)
    content = content.replace('hover:text-[#f2ff00]', 'hover:text-[#D4AF37]')
    content = content.replace('hover:bg-[#f2ff00]', 'hover:bg-[#D4AF37]')
    content = content.replace('hover:border-[#f2ff00]', 'hover:border-[#D4AF37]')
    
    # Wait, FAQs has isActive ? 'text-[#f2ff00]' : 'text-gray-100 hover:text-white'. 
    # If they want hover on these items, should I add hover to interactive elements that didn't have it?
    # Actually, adding hover to inline styles:
    
    # For now, let's just make sure all style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }} 
    # are wrapped in a span with hover if they are clickable. But they are mostly static text!
    # "and for hover on those items, the color will be gold"
    # To be safe, I'll add a hover class to ALL elements that had their style changed to #f2ff00.
    
    # We can use regex to find: style={{ color: isDarkMode ? '#f2ff00' : '#4B0082' }}
    # and prepend className="hover:text-[#D4AF37] transition-colors" to them.
    # But wait, style overrides class text color!
    # So we MUST convert style to className for hover to work!

    with open(filepath, 'w') as f:
        f.write(content)
