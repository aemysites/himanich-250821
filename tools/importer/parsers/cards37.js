/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of cards
  const topGrid = element.querySelector('.w-layout-grid');
  if (!topGrid) return;

  // Prepare rows for the table
  const rows = [];
  rows.push(['Cards (cards37)']); // Table header matches EXACTLY per guideline

  // Gather the immediate children of the top grid
  const topGridChildren = Array.from(topGrid.children);
  // First card: a.utility-link-content-block as a direct child of topGrid
  let firstCard = null;
  let nestedGrid = null;
  // Find the first card and (optionally) the nested grid
  for (const child of topGridChildren) {
    if (child.matches('.utility-link-content-block')) {
      firstCard = child;
    } else if (child.matches('.w-layout-grid')) {
      nestedGrid = child;
    }
  }

  // Helper to parse a card link
  function parseCard(card) {
    // Image: prefer .utility-aspect-2x3, fallback .utility-aspect-1x1, then <img>
    let imgDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : card.querySelector('img');
    // Text: Heading
    let heading = card.querySelector('h2, h3, h4, h5, h6');
    // Description: p
    let desc = card.querySelector('p');
    // CTA: .button
    let cta = card.querySelector('.button');
    // Compose cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    // If textContent empty, fallback to card.textContent
    let textCell = textContent.length > 0 ? textContent : '';
    return [img || '', textCell];
  }

  // Parse first card if found
  if (firstCard) {
    rows.push(parseCard(firstCard));
  }
  // Parse nested grid cards if found
  if (nestedGrid) {
    const cardLinks = Array.from(nestedGrid.querySelectorAll('.utility-link-content-block'));
    for (const card of cardLinks) {
      rows.push(parseCard(card));
    }
  }

  // Create the table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
