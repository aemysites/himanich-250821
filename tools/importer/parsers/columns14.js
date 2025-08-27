/* global WebImporter */
export default function parse(element, { document }) {
  // Block name for the header row, exactly as in the example
  const headerRow = ['Columns (columns14)'];

  // Find the grid container that holds the columns/rows
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child elements: these represent columns
  const columns = Array.from(grid.children);

  // For this HTML, there are two children: an h2 and a div containing a p and a
  // Reference the actual elements from the DOM—do not clone or create new
  const contentRow = columns.map((col) => col);

  // Table structure: 2 rows, matching the block's requirement
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(blockTable);
}
