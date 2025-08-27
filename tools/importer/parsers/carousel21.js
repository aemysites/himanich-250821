/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must be exactly one column
  const headerRow = ['Carousel (carousel21)'];

  // Find all card-body containers (each is a slide)
  const cardBodies = element.querySelectorAll('.card-body');
  
  // Build rows for each slide
  const rows = [];
  cardBodies.forEach(cardBody => {
    // First column: image (mandatory)
    const img = cardBody.querySelector('img');
    // Second column: text content (optional)
    const heading = cardBody.querySelector('.h4-heading');
    let textCell = '';
    if (heading && heading.textContent.trim()) {
      // Use semantic heading element
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      textCell = h2;
    }
    rows.push([img, textCell]);
  });

  // The cells array: header row (1 column), then each slide row (2 columns)
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
