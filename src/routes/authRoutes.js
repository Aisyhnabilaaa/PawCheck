const authHandler = require("../handlers/authHandler");

const routes = [
  {
    method: "POST",
    path: "/register",
    handler: authHandler.register,
  },
  {
    method: "POST",
    path: "/login",
    handler: authHandler.login,
  },
];

module.exports = routes;
