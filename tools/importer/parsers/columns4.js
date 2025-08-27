/* global WebImporter */
export default function parse(element, { document }) {
  // Header must be exactly as specified
  const headerRow = ['Columns (columns4)'];

  // Extract all direct child divs (columns) of the grid
  const columnDivs = element.querySelectorAll(':scope > div');

  // For each column, gather all of its direct children (img, text, links, etc)
  // so the code is flexible if the HTML structure changes to include text or links
  const columns = Array.from(columnDivs).map(div => {
    // Collect all children that are not style/empty text nodes
    const content = [];
    for (const node of div.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        content.push(node);
      } else if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent && node.textContent.trim().length > 0
      ) {
        // wrap text node in a span to preserve text
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        content.push(span);
      }
    }
    // If only one element, return it directly, else return array
    if (content.length === 1) return content[0];
    if (content.length > 1) return content;
    // If empty, return empty string
    return '';
  });

  // Compose the cells for the table
  const cells = [
    headerRow,
    columns
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
