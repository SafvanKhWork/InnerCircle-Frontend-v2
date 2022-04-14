let url = "http://localhost:3000";
const getAuthHeader = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
let refreshEvery = 30000;
export { url, getAuthHeader, refreshEvery };
