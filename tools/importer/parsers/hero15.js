/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER ROW: Always use the target block name exactly
  const headerRow = ['Hero (hero15)'];

  // IMAGE ROW: Find the main image (background/decorative)
  let imageEl = element.querySelector('img');
  const imageRow = [imageEl ? imageEl : '']; // Reference, do not clone or use URL

  // CONTENT ROW: Find the headline/subheading/CTA
  // Only include actual content, not empty headings
  let textBlock = element.querySelector('.cmp-text');
  let contentCell = '';
  if (textBlock) {
    // Remove empty or whitespace-only headings (e.g., <h1><a>&nbsp;</a></h1>)
    const textClone = textBlock.cloneNode(true);
    textClone.querySelectorAll('h1').forEach(h1 => {
      if (!h1.textContent.trim()) h1.remove();
    });
    // All text content (including formatting) is preserved
    contentCell = textClone;
  }
  const contentRow = [contentCell];

  // Compose table: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(table);
}
