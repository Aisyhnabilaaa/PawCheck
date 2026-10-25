require('dotenv').config();
const {Sequelize} = require('sequelize')
// Inisialisasi koneksi Sequelize
// Nilai diambil dari environment variable (file .env), lihat .env.example
const sequelizeConnect = new Sequelize(
  process.env.DB_NAME || 'pawcheck',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3309,
    dialect: 'mysql',
  }
);

(async () => {
  try{
    await sequelizeConnect.authenticate()
    console.log('bisa connect')
  } catch (err){
    console.log("error apa ", err)
  }
})()

module.exports = sequelizeConnect;