const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let orig = content;
            
            // Replace exact colors
            content = content.replace(/#4B0082/gi, '#FF2400');
            content = content.replace(/#3A0066/gi, '#CC1D00');
            content = content.replace(/#4c0082/gi, '#FF2400');
            content = content.replace(/purple-600/gi, '[#FF2400]');
            content = content.replace(/purple-700/gi, '[#CC1D00]');
            content = content.replace(/purple-900/gi, '[#991600]');
            
            if (content !== orig) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir('./src');
