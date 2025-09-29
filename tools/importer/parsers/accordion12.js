/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find all accordion items
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item'));

  // Table header row as per block guidelines
  const headerRow = ['Accordion (accordion12)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: find the button title span
    const button = item.querySelector('.cmp-accordion__button');
    let titleSpan = button && button.querySelector('.cmp-accordion__title');
    // Defensive: fallback to button text if span missing
    let titleCell = titleSpan || button;

    // Content cell: find the panel content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    // Defensive: use panel children if present, else panel itself
    let contentCell;
    if (panel) {
      // If panel has only one child, use that, else use all children
      if (panel.children.length === 1) {
        contentCell = panel.children[0];
      } else if (panel.children.length > 1) {
        contentCell = Array.from(panel.children);
      } else {
        contentCell = panel;
      }
    } else {
      contentCell = '';
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
