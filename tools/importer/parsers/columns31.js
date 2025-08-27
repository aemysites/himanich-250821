/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid columns: .container > .grid-layout > direct children
  let grid = element.querySelector('.grid-layout');
  let columns;
  if (grid) {
    columns = Array.from(grid.children);
  } else {
    columns = Array.from(element.children);
  }

  // Edge case: If there are no columns, just create the header row
  if (!columns.length) {
    const block = WebImporter.DOMUtils.createTable([
      ['Columns (columns31)']
    ], document);
    element.replaceWith(block);
    return;
  }

  // The header row must have the same number of cells as the content row
  // The first cell contains the header, rest are empty strings
  const headerRow = Array(columns.length).fill('');
  headerRow[0] = 'Columns (columns31)';

  const tableData = [headerRow, columns];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
