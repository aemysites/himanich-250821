/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the main content container
  function getMainContent(el) {
    // Defensive: find the first .offcanvas-body or .pop-content
    let body = el.querySelector('.offcanvas-body');
    if (!body) body = el.querySelector('.pop-content');
    return body || el;
  }

  // 1. Header row
  const headerRow = ['Hero (hero5)'];

  // 2. Background image row (optional)
  // Try to find a prominent image (not SVG data URI)
  let bgImg = null;
  const imgEls = element.querySelectorAll('img');
  for (const img of imgEls) {
    if (img.src && !img.src.startsWith('data:')) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: title, subheading, CTA
  const mainContent = getMainContent(element);
  // Defensive: find heading, paragraph, and CTA
  let title = mainContent.querySelector('h4, h1, h2, h3');
  let subheading = null;
  let para = null;
  let cta = null;
  // Try to find subheading and paragraph
  const ps = mainContent.querySelectorAll('p');
  if (ps.length > 0) para = ps[0];
  // Try to find CTA (a with href)
  cta = mainContent.querySelector('a[href]');

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (para) contentCell.push(para);
  if (cta) contentCell.push(cta);

  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
