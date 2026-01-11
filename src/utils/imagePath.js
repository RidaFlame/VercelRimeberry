/**
 * Get the correct image path with base URL
 * @param {string} path - Image path starting with /
 * @returns {string} - Image path with base URL prepended
 */
export const getImagePath = (path) => {
  // Remove leading slash if present (we'll add base + slash)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Get base URL from Vite
  const base = import.meta.env.BASE_URL || '/';
  // Ensure base ends with / and path doesn't start with /
  const baseUrl = base.endsWith('/') ? base : base + '/';
  return baseUrl + cleanPath;
};

