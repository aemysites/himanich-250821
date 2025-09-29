/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if the expected notification structure is present
  const notificationsContainer = element.querySelector('.notifications-container');
  if (!notificationsContainer) return;

  // Table header row
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  // Find all notification cards
  const notificationList = notificationsContainer.querySelector('.notification-list');
  if (!notificationList) return;

  // Helper: Generate icon/image for notification type/status
  function getIcon(type, status) {
    // Use emoji as icon based on type and status
    let emoji = '🔔';
    if (type === 'filmy_poster') {
      if (status === 'inProgress') emoji = '🎬';
      else if (status === 'ready') emoji = '📄';
      else if (status.startsWith('rejected')) emoji = '🚫';
    } else if (type === 'family_frames') {
      if (status === 'inProgress') emoji = '🖼️';
      else if (status === 'ready') emoji = '💌';
      else if (status.startsWith('rejected')) emoji = '🚫';
    }
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.fontSize = '2rem';
    span.style.display = 'block';
    span.style.textAlign = 'center';
    return span;
  }

  // Get all notification-wrapper elements
  const notificationWrappers = notificationList.querySelectorAll('.notification-wrapper');
  notificationWrappers.forEach((wrapper) => {
    const type = wrapper.getAttribute('data-type');
    const status = wrapper.getAttribute('data-status');
    const title = wrapper.getAttribute('data-title');
    const subtitle = wrapper.getAttribute('data-subtitle');

    // First column: icon
    const icon = getIcon(type, status);

    // Second column: text content
    // Instead of creating a new div, use all text content from the wrapper attributes
    const textCell = [];
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title.trim();
      textCell.push(heading);
    }
    if (subtitle) {
      const desc = document.createElement('p');
      desc.textContent = subtitle.trim();
      textCell.push(desc);
    }

    // Optionally add CTA if status is 'ready'
    if (status === 'ready') {
      let href = '';
      let label = '';
      if (type === 'filmy_poster') {
        href = element.querySelector('.notification-path')?.getAttribute('data-poster-ready-path') || '';
        label = 'View Poster';
      } else if (type === 'family_frames') {
        href = element.querySelector('.notification-path')?.getAttribute('data-frame-ready-path') || '';
        label = 'View Frame';
      }
      if (href) {
        const cta = document.createElement('a');
        cta.href = href;
        cta.textContent = label;
        textCell.push(cta);
      }
    }

    // Only push row if there is text content
    if (textCell.length > 0) {
      rows.push([icon, textCell]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
