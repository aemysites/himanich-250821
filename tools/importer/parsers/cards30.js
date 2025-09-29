/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panels (each language tab)
  const tabPanels = Array.from(element.querySelectorAll('.cmp-tabs__tabpanel'));

  // Prepare card rows
  const cardRows = [];

  tabPanels.forEach((panel) => {
    // Only process panels with visible poster cards
    const posterContainer = panel.querySelector('.poster-container');
    if (posterContainer) {
      const items = Array.from(posterContainer.querySelectorAll('.poster-container__item'));
      items.forEach((item) => {
        const img = item.querySelector('img');
        if (!img) return;
        // Try to get all text content from poster card (including overlay and adjacent text)
        let textContent = '';
        // Collect all text from direct children except img
        Array.from(item.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textContent += node.textContent.trim() + ' ';
          } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
            textContent += node.textContent.trim() + ' ';
          }
        });
        textContent = textContent.trim();
        // Fallback: Use filename as title if no text found
        let title = '';
        const damPath = item.getAttribute('data-dam-path');
        if (damPath) {
          const match = damPath.match(/\/([^/]+)\.[a-zA-Z]+$/);
          if (match) {
            title = match[1].replace(/[-_]/g, ' ');
            title = title.replace(/\b\w/g, c => c.toUpperCase());
          }
        }
        // Compose the text cell
        const textCell = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = textContent || title || 'Poster';
        textCell.appendChild(strong);
        cardRows.push([img, textCell]);
      });
    }
  });

  // Table header must match the block name exactly and have only one column
  // For cards block, header row is a single cell, then all data rows have two columns
  const headerRow = ['Cards (cards30)'];
  const rows = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
