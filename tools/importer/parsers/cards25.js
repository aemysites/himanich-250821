/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards25) block, two columns: image | text
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get all immediate children that could be a card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');
    // Find the text content (h3/h2 + p)
    let textBox = null;
    // Prefer a .utility-padding-all-2rem div, but fallback to div.utility-position-relative
    const pad = card.querySelector('.utility-padding-all-2rem');
    if (pad) {
      textBox = pad;
    } else {
      // Sometimes the structure is: image + .utility-position-relative > ...
      const rel = card.querySelector('.utility-position-relative');
      if (rel) textBox = rel;
    }
    // If no textBox, skip this card (do not add image-only cards)
    if (!img || !textBox) return;
    // Keep reference to DOM nodes, not HTML markup or cloned elements
    cells.push([img, textBox]);
  });

  // Only create table if we have at least one card row
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
