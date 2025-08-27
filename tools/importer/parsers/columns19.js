/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as specified
  const headerRow = ['Columns (columns19)'];

  // Extract all top-level columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Group columns into rows of two
  const contentRows = [];
  for (let i = 0; i < columnDivs.length; i += 2) {
    const row = [columnDivs[i]];
    if (columnDivs[i + 1]) {
      row.push(columnDivs[i + 1]);
    } else {
      row.push(''); // If odd count, add empty cell
    }
    contentRows.push(row);
  }

  // Construct the table data: header row then content rows
  const tableData = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
