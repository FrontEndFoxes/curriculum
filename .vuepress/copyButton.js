/**
 * Add a copy button to the top of each code section
 */
module.exports = (md) => {
  // Not sure how else to add this javascript to the page
  const copy = `
  <script>
    function copyText(event, node) {
      // So we don't go anywhere
      event.preventDefault();

      const toCopy = node.parentElement.nextElementSibling.querySelector('code');
      const el = document.createElement('textarea');
      el.value = toCopy.innerText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  </script>
  `;

  // Define our button and some styling
  const button = `
  <div style="display: flex; justify-content: flex-end;">
  <a href="#" onclick="copyText(event, this)">
  Copy
  </a>
  </div>
  `;

  // Replace the markdown rule with a new one that prepends the button
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => `${copy}${button}${fence(...args)}`;
};
