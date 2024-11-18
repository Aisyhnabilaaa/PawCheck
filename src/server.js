const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true, // Untuk mengizinkan permintaan dari client yang berbeda domain
      payload: {
        parse: true, // Memastikan payload diproses
        allow: "application/json", // Mengizinkan format JSON
      },
    },
  });

  // Tambahkan route di sini
  server.route(require("./api/users/routes"));

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
