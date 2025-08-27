/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as in the example
  const header = ['Carousel (carousel36)'];

  // Find container and main grid
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Each row contains text/buttons or images, try to find the text area and the images grid
  let textArea = null;
  let imagesGrid = null;
  Array.from(mainGrid.children).forEach((child) => {
    if (!textArea && child.querySelector('h1, h2, h3, h4, h5, h6')) {
      textArea = child;
    }
    if (!imagesGrid && child.querySelector('.grid-layout')) {
      const possibleGrid = child.querySelector('.grid-layout');
      if (possibleGrid && possibleGrid.querySelector('img')) {
        imagesGrid = possibleGrid;
      }
    }
  });

  if (!imagesGrid) return;

  // Get all images inside imagesGrid
  const images = Array.from(imagesGrid.querySelectorAll('img'));

  // Prepare rows for the table
  const rows = images.map((img, idx) => {
    // First cell: image element (referenced directly)
    const imgCell = img;
    // Second cell: For the first image, include the text area; for others, leave empty as in the example
    let textCell = '';
    if (textArea && idx === 0) {
      textCell = textArea;
    }
    return [imgCell, textCell];
  });

  // Compose the table array: 2 columns per row, first row is block name
  const tableArray = [header, ...rows];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
