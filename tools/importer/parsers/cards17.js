/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Cards (cards17)'];
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    // Extract image (mandatory)
    const img = cardDiv.querySelector('img');
    // Attempt to find any text content: headings or paragraphs within the cardDiv
    // (This template only has images, but support for variations)
    let textContent = '';
    // Find heading or paragraph as direct children (for robustness)
    const possibleText = Array.from(cardDiv.children).filter(c => {
      return c.tagName.match(/^H[1-6]$/) || c.tagName === 'P' || c.tagName === 'SPAN' || c.tagName === 'DIV';
    });
    if (possibleText.length > 0) {
      // Combine all text content found
      textContent = document.createElement('div');
      possibleText.forEach(el => textContent.appendChild(el));
    }
    // If cardDiv only has image, leave second cell empty string
    rows.push([img, textContent || '']);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
