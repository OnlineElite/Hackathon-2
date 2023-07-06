const knex = require('knex');

const db = knex({
  client:'pg',
  connection:{
      host: '127.0.0.1',
      port: '5432',
      user: 'postgres',
      password: 'Elite%159',
      database: 'Snack'
  }
})

function createUser({firstname,lastname,email,username,password}){
  return db('users').insert( 
    {
      firstname : firstname,
      lastname : lastname,
      email : email,
      username : username,
      password : password
    }
  )
  .returning('*')
}

module.exports = {
  createUser
}