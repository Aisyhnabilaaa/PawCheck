const {Sequelize} = require('sequelize')
// Inisialisasi koneksi Sequelize
const sequelizeConnect = new Sequelize('pawcheck', 'root', 'mysql123', {
  host: 'localhost',
  port: 3309,
  dialect: 'mysql',
});

(async () => {
  try{
    await sequelizeConnect.authenticate()
    console.log('bisa connect')
  } catch (err){
    console.log("error apa ", err)
  }
})()

module.exports = sequelizeConnect;