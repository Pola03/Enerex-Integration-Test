import {jwtDecode} from "jwt-decode";

export function getCurrentUser() {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // acá están los datos del usuario
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
}
