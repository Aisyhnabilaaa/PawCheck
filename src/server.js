const Hapi = require("@hapi/hapi");
const authRoutes = require("./routes/authRoutes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["authorization", "content-type"],
      },
    },
  });

  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();