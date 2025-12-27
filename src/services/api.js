// 👇 Naya Render Link yaha daal do (End mein '/api' zaroor lagana)
const BASE_URL = "https://dubaicity-backend-7.onrender.com/api";


export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data === "Invalid Credentials" ? null : data;
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const purchaseProduct = async (userId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const fetchUserHistory = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/history/${userId}`);
    return response.ok ? await response.json() : [];
  } catch (error) {
    console.error("Login Error:", error);
    return [];
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "customer", // Default role as required
      }),
    });
    // The backend returns a String message, so we use .text() instead of .json()
    return await response.text();
  } catch (error) {
    console.error("Signup Error:", error);
    return "Error connecting to server";
  }
};
