/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Hero (hero6)'];

  // Collect background image (row 2)
  let bgImg = null;
  // Get the first grid-layout child
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  if (gridLayout) {
    const gridChildren = gridLayout.querySelectorAll(':scope > div');
    if (gridChildren.length > 0) {
      const bgDiv = gridChildren[0];
      const img = bgDiv.querySelector('img.cover-image');
      if (img) bgImg = img;
    }
  }

  // Collect content block (row 3)
  let contentBlock = null;
  if (gridLayout) {
    const gridChildren = gridLayout.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      // The card is nested in a grid inside the second child
      const innerGrid = gridChildren[1].querySelector('.grid-layout.desktop-1-column');
      if (innerGrid) {
        const card = innerGrid.querySelector('.card');
        if (card) contentBlock = card;
      }
    }
  }

  // Construct the cells array
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''], // row 2: background image or empty
    [contentBlock ? contentBlock : ''] // row 3: content block or empty
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
