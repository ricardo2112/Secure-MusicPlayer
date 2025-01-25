import xss from 'xss';

// Configuración personalizada para XSS
const sanitizerOptions = {
  whiteList: {}, // No permitir etiquetas HTML
  stripIgnoreTag: true, // Elimina cualquier etiqueta no permitida
  stripIgnoreTagBody: ["script"], // Elimina el contenido de etiquetas no permitidas
};

export const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return xss(input, sanitizerOptions);
  } else if (typeof input === "object" && input !== null) {
    const sanitizedObject = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitizedObject[key] = sanitizeInput(input[key]);
      }
    }
    return sanitizedObject;
  }
  return input;
};