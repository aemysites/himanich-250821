/* global WebImporter */
export default function parse(element, { document }) {
  // Find main content grid (the two columns)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftContent = null;
  let rightContent = null;
  if (mainGrid) {
    const mainCols = mainGrid.children;
    if (mainCols.length >= 2) {
      // Group left and right blocks in an array for best structure
      const leftBlock = mainCols[0];
      const rightBlock = mainCols[1];
      // Combine them in a container for one column
      const leftColDiv = document.createElement('div');
      leftColDiv.appendChild(leftBlock);
      leftColDiv.appendChild(rightBlock);
      leftContent = leftColDiv;
    } else {
      leftContent = mainGrid;
    }
  }

  // Find images in the second grid
  const imagesGrid = element.querySelector('.mobile-portrait-1-column');
  let imgElems = [];
  if (imagesGrid) {
    imgElems = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Header row should be a single cell, matching example
  const headerRow = ['Columns (columns11)'];

  // Second row: two columns
  const columnsRow = [leftContent, imgElems];

  // To make the header cell span both columns, we must set colSpan after table creation
  const tableData = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Set the header cell to span two columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }
  // Replace with the table
  element.replaceWith(table);
}
