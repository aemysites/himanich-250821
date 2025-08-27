/* global WebImporter */
export default function parse(element, { document }) {
  // Header exactly as specified
  const headerRow = ['Cards (cards24)'];

  // Collect card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // FIRST CELL: The card image (always present in the first child div with an <img>)
    let imageCell = null;
    const imgParentDiv = card.querySelector('div img') ? card.querySelector('div img').parentElement : null;
    if (imgParentDiv) {
      imageCell = imgParentDiv;
    }

    // SECOND CELL: All text content (meta + heading)
    const cellParts = [];
    // Get meta row (tag and date) if present
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) {
      cellParts.push(metaRow);
    }
    // Get the main heading (h1-h4)
    const heading = card.querySelector('h1, h2, h3, h4');
    if (heading) {
      cellParts.push(heading);
    }
    // Compose row
    return [imageCell, cellParts];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
