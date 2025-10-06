/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for required structure
  if (!element) return;

  // Header row as per block guidelines
  const headerRow = ['Accordion (accordion10)'];

  // Accordion item parsing
  // Title: inside .cmp-accordion__title
  // Content: inside .cmp-accordion__panel (may contain .text > .cmp-text)

  // Get the title text element
  let titleSpan = null;
  const header = element.querySelector('.cmp-accordion__header');
  if (header) {
    const button = header.querySelector('.cmp-accordion__button');
    if (button) {
      titleSpan = button.querySelector('.cmp-accordion__title');
    }
  }

  // Get the content element (panel)
  let content = null;
  const panel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  if (panel) {
    // Defensive: use the entire panel content
    content = panel;
  }

  // Build the table rows
  const rows = [headerRow];
  if (titleSpan && content) {
    rows.push([titleSpan, content]);
  } else {
    // Fallback: if missing, use textContent
    const fallbackTitle = document.createElement('span');
    fallbackTitle.textContent = element.textContent || 'Accordion Item';
    const fallbackContent = document.createElement('div');
    fallbackContent.textContent = '';
    rows.push([fallbackTitle, fallbackContent]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
