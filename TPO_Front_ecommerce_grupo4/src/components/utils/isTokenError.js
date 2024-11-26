export const isTokenError = (error) => {
    return error === 'Token expired' || error === 'No token found';
  };