/* global WebImporter */
export default function parse(element, { document }) {
  // Only process the first accordion block for Accordion (accordion17)
  const accordion = element.querySelector('.accordion .cmp-accordion');
  if (!accordion) return;

  // Header row: exactly one column
  const rows = [['Accordion (accordion17)']];

  // Extract accordion items
  const itemNodes = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  itemNodes.forEach(item => {
    // Title
    let title = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }
    // Content: collect all visible block-level elements only, not concatenated text
    let content = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Find the .cmp-text block inside the panel (usually contains the answer)
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        // Clone the cmpText node and remove empty paragraphs
        const clone = cmpText.cloneNode(true);
        clone.querySelectorAll('p').forEach(p => {
          if (!p.textContent.trim()) p.remove();
        });
        content = clone;
      } else {
        // Fallback: use panel itself
        content = panel.cloneNode(true);
      }
    }
    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
