/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner image (background image)
  let imgEl = element.querySelector('.banner-image');
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }

  // Find the text block containing the headline
  let textBlock = element.querySelector('.cmp-text');

  // Compose the header row exactly as specified
  const headerRow = ['Hero (hero31)'];

  // Row 2: background image (reference the actual element)
  const imageRow = [imgEl ? imgEl : ''];

  // Row 3: headline and any text content (reference the actual element)
  const textRow = [textBlock ? textBlock : ''];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
