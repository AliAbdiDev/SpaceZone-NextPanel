/**
 * Creates a path builder function that joins a base path with an endpoint,
 * removing any trailing slashes to ensure clean concatenation.
 *
 * @example
 * const buildPath = createPathBuilder('/api/');
 * const fullPath = buildPath('/users/'); // "/api/users"
 *
 * @param basePath - The base path (e.g. "/api/").
 * @returns A function that takes an endpoint string and returns the combined path.
 */
const cleanerString = (value: string) => value?.replace(/\/$/, '')
export const createPathBuilder = (basePath: string) => (endpoint: string) => `${cleanerString(basePath)}${cleanerString(endpoint)}`