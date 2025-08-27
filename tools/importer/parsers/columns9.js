/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (main columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get each direct child of the grid, which are the columns to display side by side
  const columns = Array.from(grid.children);
  // Construct the block table cells so that the header row is a single column,
  // and the second row contains the columns (one column for each)
  const cells = [
    ['Columns (columns9)'], // Header row: one cell
    columns // Content row: as many cells as columns present
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
