/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu (tab labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];
  // Extract tab labels (text only)
  const tabLabels = tabLinks.map(link => {
    const labelEl = link.querySelector('div') || link;
    return labelEl.textContent.trim();
  });

  // Find the tab content panels
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // For each pane, extract the main content block (usually a child div)
  const tabBlocks = tabPanes.map(pane => {
    // Get the innermost grid or block; fallback to pane itself if not found
    const contentBlock = pane.querySelector('.w-layout-grid, .tabs-content, .w-tab-pane > div') || pane;
    return contentBlock;
  });

  // Compose rows: header, then for each tab: label, content
  const tableRows = [];
  tableRows.push(['Tabs']);
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i] || '';
    const content = tabBlocks[i] || '';
    tableRows.push([label, content]);
  }

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
