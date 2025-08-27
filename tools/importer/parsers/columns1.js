/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as specified in the example
  const headerRow = ['Columns (columns1)'];

  // Find the grid container for columns layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children (columns) of the grid
  const columns = Array.from(grid.children);

  // For each column, aggregate content into a single cell
  // No hardcoding, always reference original elements
  const cellElems = columns.map((col) => col);

  // Final table: first row is header, second row is columns
  const cells = [
    headerRow,
    cellElems
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
