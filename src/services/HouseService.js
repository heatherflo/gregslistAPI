import { dbContext } from "../db/DbContext.js"


class HouseService {
  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async getHouse() {
    const houses = await dbContext.Houses.find() //no filter means it will give you allthe houses
    return houses
  }

  async getOneHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId) //finds the house in the database based on its ID
    if (!house) { //if its not found then it will throw an error
      throw new Error('could not find house, try again')
    }
    return house //if found will return house
  }

  async searchHouses(year) {
    const houses = await dbContext.Houses.find({ year: year }) //search the database for the houses by the year - note the way the find is utilized {the key comin from the model : the value coming fro the house we are searching for i.e 1990}
    return houses //return houses to the controller
  }

  async deleteHouse(houseId) {
    const houseToDelete = await dbContext.Houses.findById(houseId)//sending a request to the db to get the id we want 
    if (!houseToDelete) { //searching for the correct house if it is there or not and sending an error message if its not found 
      throw new ErrorEvent("Sorry try again")
    }
    await houseToDelete.remove() //if we didn't hit the error then this would happen and actually remove the house 
    return `${houseId} was deleted` //still  have access to the information on the house as its being deleted. 
  }

  async updateHouse(houseId, updateHouse) { //running both things through the service to the database so we can get both back and make sure we are updating the correct house - attaches the Id to the updates 

    const originalHouse = await this.getOneHouse(houseId) //uses this function again is repetitive for the answer we will receive back - which is the ID of one specific house. Could also use the same process and find the house again 

    originalHouse.bedrooms = updateHouse.bedrooms != undefined ? updateHouse.bedrooms : originalHouse.bedrooms // saying if the updated house doesn't have a value then we can use the old value but if there was a new one imputed then we would use that instead. 

    await originalHouse.save() //saves the updates 
    return originalHouse //returns the original house with the updates to the user
  }

}

export const houseService = new HouseService()