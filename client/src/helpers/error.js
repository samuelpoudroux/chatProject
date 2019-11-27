
/**
 * gestionnaire d'erreur
 * @param err
 * @returns {*}
 */
export const handleExceptions = (err) => {
  // redirige vers une page indiquant à l'utilisateur qu'il n'a pas accès à la page en cas d'erreur 403
  if (err.message === 'Request failed with status code 403') {
    return window.location.replace('/403');
  }
  return false;
};
