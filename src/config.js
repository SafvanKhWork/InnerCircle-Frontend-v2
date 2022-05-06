let url = "https://pacific-lowlands-79996.herokuapp.com";
const getAuthHeader = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
let refreshEvery = 3000;
export { url, getAuthHeader, refreshEvery };
