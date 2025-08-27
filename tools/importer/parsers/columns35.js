/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches block name exactly
  const headerRow = ['Columns (columns35)'];

  // Find the grid - it contains the columns (children)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columnElements = Array.from(grid.children);

  // For each column, keep the entire element reference so layout and semantics are preserved
  // This is robust to content variations and ensures all text, structure, and buttons are included
  const contentRow = columnElements.map((col) => col);

  // Compose the block table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
