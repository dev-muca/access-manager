// config.js
const isDevelopment = process.env.NODE_ENV === "development";

const config = {
  apiBaseUrl: isDevelopment ? "http://localhost:3000" : "http://26.246.216.159:80",
};

export default config.apiBaseUrl;
