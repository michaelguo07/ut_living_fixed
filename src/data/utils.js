/**
 * Slugify a property or plan name for clean URL paths.
 * @param {string} name
 * @returns {string}
 */
export function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Normalize property names to match across different scraper sources and UI configurations.
 * Removes parentheticals, common stop words ('at', 'austin'), and punctuation.
 * @param {string} name
 * @returns {string}
 */
export function normalizePropertyName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // remove parentheticals like "(various locations)"
    .replace(/\b(at|austin)\b/g, '') // reduce minor naming variations (e.g. "The Standard Austin" vs "The Standard at Austin")
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}
