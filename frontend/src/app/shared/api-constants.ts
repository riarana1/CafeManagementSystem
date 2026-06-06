/**
 * Centralized API Base URL configuration.
 * Uses Vite environment variables with a fallback for local development.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8081').replace(
  /\/$/,
  '',
);
