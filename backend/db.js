import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const conn = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
    // SQLite only
    storage: 'skvai.sqlite'
  });

  // Define a person    
  const Person = conn.define('person', {
      firstName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isEmail: true
          }
      }
  });

  const Session = conn.define('session', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });
  
  const Message = conn.define('message', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });

  // Define relationsships
  Person.hasMany(Session);
  Session.belongsTo(Person);
  Session.hasMany(Message);
  Message.belongsTo(Session);

  // 
  
  /*
  conn.sync({force:true}).then(() => {
    _.times(10, () => {
        return Person.create({
            firstName: Faker.name.firstName(), 
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(person => {
            return person.createSession({
                title: `Sample title by ${person.firstName}`
            });
        });
    });
  });
  */
  
  conn.sync({force:true}).then(() => {
    Person.create({
      firstName: 'Thomas',
      lastName: 'Hamren',
      email: 'thomas.hamren@skatteverket.se' });
    Person.create({
      firstName: 'Johan',
      lastName: 'Klippenberger',
      email: 'johan.klippenberger@skatteverket.se' });
  });

  export default conn;

