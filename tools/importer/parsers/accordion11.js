/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a class
  function getAccordionItems(root) {
    // Defensive: find all immediate children with class 'cmp-accordion__item'
    return Array.from(root.querySelectorAll(':scope > .cmp-accordion__item'));
  }

  // Find the inner accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  const headerRow = ['Accordion (accordion11)'];
  const rows = [headerRow];

  const items = getAccordionItems(accordion);
  items.forEach((item) => {
    // Title cell: get the button title
    let titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell = titleSpan ? titleSpan : document.createTextNode('');

    // Content cell: get the panel content
    let panel = item.querySelector('.cmp-accordion__panel');
    let contentCell;
    if (panel) {
      // Defensive: use all children of panel (usually a div.text)
      // If there are multiple children, include them all
      const panelChildren = Array.from(panel.children);
      if (panelChildren.length === 1) {
        contentCell = panelChildren[0];
      } else if (panelChildren.length > 1) {
        contentCell = panelChildren;
      } else {
        // Fallback: empty cell
        contentCell = document.createTextNode('');
      }
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
