const sequelizeConnect = require('./src/config/database');
const Article = require('./src/models/articlesModels');  

const migrate = async () => {
  try {
    await sequelizeConnect.sync({ alter: true });
    console.log('bisa sinkron');
  } catch (err) {
    console.log('error migrasi', err);
  }
};

migrate();