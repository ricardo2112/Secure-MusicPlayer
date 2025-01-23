export const API_URL = "http://localhost:3000/auth";

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  //return await response.json(); // Devuelve tokens y datos de usuario
  const data = await response.json(); // Procesa el JSON
  console.log("Respuesta del backend en loginUser:", data); // Verifica la respuesta
  return data; // Devuelve los datos para el contexto
};


export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error al registrarse. Por favor, verifica los datos.");
  }

  return await response.json();
};
