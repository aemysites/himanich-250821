/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Step 2: Get all direct children of grid (columns)
  const columns = Array.from(grid.children);

  // Step 3: Create the header row with exactly one column (matches example)
  const headerRow = ['Columns (columns3)'];

  // Step 4: Create one content row, with as many cells as there are columns
  const contentRow = columns.map(col => col);
  
  // Step 5: Compose table with exactly two rows: header and content
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Step 6: Replace original element with the table
  element.replaceWith(table);
}
