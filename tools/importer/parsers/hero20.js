/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - must match exactly
  const headerRow = ['Hero (hero20)'];

  // --- 2nd row: Background Image (collage of images) ---
  // Find the grid with image tiles
  let bgDiv = null;
  const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (collageGrid) {
    const imgs = collageGrid.querySelectorAll('img');
    if (imgs.length > 0) {
      bgDiv = document.createElement('div');
      bgDiv.style.display = 'flex';
      bgDiv.style.flexWrap = 'wrap';
      imgs.forEach(img => {
        bgDiv.appendChild(img);
      });
    }
  } else {
    // If no collage grid, check for at least one image anywhere inside header
    const fallbackImgs = element.querySelectorAll('img');
    if (fallbackImgs.length > 0) {
      bgDiv = document.createElement('div');
      fallbackImgs.forEach(img => bgDiv.appendChild(img));
    }
  }

  // --- 3rd row: Content (title, subheading, CTAs) ---
  // Try to find the hero text content section
  let contentParts = [];
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentSection) {
    const container = contentSection.querySelector('.container');
    if (container) {
      // Add h1
      const h1 = container.querySelector('h1');
      if (h1) contentParts.push(h1);
      // Add subheading
      const subheading = container.querySelector('p.subheading');
      if (subheading) contentParts.push(subheading);
      // Add CTA buttons
      const buttonGroup = container.querySelector('.button-group');
      if (buttonGroup) contentParts.push(buttonGroup);
    }
  }
  // If nothing found, make sure the row is not empty
  if (contentParts.length === 0) {
    contentParts = [''];
  }

  // Compose table rows according to the example
  const rows = [
    headerRow,
    [bgDiv],
    [contentParts]
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
