const menu = require('../data/pizzas.json') 

exports.getInfo = (sabor) => {
        const pizza = menu[sabor]
        return pizza
}

exports.getAllOptions = () =>{
        let pizzas = [];
        for(let prop in menu){
            pizzas = pizzas + menu[prop].Pizza+'; '
        }
        console.log(pizzas)
        return pizzas
}

