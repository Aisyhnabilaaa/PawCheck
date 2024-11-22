const Hapi = require('@hapi/hapi');
const articles = require('./src/routes/articles');
// const sql = require ('mysql2')
// import { server as _server } from '@hapi/hapi';
// import { routes } from './src/routes/articles';
// import { createConnection } from 'mysql2';



const init = async () => {
    // const connection = sql.createConnection({
    //     host: 'localhost',
    //     port: 3309,
    //     user: 'root',
    //     password: 'mysql123',
    //     database: 'mysql'
    // });
 
    // connection.connect((err) => {
    //     if (err) {
    //         console.error('Koneksi ke database gagal weh:', err.message);
    //         return;
    //     }
    //     console.log(' database berhasil bang!');
    // });
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