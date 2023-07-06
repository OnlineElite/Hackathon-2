const exp = require('express');
const bp = require('body-parser');
const DB = require('./modules/db');
const knex = require('knex')

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
const app = exp();

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use('/',exp.static(__dirname+'/public'));

const port = 8080;


// API for register  //**********************************************************//
app.post('/register',(req,res)=>{
    console.log('requist recived', req.body)
    const temp = Object.values(req.body)
    console.log(temp)
    if(!isEnyInputEmpty(temp)){

        if(isUserAllreadyExsist()){
            res.sendStatus = 404;
            res.send({message : "Hello this account is allready exsist"})
        }
        else{
            DB.createUser(req.body)
            .then(data => {
                res.sendStatus = 200;
                res.send({message : `Hello your account is now created!`}) //add firstname to the message
            })
            .catch(err => {
                res.send({message:err.detail})
            })
        }     
    }
    else{
        res.sendStatus = 404;
        res.send({message : "Please fill all the fields"})
    }
    function isEnyInputEmpty(temp){
        if(temp.length < 5){
            return true;
        }
        else{
            return temp.some((val) => val == "" || val == null);
        }
    }
    function isUserAllreadyExsist(){
        const {firstname,lastname,email,username,password} = req.body;
        db('users')
        .select('user_id','username')
        .where({username:username})
        .then(data => {
            console.log(data);
            if(data.length>0){
                return true;
            }
            else {
                return false;
            }
        })
        .catch(err => {
            console.log(err);
            res.send({message:err.detail})
        })
    }
    
})

// API for login  /**********************************************************//
app.post('/login',(req,res)=>{
    console.log('requist recived', req.body)
    const temp = Object.values(req.body)
    console.log(temp)
    if(!isEnyInputEmpty(temp)){
        const {user, pass} = req.body;
        db('users')
        .select('user_id','username')
        .where({username:user})
        .then(data => {
            console.log(data);
            if(data.length>0){
            res.send({message:`Username: ${data[0].username}  |  User_id: ${data[0].user_id}`})
            }
            else {
            res.send({message : "Hello this account is not registred"})
            }
        })
        .catch(err => {
            console.log(err);
            res.send({message:err.detail})
        })
    }
    else{
        res.sendStatus = 404;
        res.send({message : "Please fill all the fields"})
    }
    function isEnyInputEmpty(temp){
        if(temp.length < 2){
            return true;
        }
        else{
            return temp.some((val) => val == "" || val == null);
        }
    }  
})

app.listen(port, ()=> console.log(`server listening on port ${port} `))

