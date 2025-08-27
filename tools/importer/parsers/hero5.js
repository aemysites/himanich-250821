/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: matches example exactly
  const headerRow = ['Hero (hero5)'];

  // Find the main grid containing content and image
  const mainGrid = element.querySelector('.grid-layout');
  // Grid may have two children: one grid with text/buttons, one image
  const children = Array.from(mainGrid.children);

  // Find the image element for row 2
  const image = children.find(child => child.tagName === 'IMG');

  // Find the content block: grid with text and buttons
  let textBlock = null;
  const containerGrid = children.find(child => child.classList.contains('container'));
  if (containerGrid) {
    textBlock = containerGrid.querySelector('.section');
  }

  // Defensive fallback if section is missing
  if (!textBlock && containerGrid) {
    // Just use the container grid if section is missing
    textBlock = containerGrid;
  }

  // Defensive fallback if image is missing
  const imageCell = image ? image : '';
  const textCell = textBlock ? textBlock : '';

  // Compose table data - 1 column, 3 rows
  const cells = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
