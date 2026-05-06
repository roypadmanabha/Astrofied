const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, text } = JSON.parse(event.body);
  const GITHUB_TOKEN = process.env.GH_TOKEN;
  const REPO_OWNER = 'roypadmanabha';
  const REPO_NAME = 'Astrofied';
  const FILE_PATH = 'src/components/Testimonials.jsx';

  try {
    // 1. Get current file content
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const fileRes = await fetch(getFileUrl, {
      headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const fileData = await fileRes.json();
    const sha = fileData.sha;
    const content = Buffer.from(fileData.content, 'base64').toString('utf8');

    // 2. Modify content (Append to initialTestimonials array)
    const newEntry = `    { id: Date.now(), name: "${name}", img: Smile, text: "${text}" },\n];`;
    const updatedContent = content.replace(/\];\s*$/m, newEntry);

    // 3. Commit back to GitHub
    const updateRes = await fetch(getFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add new testimonial from ${name}`,
        content: Buffer.from(updatedContent).toString('base64'),
        sha: sha
      })
    });

    if (updateRes.ok) {
      return { statusCode: 200, body: JSON.stringify({ message: 'Code updated successfully' }) };
    } else {
      const err = await updateRes.json();
      return { statusCode: 500, body: JSON.stringify(err) };
    }
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};
