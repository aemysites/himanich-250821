/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav containing the columns
  const nav = element.querySelector('nav');
  if (!nav) return;

  // Select all .footerList that contain a non-empty ul.footer-list
  const columnDivs = Array.from(nav.querySelectorAll('.footerList'))
    .map(div => div.querySelector('ul.footer-list'))
    .filter(ul => ul && ul.children.length > 0);

  // If no columns found, do nothing
  if (columnDivs.length === 0) return;

  // Prepare table rows
  const headerRow = ['Columns (columns20)'];
  const columnsRow = columnDivs;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
