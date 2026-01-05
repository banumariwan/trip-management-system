export const isAuthenticated = () => !!localStorage.getItem("access");

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};
