/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner section
  const bannerSection = element.querySelector('section.banner-section');
  if (!bannerSection) return;

  // Find the background image (must reference the actual <img> element)
  const img = bannerSection.querySelector('img.banner-image');
  const imageCell = [img ? img : ''];

  // Find the CTA button (if present)
  let cta = null;
  const ctaDiv = bannerSection.querySelector('.banner-cta');
  if (ctaDiv) {
    const link = ctaDiv.querySelector('a[href]');
    if (link) {
      // Reference the actual anchor element
      cta = link;
    }
  }

  // Extract all text content from the banner-section__wrapper except CTA
  const wrapper = bannerSection.querySelector('.banner-section__wrapper');
  let contentNodes = [];
  if (wrapper) {
    // Find all direct children except .banner-cta
    Array.from(wrapper.children).forEach((child) => {
      if (child.classList.contains('banner-cta')) return;
      // If child contains text, preserve semantic tags
      if (child.childNodes.length) {
        child.childNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            contentNodes.push(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            contentNodes.push(p);
          }
        });
      }
    });
  }
  // Add CTA at the end if present
  if (cta) contentNodes.push(cta);

  // Compose table rows
  const headerRow = ['Hero (hero8)'];
  const rows = [headerRow, imageCell, [contentNodes.length ? contentNodes : '']];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
