/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero12)'];

  // Get the main grid layout containing hero sections
  const gridLayout = element.querySelector('.grid-layout');
  const children = gridLayout ? Array.from(gridLayout.children) : [];

  // 1. Background image (first child div's img element)
  let backgroundImg = '';
  if (children.length) {
    const bgImg = children[0].querySelector('img');
    if (bgImg) backgroundImg = bgImg;
  }

  // 2. Hero content (second child div: headline, subtext, CTA, supporting image)
  let heroContent = [];
  if (children.length > 1) {
    const contentDiv = children[1];
    // The card-body div contains the actual inner layout and content
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      // innerGrid contains all the hero content: heading, points, button, and image
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        // Gather all inner children, combine into a single cell
        // This includes the text column and the image column
        heroContent = Array.from(innerGrid.children);
      } else {
        // Fallback: include all children of cardBody
        heroContent = Array.from(cardBody.children);
      }
    } else {
      // Fallback: include all children of contentDiv
      heroContent = Array.from(contentDiv.children);
    }
  }

  // Ensure heroContent is an array (single cell in the row)
  const cells = [
    headerRow,
    [backgroundImg],
    [heroContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
