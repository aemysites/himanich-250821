/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get columns from the grid (should be 2: image + content)
  const columns = Array.from(grid.children);
  // Defensive: filter for the expected image and content columns
  const imgCol = columns.find(el => el.tagName === 'IMG');
  const contentCol = columns.find(el => el !== imgCol);
  // If missing, gracefully return
  if (!imgCol || !contentCol) return;

  // Table header, matches example exactly
  const headerRow = ['Columns (columns32)'];
  // Content row: first column is the image, second column is the content
  const cells = [
    headerRow,
    [imgCol, contentCol]
  ];

  // Create and replace element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
