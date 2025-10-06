/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section
  const section = element.querySelector('section.banner-section');
  if (!section) return;

  // 1. Header row: must match target block name exactly
  const headerRow = ['Hero (hero27)'];

  // 2. Background image row (must reference the actual <img> element, not URL)
  let imageRow = [''];
  const imageWrapper = section.querySelector('.banner-section__wrapper');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) {
      imageRow = [img];
    }
  }

  // 3. Content row: Headline, subheading, CTA (if present)
  let contentRow = [''];
  const textBlock = section.querySelector('.cmp-text');
  if (textBlock) {
    // Only include actual heading and paragraph elements, preserving their semantic meaning
    const contentEls = [];
    // Headings (in order)
    textBlock.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      if (h.textContent.trim()) contentEls.push(h);
    });
    // Paragraphs
    textBlock.querySelectorAll('p').forEach(p => {
      if (p.textContent.trim()) contentEls.push(p);
    });
    // If there is any content, use it; otherwise, leave cell empty
    if (contentEls.length) {
      contentRow = [contentEls];
    }
  }

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
