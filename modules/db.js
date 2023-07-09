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
  console.log(`im inserting into db this data: ${firstname} , ${lastname} , ${email}, ${username}, ${password}`)
  return db('users').insert( 
    {
      first_name : firstname,
      last_name : lastname,
      email : email,
      username : username,
      password : password
    }
  )
  .returning('*')
}

function createItem(data){
  //data.items.forEach(data => {
   /*console.log(`im inserting into db this data: 
    ${data.id} , 
    ${data.name} , 
    ${data.category} ,
    ${data.rating}, 
    ${data.price},
    ${data.img}, 
    ${data.quantity}`)*/
    return db('fooditems').insert( 
      {
        item_id : data.id,
        name : data.name,
        category : data.category,
        rating : data.rating,
        price : data.price,
        img : data.img,
        quantity : data.quantity
      }
    )
    .returning('*')
  //});
   
  
}

module.exports = {
  createUser,
  createItem
}