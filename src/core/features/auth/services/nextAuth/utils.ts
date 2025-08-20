export function createUser(userData: { id: string; access_token: string; type?: string }) {
  return {
    id: userData.id,
    access_token: userData.access_token,
    type: userData.type || '',
  };
}