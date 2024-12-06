import axios from "axios";
const API_URL = "http://127.0.0.1:5000";

const register = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

const login = async ({ email, password }) => {
  /**
 * payload is empty when status 400 
 * 
 * https://github.com/axios/axios/issues/1427
 * 
 * 
 * axios.post('SOME_ENDPOINT').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.response.data)
    }) */
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

const authFromToken = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/auth/authFromToken`,

      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const userAPI = { register, login, authFromToken };
