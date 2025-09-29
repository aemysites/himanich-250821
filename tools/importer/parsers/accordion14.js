/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must have exactly one column
  const headerRow = ['Accordion (accordion14)'];
  const rows = [headerRow];

  // Find all accordion items
  const accordionItems = element.querySelectorAll(':scope .cmp-accordion__item');

  accordionItems.forEach((item) => {
    // Title cell: get the button title span
    const button = item.querySelector('h3 .cmp-accordion__button');
    let titleSpan = button && button.querySelector('.cmp-accordion__title');
    let titleContent = titleSpan || (button ? document.createTextNode(button.textContent.trim()) : document.createTextNode(''));

    // Content cell: get the panel content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentElements = [];
    if (panel) {
      const cmpTextBlocks = panel.querySelectorAll('.cmp-text');
      if (cmpTextBlocks.length > 0) {
        cmpTextBlocks.forEach((cmpText) => {
          contentElements.push(cmpText);
        });
      } else {
        Array.from(panel.children).forEach((child) => {
          contentElements.push(child);
        });
      }
    }
    if (contentElements.length === 0) {
      contentElements = [''];
    }

    rows.push([titleContent, contentElements]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
