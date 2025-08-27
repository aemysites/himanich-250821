/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // 2. Extract all direct card elements
  // Defensive: select only direct children with the card link class
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cards.forEach(card => {
    // First cell: image (MANDATORY). Find the .utility-aspect-3x2 wrapper, then the img
    let imageCell = null;
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) {
        imageCell = img;
      } else {
        // fallback: if no img, put the wrapper
        imageCell = imageWrapper;
      }
    }

    // Second cell: text content (MANDATORY). Collect tag, heading, paragraph
    const textCell = [];
    const paddingDiv = card.querySelector('.utility-padding-all-1rem');
    if (paddingDiv) {
      // Tag: optional, present in .tag-group .tag
      const tag = paddingDiv.querySelector('.tag-group .tag');
      if (tag) {
        textCell.push(tag);
      }
      // Heading: optional, h3.h4-heading
      const heading = paddingDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCell.push(heading);
      }
      // Paragraph: optional, paragraph-sm
      const paragraph = paddingDiv.querySelector('p.paragraph-sm');
      if (paragraph) {
        textCell.push(paragraph);
      }
      // No CTA per provided HTML
    }

    // Defensive: skip rows if both cells are missing
    if (imageCell || textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  // 3. Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
