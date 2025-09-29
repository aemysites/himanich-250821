/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create the text cell for each card
  function createTextCell(cardContent) {
    // Get all text content from cardContent, including title, rating, prep time, difficulty
    // But also include any other text nodes present
    const textCell = document.createElement('div');
    // Title as heading
    const titleEl = cardContent.querySelector('.recipeTile');
    if (titleEl) {
      const h3 = document.createElement('h3');
      h3.textContent = titleEl.textContent.trim();
      textCell.appendChild(h3);
    }
    // Get all spans except title
    Array.from(cardContent.querySelectorAll('span'))
      .filter(span => !span.classList.contains('recipeTile'))
      .forEach(span => {
        // Remove any child img
        Array.from(span.querySelectorAll('img')).forEach(img => img.remove());
        // Add text if present
        if (span.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = span.textContent.trim();
          textCell.appendChild(p);
        }
      });
    return textCell;
  }

  // Find all cards
  const cards = Array.from(element.querySelectorAll('.recipeListing__card'));
  const rows = [];
  // Header row
  rows.push(['Cards (cards19)']);
  // Card rows
  cards.forEach(card => {
    // Find image
    const imgEl = card.querySelector('.card-img img');
    // Find card content
    const cardContent = card.querySelector('.card-content');
    // Defensive: only add if both image and content exist
    if (imgEl && cardContent) {
      rows.push([
        imgEl,
        createTextCell(cardContent)
      ]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
