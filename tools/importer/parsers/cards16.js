/* global WebImporter */
export default function parse(element, { document }) {
  // Find the anchor link wrapping the card
  const cardLink = element.querySelector('a');

  // Find the image element inside the card
  let cardImage = null;
  const imageContainer = cardLink && cardLink.querySelector('.cardImageContainer');
  if (imageContainer) {
    cardImage = imageContainer.querySelector('img');
  }

  // Find the card title and description
  let cardTitle = null;
  let cardDescription = null;
  const cardContent = cardLink && cardLink.querySelector('.cardContent');
  if (cardContent) {
    cardTitle = cardContent.querySelector('.cardTitle');
    cardDescription = cardContent.querySelector('.cardDescription');
  }

  // Find the CTA (if present)
  let cardCta = null;
  const ctaButton = cardContent && cardContent.querySelector('.cardCta');
  if (ctaButton && cardLink) {
    // Create a link element for CTA, using the actual href and not hardcoded text
    const ctaLink = document.createElement('a');
    ctaLink.href = cardLink.getAttribute('href');
    ctaLink.textContent = ctaButton.getAttribute('title') || 'Read More';
    ctaLink.className = 'card-cta-link';
    cardCta = ctaLink;
  }

  // Compose the text cell, referencing real elements
  const textCellContent = [];
  if (cardTitle) textCellContent.push(cardTitle);
  if (cardDescription) textCellContent.push(cardDescription);
  if (cardCta) textCellContent.push(cardCta);

  // Table header must match block name exactly
  const headerRow = ['Cards (cards16)'];
  const cardRow = [cardImage, textCellContent];
  const tableCells = [headerRow, cardRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
