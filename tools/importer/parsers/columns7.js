/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const headerRow = ['Columns (columns7)'];
  // Find all immediate child divs (these are the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Extract main content from each column div
  const contentRow = columnDivs.map(div => {
    // Use the <img> if present, else fallback to the div itself
    const img = div.querySelector('img');
    return img ? img : div;
  });
  // Table: first row is header (one cell), second row is content (n cells)
  const tableArr = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}
