/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: always use block name
  const headerRow = ['Hero (hero22)'];

  // 2. Background image row (none present in source, so empty)
  const imageRow = [''];

  // 3. Content row: Title, subheading, CTA
  // Extract all text content from the source HTML
  let contentElements = [];

  // Find all heading and paragraph elements inside the block
  const headingsAndParas = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
  if (headingsAndParas.length > 0) {
    contentElements = headingsAndParas;
  }

  // Extract visible CTA buttons (not d-none)
  const buttons = Array.from(element.querySelectorAll('button'));
  buttons.forEach(btn => {
    if (!btn.classList.contains('d-none')) {
      contentElements.push(btn);
    }
  });

  // If no content found, add an empty string
  if (contentElements.length === 0) {
    contentElements = [''];
  }

  // Compose the table
  const rows = [headerRow, imageRow, [contentElements]];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
