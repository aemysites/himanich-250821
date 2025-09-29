/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must be exactly one column)
  const headerRow = ['Accordion (accordion24)'];

  // Get all immediate accordion items
  const items = Array.from(element.querySelectorAll(':scope > .cmp-accordion__item'));

  // Build rows for each accordion item
  const rows = items.map(item => {
    // Title cell: find the span with class 'cmp-accordion__title'
    const titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell = titleSpan ? titleSpan.textContent : item.querySelector('button')?.textContent || '';

    // Content cell: find the panel and extract only its content (not wrapper divs)
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = '';
    if (panel) {
      // Find the cmp-text inside panel, and use its children
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        // Only include element nodes (e.g., <p>, <ul>, etc.)
        contentCell = Array.from(cmpText.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      } else {
        // fallback: use all element children of panel
        contentCell = Array.from(panel.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      }
    } else {
      contentCell = '';
    }

    return [titleCell, contentCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
