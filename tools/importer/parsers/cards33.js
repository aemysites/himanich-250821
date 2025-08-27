/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];

  cardLinks.forEach(card => {
    // Get image (first img in card)
    const img = card.querySelector('img');
    // Get inner grid (holds content area)
    const innerGrid = card.querySelector('div.w-layout-grid');
    let contentDiv = null;
    if (innerGrid) {
      // Find the div after the image (usually 2 children: [img, div])
      const kids = Array.from(innerGrid.children);
      contentDiv = kids.length > 1 ? kids[1] : kids[0];
    } else {
      // fallback: if not found, use card
      contentDiv = card;
    }
    // Defensive: ensure image and content are present
    const imgCell = img ? img : '';
    const contentCell = contentDiv ? contentDiv : '';
    rows.push([imgCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
