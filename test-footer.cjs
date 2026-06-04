const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1366 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('#footer');
    if (!footer) return { error: "Footer not found in DOM" };
    
    const rect = footer.getBoundingClientRect();
    const style = window.getComputedStyle(footer);
    
    return {
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      height: rect.height,
      width: rect.width,
      top: rect.top,
      bottom: rect.bottom,
      innerHTML: footer.innerHTML.substring(0, 100) + '...'
    };
  });
  
  console.log(JSON.stringify(footerInfo, null, 2));
  await browser.close();
})();
