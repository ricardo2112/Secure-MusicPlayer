/*export const sanitizeInput = (input) => {
    const element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML;
  };
*/

import DOMPurify from 'dompurify';

// Función para sanitizar entradas de usuario
export const sanitizeInput = (input) => {
  // Usamos DOMPurify para limpiar el input
  return DOMPurify.sanitize(input);
};
