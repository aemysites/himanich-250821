/* global WebImporter */
export default function parse(element, { document }) {
  // Header row required by the block spec
  const headerRow = ['Columns (columns38)'];

  // Get all direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include all its direct children (full content block)
  const row = columns.map(col => {
    // Collect all child nodes (including text, images, buttons, etc)
    const content = Array.from(col.childNodes).filter(node => {
      // Ignore empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    // If multiple elements, pass as array; if single, pass just that element
    if (content.length === 1) return content[0];
    return content;
  });

  // Compose table
  const cells = [
    headerRow,
    row,
  ];

  // Replace original element with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
