const Hapi = require('@hapi/hapi');
const articles = require('./src/routes/articles');
// const sql = require ('mysql2')
// import { server as _server } from '@hapi/hapi';
// import { routes } from './src/routes/articles';
// import { createConnection } from 'mysql2';



const init = async () => {
    //belum konek sql, codingan butull sudah
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(articles);

    await server.start();
    console.log(`Server running in ${server.info.uri}`);
};

init();