const houses = require('./db.json')
let globalID = 4

module.exports = {
    getHouses: (req, res) => {
    res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const body = req.body
        const newHouse = {
                id: globalID,
                address: body.address,
                price: body.price,
                imageURL: body.imageURL
            }
            parseInt(body.price)
            houses.push(newHouse)
            res.status(200).send(houses)
            globalID++
        
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        const index = houses.findIndex(house => {
            console.log(house, id)
            return house.id === +id
        })
        if (houses[index] > globalID) {
            res.status(400).send('Id is not in database.')
        }
        houses.splice(index, 1)

        res.status(200).send(houses)
    },
    updateHouse: (req,res) => {
        const {id} = req.params
        const {type} = req.body
        const index = houses.findIndex(house => {
            return house.id === +id
        })

        if(houses[index].price <= 0 && type === 'minus') {
            res.status(400).send(`can't have a negative price.`)
        } else if(type === "plus") {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if(type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}