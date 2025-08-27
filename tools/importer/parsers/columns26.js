/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid which contains the content
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The main grid children: [heading, quote, bottomRow]
  const children = Array.from(mainGrid.children);
  if (children.length < 3) return;

  // Left column: heading and quote
  const leftCol = document.createElement('div');
  if (children[0]) leftCol.appendChild(children[0]);
  if (children[1]) leftCol.appendChild(children[1]);

  // Right column: divider, avatar & info, logo (all within another grid)
  // This is the third child, which itself is a grid
  const rightColGrid = children[2];
  // Just reference the entire inner grid for robustness
  const rightCol = document.createElement('div');
  if (rightColGrid) rightCol.appendChild(rightColGrid);

  // Create table rows
  const rows = [
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
