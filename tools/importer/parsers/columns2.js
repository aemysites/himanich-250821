/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The grid's direct children: should be [mainCol (A), rightCol1 (div.flex-horizontal), rightCol2 (div.flex-horizontal)]
  const gridChildren = Array.from(grid.children);

  let mainCol = null, rightCol1 = null, rightCol2 = null;
  let flexCount = 0;
  for (let child of gridChildren) {
    if (!mainCol && child.tagName === 'A') {
      mainCol = child;
    } else if (child.classList.contains('flex-horizontal')) {
      if (flexCount === 0) {
        rightCol1 = child;
        flexCount++;
      } else if (flexCount === 1) {
        rightCol2 = child;
        flexCount++;
      }
    }
  }

  // Defensive fallback: if above assignment didn't work, try querySelectorAll order fallback
  if (!mainCol) {
    mainCol = grid.querySelector('a');
  }
  const flexHorizontals = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (!rightCol1 && flexHorizontals[0]) {
    rightCol1 = flexHorizontals[0];
  }
  if (!rightCol2 && flexHorizontals[1]) {
    rightCol2 = flexHorizontals[1];
  }

  // Fix: Header row should be a single cell (one column only)
  const headerRow = ['Columns (columns2)'];

  // The second row should have three columns
  const col1 = mainCol || '';
  const col2 = rightCol1 || '';
  const col3 = rightCol2 || '';

  const tableRows = [
    headerRow,
    [col1, col2, col3],
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
