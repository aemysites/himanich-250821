/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header
  const headerRow = ['Accordion (accordion13)'];

  // Collect all accordion items: each is a .divider direct child of the root
  // Each .divider contains a .w-layout-grid with first child = title, second child = content
  const rows = [];
  element.querySelectorAll(':scope > .divider').forEach(divider => {
    // Find the grid
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid || grid.children.length < 2) return;
    // Reference existing elements
    const title = grid.children[0];       // Usually .h4-heading
    const content = grid.children[1];     // Usually .rich-text
    rows.push([title, content]);
  });

  // Compose the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
