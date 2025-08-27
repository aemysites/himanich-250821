/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block spec
  const headerRow = ['Carousel (carousel16)'];

  // Find the grid of slides
  let grid = null;
  const centered = element.querySelector('.centered');
  if (centered) {
    grid = centered.querySelector('.grid-layout');
  }
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }

  const slideRows = [];
  if (grid) {
    const slideContainers = Array.from(grid.children);
    slideContainers.forEach(container => {
      // 1. Extract image
      let img = null;
      const aspect = container.querySelector('.utility-aspect-2x3');
      if (aspect) {
        img = aspect.querySelector('img');
      } else {
        img = container.querySelector('img');
      }

      // 2. Extract possible text content (anything not in .utility-aspect-2x3, including text nodes)
      let textElements = [];
      Array.from(container.childNodes).forEach(node => {
        // Skip aspect/image wrappers
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('utility-aspect-2x3')) return;
        // If element node, push directly
        if (node.nodeType === Node.ELEMENT_NODE) {
          textElements.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // If text node, wrap in a <span> for safe block table
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          textElements.push(span);
        }
      });
      // Compose the slide row as [image, text cell (empty if none)]
      slideRows.push([
        img,
        textElements.length > 0 ? textElements : ''
      ]);
    });
  }

  if (slideRows.length === 0) return;

  const cells = [headerRow, ...slideRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
