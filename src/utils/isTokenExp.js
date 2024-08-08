import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decode = jwtDecode(token);
    const currantTime = Date.now() / 1000;
    return decode.exp < currantTime;
  } catch (error) {
    console.log("ERROR :: utils / isTokenExpired ::", error);
  }
};

export default isTokenExpired;
