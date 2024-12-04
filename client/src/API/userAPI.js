import axios from "axios";

const login = async ({ email, password }) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const userAPI = { login };
