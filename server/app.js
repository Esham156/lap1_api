const express = require('express')
const cors = require("cors")
const fruits = require('./fruits.json')
const app = express()

// const fruits = [
//     {
//       "name": "apple"
//     },
//     {
//       "name": "pear"
//     },
//     {
//         "name": "watermelon"
//     },
//     {
//         "id": 4,
//         "name": "date"
//     }
//   ]


// app.get('/', (req,res)=>{
//     res.send('Are you reddy')
//     console.log("api reponded")
// })
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Are you reddy!', description: 'This API is about fruits' });
});


app.get('/fruits/',(req,res)=>{
    // console.log(req.params)
    const f_id = req.params
    // const fruit = fruits[f_id-1]
    if (!f_id){
        res.status(404).json({message: `goat id ${f_id} not found`})
    }
    res.send(fruits)
    
})

app.get('/fruits/:id',(req,res)=>{
    console.log(req.params)
    const f_id = req.params.id
    const fruit = fruits[f_id-1]
    if (!fruit){
        res.status(404).json({error: `Fruit with id ${f_id} not found`})
    }
    res.send(fruit)
    
})

app.post('/fruits',(req,res)=>{
    const fruit = req.body
    const last_fruit = fruits[fruits.length - 1]
    const last_id = last_fruit? last_fruit.id - 1 : 1
    fruit.id = last_id;
    if (fruit.name){
        fruits.push(fruit),
        res.status(201).send(fruit);
    } else {
        res.status(422).send({ error: 'you need a name to create a fruit'})
    }
})

module.exports = app