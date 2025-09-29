/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract logo (left column)
  function getLogoSection() {
    const leftSection = element.querySelector('.footer-brand__left');
    if (leftSection) {
      // Reference the <a> containing the logo
      const logoLink = leftSection.querySelector('a');
      return logoLink || '';
    }
    return '';
  }

  // Helper: extract left nav links (middle column)
  function getLeftNav() {
    const leftNav = element.querySelector('.footer-brand__navbar--left');
    if (leftNav) {
      // Reference the <ul> containing the links
      const ul = leftNav.querySelector('ul');
      return ul || '';
    }
    return '';
  }

  // Helper: extract right nav links (right column)
  function getRightNav() {
    const rightNav = element.querySelector('.footer-brand__navbar--right');
    if (rightNav) {
      // Reference the <ul> containing the links
      const ul = rightNav.querySelector('ul');
      return ul || '';
    }
    return '';
  }

  // Compose the table rows
  const headerRow = ['Columns (columns7)'];
  const contentRow = [
    getLogoSection(),
    getLeftNav(),
    getRightNav(),
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
