const Base = require("./base/base")

class CarCategory extends Base {
	constructor({id, name, carsId, price}) {
		super({id, name})

		this.carsId = carsId
		this.price = price
	}
}

module.exports = CarCategory
