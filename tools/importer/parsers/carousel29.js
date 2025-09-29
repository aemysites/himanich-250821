/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract slide info from a swiper-slide element
  function extractSlideContent(slide) {
    // Find the image in the slide
    let img = slide.querySelector('img');
    if (!img) {
      img = document.createElement('span');
      img.textContent = 'Image missing';
    }

    // Collect all text content from the slide
    const textContent = [];
    slide.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => textContent.push(h));
    slide.querySelectorAll('p').forEach(p => textContent.push(p));
    slide.querySelectorAll('a').forEach(a => textContent.push(a));
    Array.from(slide.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        textContent.push(span);
      }
    });
    // Always return a 2-column row: image and (optional) text content (empty string if none)
    return [img, textContent.length > 0 ? textContent : ''];
  }

  const headerRow = ['Carousel (carousel29)'];
  const rows = [headerRow];

  // Find all slides in the carousel
  const slides = element.querySelectorAll('.swiper-slide');
  slides.forEach((slide) => {
    // Always push a 2-column row
    const row = extractSlideContent(slide);
    if (row.length === 1) row.push(''); // ensure 2 columns
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
