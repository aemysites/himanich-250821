/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example exactly
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Each accordion item is a direct child with class 'accordion' or 'w-dropdown'
  const items = Array.from(element.children).filter(
    (child) => child.classList.contains('accordion') || child.classList.contains('w-dropdown')
  );

  items.forEach((item) => {
    // Title cell: find the .paragraph-lg inside the w-dropdown-toggle
    let title = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!title) {
      // Fallback: use the w-dropdown-toggle itself if .paragraph-lg not found
      title = item.querySelector('.w-dropdown-toggle');
    }

    // Content cell: find .accordion-content or .w-dropdown-list
    let contentNav = item.querySelector('.accordion-content, .w-dropdown-list');
    let contentCell = null;
    if (contentNav) {
      // Find .rich-text or .w-richtext inside contentNav
      let richtext = contentNav.querySelector('.rich-text, .w-richtext');
      if (richtext) {
        contentCell = richtext;
      } else if (contentNav.children.length) {
        // If there is no richtext, use all children of contentNav
        contentCell = Array.from(contentNav.children);
      } else {
        // If empty, use the contentNav itself
        contentCell = contentNav;
      }
    } else {
      // If not found, use an empty string
      contentCell = '';
    }
    // Add the row (reference actual elements)
    rows.push([title, contentCell]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
