/**
 * API configuration
 * Centralizes the backend URL so it's easy to change per environment.
 */

/** Base URL for the dashboard backend API */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/** Full prefix for v1 API endpoints */
export const API_V1_URL = `${API_BASE_URL}/api/v1`;
