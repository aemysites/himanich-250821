/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the first image in the popup block
  function getBackgroundImage(el) {
    // Look for .img_holder > img
    const imgHolder = el.querySelector('.img_holder');
    if (imgHolder) {
      const img = imgHolder.querySelector('img');
      if (img) return img;
    }
    // fallback: first img in block
    const fallbackImg = el.querySelector('img');
    return fallbackImg || '';
  }

  // Helper to get the heading, subheading, paragraph, and CTA
  function getTextAndCTA(el) {
    const textBox = el.querySelector('.text_box');
    let heading = null;
    let paragraph = null;
    if (textBox) {
      heading = textBox.querySelector('h4');
      paragraph = textBox.querySelector('p');
    }
    // CTA
    const ctaBox = el.querySelector('.cta_box');
    let ctaLink = null;
    if (ctaBox) {
      ctaLink = ctaBox.querySelector('a');
    }
    // Compose content
    const content = [];
    if (heading) content.push(heading);
    if (paragraph) content.push(paragraph);
    if (ctaLink) content.push(ctaLink);
    return content.length ? content : '';
  }

  // Find the main popup content block
  const genericPopup = element.querySelector('.generic-popup');
  let blockContent = genericPopup || element;

  // Compose table rows
  const headerRow = ['Hero (hero2)'];

  // 2nd row: background image (optional)
  const bgImg = getBackgroundImage(blockContent);
  const imageRow = [bgImg];

  // 3rd row: heading, subheading, CTA
  const textAndCTA = getTextAndCTA(blockContent);
  const textRow = [textAndCTA];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
