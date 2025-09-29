/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // 2. Find the carousel wrapper
  const swiper = element.querySelector('.swiper.primary-swiper');
  if (!swiper) {
    return;
  }

  // 3. Find all slides
  const slides = swiper.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    // Find the image (mandatory)
    const img = slide.querySelector('img');
    if (!img) return;
    // Try to find any text content in the slide
    let textContent = '';
    // Look for headings, paragraphs, or any text blocks inside the slide
    const textBlocks = slide.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .quote-text');
    if (textBlocks.length > 0) {
      // Combine all text blocks, preserving basic structure
      textContent = Array.from(textBlocks).map((el) => el.cloneNode(true)).map((el) => el.outerHTML).join('');
    }
    // Always push a two-column row: image and text content (empty string if none)
    rows.push([img, textContent]);
  });

  // 4. Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
