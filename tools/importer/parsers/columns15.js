/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header must match exactly
  const headerRow = ['Columns (columns15)'];

  // 2. Find the column layout grid
  const grid = element.querySelector('.grid-layout');
  let contentRow = [];

  if (grid) {
    // For each direct child (column) in the grid
    contentRow = Array.from(grid.children).map(col => {
      // If it's an <img>, reference as-is
      if (col.tagName === 'IMG') return col;
      // Otherwise, gather all children (including raw text nodes)
      // Make a DocumentFragment to preserve text nodes and formatting
      const frag = document.createDocumentFragment();
      Array.from(col.childNodes).forEach(node => {
        frag.appendChild(node);
      });
      return frag;
    });
  } else {
    // Fallback: treat the whole element's content as one cell
    const frag = document.createDocumentFragment();
    Array.from(element.childNodes).forEach(node => {
      frag.appendChild(node);
    });
    contentRow = [frag];
  }

  // 3. Compose the table (header + content row)
  const cells = [
    headerRow,
    contentRow
  ];
  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
