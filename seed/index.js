const faker = require('faker')
const Car = require('../src/etities/car')
const Customer = require('../src/etities/customer')
const CarCategory = require('../src/etities/carCategory')
const { writeFileSync } = require('fs')
const { join } = require('path')

const seederBaseFolder = join(__dirname, "../", "database")
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carsId: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carsId.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({min: 18, max: 90})
  })
  customers.push(customer)
}

const write = async (filename, data) => writeFileSync(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('customers.json', customers)
  await write('carCategories.json', [carCategory])
})()
