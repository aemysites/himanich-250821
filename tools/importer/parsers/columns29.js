/* global WebImporter */
export default function parse(element, { document }) {
  // Find direct children (the columns) of the grid
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const columnsCount = columnDivs.length;

  // Each column is 1x1 aspect, each contains an image
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img || '';
  });

  // Create the header row as a single cell with correct colspan
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns29)';
  if (columnsCount > 1) {
    headerCell.setAttribute('colspan', columnsCount);
  }
  const headerRow = [headerCell];

  // Compose final block structure
  const cells = [headerRow, columns];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
