/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  // Header row as per block guidelines
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Accordion item title: find the span inside the button
  let titleEl = null;
  const header = element.querySelector('.cmp-accordion__header');
  if (header) {
    const button = header.querySelector('button');
    if (button) {
      titleEl = button.querySelector('.cmp-accordion__title');
    }
  }

  // Accordion item content: find the panel
  let contentEl = null;
  const panel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  if (panel) {
    // Defensive: grab the first child div with class 'text' or all children
    const textDiv = panel.querySelector('.text');
    if (textDiv) {
      contentEl = textDiv;
    } else {
      // fallback: use panel itself
      contentEl = panel;
    }
  }

  // Build the row for this accordion item
  // Use the element references directly
  const row = [titleEl || '', contentEl || ''];
  rows.push(row);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
