import axios from "axios";
const API_URL = "http://127.0.0.1:5000/";

const authenticate = async () => {
  try {
    const response = await axios.get(
      `${API_URL}api/auth/authenticate`,

      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const login = async ({ email, password }) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const userAPI = { login, authenticate };
