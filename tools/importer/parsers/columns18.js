/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify columns by type
  let leftCell = null, middleCell = null, rightCell = null;
  let foundUl = false, foundImg = false, foundText = false;
  for (const child of gridChildren) {
    if (!foundText && child.querySelector('h2,h3,p')) {
      leftCell = child;
      foundText = true;
    } else if (!foundUl && child.tagName === 'UL') {
      middleCell = child;
      foundUl = true;
    } else if (!foundImg && (child.tagName === 'IMG' || child.querySelector('img'))) {
      rightCell = (child.tagName === 'IMG') ? child : child.querySelector('img');
      foundImg = true;
    }
  }

  // Fallback if not all found
  const fallbackCells = gridChildren.filter(Boolean);
  if (!leftCell) leftCell = fallbackCells[0];
  if (!middleCell) middleCell = fallbackCells[1];
  if (!rightCell) rightCell = fallbackCells[2];

  // Compose content row: each cell is a column, header row must be one cell only
  const headerRow = ['Columns (columns18)']; // only one cell for header!
  const contentRow = [
    leftCell ? leftCell : '',
    middleCell ? middleCell : '',
    rightCell ? rightCell : ''
  ];
  const cells = [headerRow, contentRow]; // header (one cell), then columns

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
