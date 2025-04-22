const app = document.getElementById('app');
app.innerHTML = `
  <h1>Playwright Automation</h1>
  <input id="urlInput" placeholder="Enter URL to automate" />
  <button id="runBtn">Run Automation</button>
  <p id="status"></p>
`;

document.getElementById('runBtn').onclick = async () => {
  const url = document.getElementById('urlInput').value;
  const status = document.getElementById('status');

  if (!url) {
    status.textContent = '❗ Please enter a URL first.';
    return;
  }

  status.textContent = '⏳ Running automation...';

  try {
    const res = await fetch('http://localhost:4000/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    status.textContent = data.message || '✅ Done!';
  } catch (err) {
    status.textContent = '❌ Failed to connect to server.';
    console.error(err);
  }
};