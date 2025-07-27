const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const registerUser = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      name: user.fullName,
      email: user.email,
      password: user.password
    }),
  });
  return await response.json();
};

export const loginUser = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
  return await response.json();
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: 'include',
  });
  if (response.ok) return (await response.json()).user;
  return null;
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: 'include',
  });
}; 