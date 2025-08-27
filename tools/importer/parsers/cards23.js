/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the block name from instructions
  const headerRow = ['Cards (cards23)'];

  // The structure: Each .w-tab-pane contains a .w-layout-grid with <a> cards
  // Each card: image (optional), h3 (title), div.paragraph-sm (desc)
  const panes = element.querySelectorAll('.w-tab-pane');
  const rows = [];

  panes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.children).filter((child) => child.tagName === 'A');
    cards.forEach((card) => {
      // Get the first image inside the card (if any)
      const img = card.querySelector('img');
      // Get the first h3 (title)
      const title = card.querySelector('h3');
      // Get the first description paragraph
      const desc = card.querySelector('div.paragraph-sm');

      // Compose the text cell contents in order: title (if present), then desc (if present)
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // If neither title nor desc, fallback to card content
      if (textCell.length === 0) textCell.push(card);

      // If image is present, first col is image, else empty string
      if (img) {
        rows.push([img, textCell]);
      } else {
        rows.push(['', textCell]);
      }
    });
  });

  // Compose the table: header + rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
