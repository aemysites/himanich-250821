/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Only get immediate children of the grid (should be two columns)
    columns = Array.from(grid.children);
  } else {
    // fallback: just in case, use section's immediate children
    columns = Array.from(element.children);
  }

  // Find left and right columns from structure: left is the DIV, right is the IMG
  let leftCol = columns.find((el) => el.tagName === 'DIV');
  let rightCol = columns.find((el) => el.tagName === 'IMG');

  // Left column cell: all direct children nodes (preserve structure and content)
  let leftCell = [];
  if (leftCol) {
    // Get all child nodes (preserves paragraphs, heading, link, etc)
    leftCell = Array.from(leftCol.childNodes).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    );
  }

  // Right column cell: just the img
  let rightCell = [];
  if (rightCol) {
    rightCell = [rightCol];
  }

  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCell, rightCell];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
