/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each info-item div
  function extractCardInfo(infoItem) {
    // Get the icon (img)
    const img = infoItem.querySelector('img');
    // Compose text cell: include all text content from infoItem
    const textCell = document.createElement('div');
    // Get all spans and text nodes
    infoItem.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'SPAN')) {
        const span = document.createElement('div');
        span.textContent = node.textContent;
        textCell.appendChild(span);
      }
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const txt = document.createElement('div');
        txt.textContent = node.textContent.trim();
        textCell.appendChild(txt);
      }
    });
    return [img, textCell];
  }

  // Build table rows
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Get all direct card items
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((infoItem) => {
    rows.push(extractCardInfo(infoItem));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
