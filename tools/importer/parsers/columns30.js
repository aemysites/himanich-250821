/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid element containing all columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: exactly one cell with the block name
  const headerRow = ['Columns (columns30)'];

  // Content row: one cell for each column's full content
  const contentRow = columns.map(col => col);

  // Table cells: first row is header, second row is content
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
