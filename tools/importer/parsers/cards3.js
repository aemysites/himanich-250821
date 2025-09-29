/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all directions__steps blocks
  let steps;
  if (element.classList.contains('directions__steps')) {
    steps = [element];
  } else {
    steps = Array.from(element.querySelectorAll(':scope > div.directions__steps'));
    if (steps.length === 0) steps = [element];
  }

  const rows = [];
  steps.forEach((step) => {
    // Find card image and content
    const card = step.querySelector('.directions__card');
    if (!card) return;
    const img = card.querySelector('.directions__card-image img');
    const content = card.querySelector('.directions__card-content');
    if (!img || !content) return;

    // Reference the actual image element
    // Reference the actual content element
    rows.push([img, content]);
  });

  // Only build table if we have at least one card
  if (rows.length > 0) {
    const headerRow = ['Cards (cards3)'];
    const tableRows = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  }
}
