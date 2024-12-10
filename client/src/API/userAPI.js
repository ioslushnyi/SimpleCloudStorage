const API_URL = "http://127.0.0.1:5000";

const register = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = {
      data: {
        success: response.ok,
        ...(await response.json()),
      },
    };

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = {
      data: {
        success: response.ok,
        ...(await response.json()),
      },
    };

    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const authFromToken = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/authFromToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    const result = {
      data: {
        success: response.ok,
        ...(await response.json()),
      },
    };
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

export const userAPI = { register, login, authFromToken };
