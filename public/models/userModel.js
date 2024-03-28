const MODEL_DATABASE = process.env.MODEL_DATABASE
const MODEL_USERNAME = process.env.MODEL_USERNAME
const MODEL_PASSWORD = process.env.MODEL_PASSWORD

const Sequelize = require('sequelize');
const sequelize = new Sequelize(MODEL_DATABASE, MODEL_USERNAME, MODEL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true 
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync({ force: false }) 
  .then(() => {
    console.log('Synchronized with database');
  })
  .catch(err => {
    console.error('Error synchronizing with database:', err);
  });

module.exports = User;
