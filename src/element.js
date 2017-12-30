/**
 * Get element's text.
 * @param {string} selector
 * @param {HTMLElement|Document} [parent]
 * @returns {string}
 */
export function getText (selector, parent = document) {
  const element = parent.querySelector(selector)
  const text = element.textContent || ''
  return text
}
