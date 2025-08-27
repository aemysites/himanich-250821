/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, matching the example
  const headerRow = ['Hero (hero28)'];

  // Find background image (optional)
  // The image is inside the first grid cell (first direct child div of the grid layout)
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let imageElem = null;
  if (gridDivs.length > 0) {
    // Find image inside this cell (could be nested)
    imageElem = gridDivs[0].querySelector('img');
  }
  // Second row: background image (may be empty)
  const imageRow = [imageElem ? imageElem : ''];

  // Third row: text block (title, subheading, CTA)
  // This is inside the second grid cell
  let textContentElem = null;
  if (gridDivs.length > 1) {
    // The text and CTA is inside a div (utility-margin-bottom-6rem) within the cell
    const textBlock = gridDivs[1].querySelector('.utility-margin-bottom-6rem');
    if (textBlock) {
      textContentElem = textBlock;
    } else {
      // Fallback: use the whole cell
      textContentElem = gridDivs[1];
    }
  }
  const textRow = [textContentElem ? textContentElem : ''];

  // Compose table: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
