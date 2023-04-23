import axios from "axios";

const API_URL = "https://localhost:8085/api/auth/";

const register = (email, password, firstname, lastname) => {
    return axios.post(API_URL + "signUp", {
        email,
        password,
        firstname,
        lastname
    });
};

const login = (userEmail, password) => {
    return axios
        .post(API_URL + "signIn", {
            userEmail,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
