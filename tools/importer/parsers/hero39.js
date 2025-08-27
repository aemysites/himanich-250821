/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Hero (hero39)'];

  // Get the immediate children of .grid-layout
  const gridRoot = element.querySelector('.grid-layout');
  let gridChildren = [];
  if (gridRoot) {
    gridChildren = Array.from(gridRoot.children);
  }

  // Find the background image (first .grid-layout child that contains <img>)
  let bgImg = null;
  if (gridChildren.length > 0) {
    const maybeBgImgDiv = gridChildren[0];
    bgImg = maybeBgImgDiv.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // Find the text content area (second .grid-layout child)
  let textContent = '';
  if (gridChildren.length > 1) {
    // The gridChildren[1] has a nested grid for text
    // Get the first child of gridChildren[1] that has an h1 (structure is .w-layout-grid inside)
    let textGrid = gridChildren[1].querySelector('.w-layout-grid');
    if (!textGrid) {
      // fallback: direct children
      textGrid = gridChildren[1];
    }
    // Reference the actual text content grid
    textContent = textGrid;
  }

  const textRow = [textContent ? textContent : ''];

  // Assemble and replace
  const cells = [headerRow, bgImgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
