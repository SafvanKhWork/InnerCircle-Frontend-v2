let url = "https://young-ocean-95829.herokuapp.com/";
const getAuthHeader = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
let refreshEvery = 3000;
export { url, getAuthHeader, refreshEvery };
