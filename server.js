const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.use(express.json());

app.listen(8080, () => {
    console.log('Listening on port 8080')
})

//============1. Be Polite, Greet the User============

app.get('/greetings', (req, res) => {
    const name = req.query.name
    console.log(req.query)
    res.send(`Hello there, ${name}!`)
})

//============2. Rolling the Dice============

app.get('/roll', (req, res) => {
    const number = req.query.number
    console.log(req.query)
    res.send(`You rolled a ${number}.`)
})

//============3. I Want THAT One!============

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {

    const index = parseInt(req.params.index);

    if (index >= 0 && index < collectibles.length) {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
      } 
      else {
        res.send('This item is not yet in stock. Check back soon!');
      }
});

//============4. Filter Shoes by Query Parameters============

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const {minPrice, maxPrice, type} = req.query;
    let filteredShoes = shoes;
    if(minPrice){
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.price >= parseFloat(minPrice)
        });
    }

    if(maxPrice){
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.price <= parseFloat(maxPrice)
        });
    }

    if(type){
        filteredShoes = filteredShoes.filter(shoe => {
            return shoe.type.toLowerCase() === type.toLowerCase()
        });
    }

    res.json(filteredShoes);

});