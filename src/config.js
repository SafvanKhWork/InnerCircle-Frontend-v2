// let url = "https://pacific-lowlands-79996.herokuapp.com";
let url = "http://localhost:3000";
const getAuthHeader = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
let refreshEvery = 5000;
export { url, getAuthHeader, refreshEvery };
