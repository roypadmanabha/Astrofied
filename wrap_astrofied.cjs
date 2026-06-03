const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');

const replaceInFile = (filePath, replacer) => {
    const orig = fs.readFileSync(filePath, 'utf8');
    const updated = replacer(orig);
    if (orig !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
};

// 1. Panchang.jsx
replaceInFile(path.join(srcDir, 'Panchang.jsx'), content => {
    return content.replace(/<span className="text-\[#FF0000\]">Astrofied<\/span>/g, '<span className="text-[#FF0000] brand-text">Astrofied</span>');
});

// 2. Services.jsx
replaceInFile(path.join(srcDir, 'Services.jsx'), content => {
    return content.replace(
        /<span className={`transition-colors duration-300 \${isDarkMode \? 'text-white group-hover:text-\[#ffd700\]' : 'text-black group-hover:text-white'}`}>\s*Astrofied\s*<\/span>/,
        '<span className={`transition-colors duration-300 ${isDarkMode ? \'text-white group-hover:text-[#ffd700]\' : \'text-black group-hover:text-white\'} brand-text`}>Astrofied</span>'
    ).replace(
        /Astrofied<\/motion\.h3>/,
        '<span className="brand-text">Astrofied</span></motion.h3>'
    );
});

// 3. Hero.jsx
replaceInFile(path.join(srcDir, 'Hero.jsx'), content => {
    return content.replace(/<span>Explore Astrofied<\/span>/g, '<span>Explore <span className="brand-text">Astrofied</span></span>');
});

// 4. Footer.jsx
replaceInFile(path.join(srcDir, 'Footer.jsx'), content => {
    return content.replace(/© \{new Date\(\)\.getFullYear\(\)\} Astrofied\./g, '© {new Date().getFullYear()} <span className="brand-text">Astrofied</span>.');
});

// 5. Feedback.jsx
replaceInFile(path.join(srcDir, 'Feedback.jsx'), content => {
    return content.replace(/experience with Astrofied!/g, 'experience with <span className="brand-text">Astrofied</span>!');
});

// 6. Testimonials.jsx
replaceInFile(path.join(srcDir, 'Testimonials.jsx'), content => {
    let newContent = content;
    if (!newContent.includes('const formatAstrofied')) {
        newContent = newContent.replace('export default function Testimonials() {', `const formatAstrofied = (text) => {\n    if (!text) return text;\n    return text.split(/(Astrofied)/g).map((part, i) => \n        part === 'Astrofied' ? <span key={i} className="brand-text">Astrofied</span> : part\n    );\n};\n\nexport default function Testimonials() {`);
    }
    newContent = newContent.replace(/>\{t\.text\}<\/p>/g, '>{formatAstrofied(t.text)}</p>');
    return newContent;
});

// 7. FAQs.jsx
replaceInFile(path.join(srcDir, 'FAQs.jsx'), content => {
    let newContent = content;
    if (!newContent.includes('const formatAstrofied')) {
        newContent = newContent.replace('const FAQs = () => {', `const formatAstrofied = (text) => {\n    if (!text) return text;\n    if (typeof text !== 'string') return text;\n    return text.split(/(Astrofied)/g).map((part, i) => \n        part === 'Astrofied' ? <span key={i} className="brand-text">Astrofied</span> : part\n    );\n};\n\nconst FAQs = () => {`);
    }
    newContent = newContent.replace(/\{faq\.question\}/g, '{formatAstrofied(faq.question)}');
    newContent = newContent.replace(/\{faq\.answer\}/g, '{formatAstrofied(faq.answer)}');
    return newContent;
});

// 8. ExploreModal.jsx
replaceInFile(path.join(srcDir, 'ExploreModal.jsx'), content => {
    let newContent = content;
    if (!newContent.includes('const formatAstrofied')) {
        newContent = newContent.replace('const ExploreModal = ({ isOpen, onClose }) => {', `const formatAstrofied = (text) => {\n    if (!text) return text;\n    return text.split(/(Astrofied)/g).map((part, i) => \n        part === 'Astrofied' ? <span key={i} className="brand-text">Astrofied</span> : part\n    );\n};\n\nconst ExploreModal = ({ isOpen, onClose }) => {`);
    }
    newContent = newContent.replace(/\{paragraph\}/g, '{formatAstrofied(paragraph)}');
    return newContent;
});

// 9. AstrofiedJournals.jsx
replaceInFile(path.join(srcDir, 'AstrofiedJournals.jsx'), content => {
    let newContent = content;
    newContent = newContent.replace(
        /\{titleContent\}/g, 
        '{typeof titleContent === "string" ? titleContent.split(/(Astrofied)/g).map((p,i)=>p==="Astrofied"?<span key={i} className="brand-text">Astrofied</span>:p) : titleContent}'
    );
    newContent = newContent.replace(
        /\{textContent\}/g, 
        '{typeof textContent === "string" ? textContent.split(/(Astrofied)/g).map((p,i)=>p==="Astrofied"?<span key={i} className="brand-text">Astrofied</span>:p) : textContent}'
    );
    newContent = newContent.replace(/Welcome to Astrofied Journals!/g, 'Welcome to <span className="brand-text">Astrofied</span> Journals!');
    newContent = newContent.replace(/content within Astrofied Journals is/g, 'content within <span className="brand-text">Astrofied</span> Journals is');
    newContent = newContent.replace(/Astrofied reserves all/g, '<span className="brand-text">Astrofied</span> reserves all');
    newContent = newContent.replace(/Astrofied helps people/g, '<span className="brand-text">Astrofied</span> helps people');
    return newContent;
});

console.log('Script completed.');
