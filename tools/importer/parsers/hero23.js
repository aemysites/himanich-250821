/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find first image (background)
  function findBackgroundImage(el) {
    // Find the deepest img with a real src (not data:)
    const imgs = el.querySelectorAll('img');
    for (const img of imgs) {
      if (img.src && !img.src.startsWith('data:')) {
        return img;
      }
    }
    return null;
  }

  // Helper to find heading, subheading, paragraph, and CTA
  function findContent(el) {
    // Find the main content container
    const popContent = el.querySelector('.pop-content') || el;
    // Text box: contains heading and paragraph
    const textBox = popContent.querySelector('.text_box');
    let heading = null;
    let paragraph = null;
    if (textBox) {
      heading = textBox.querySelector('h4');
      paragraph = textBox.querySelector('p');
    }
    // CTA: find the first <a> with a visible label
    let cta = null;
    const ctaBox = popContent.querySelector('.cta_box');
    if (ctaBox) {
      cta = ctaBox.querySelector('a');
    }
    return { heading, paragraph, cta };
  }

  // 1. Header row
  const headerRow = ['Hero (hero23)'];

  // 2. Background image row
  const backgroundImg = findBackgroundImage(element);
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: heading, subheading, CTA
  const { heading, paragraph, cta } = findContent(element);
  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
