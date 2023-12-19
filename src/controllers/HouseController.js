import { dbContext } from "../db/DbContext.js";
import { houseService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";




export class HouseController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .post('', this.createHouse)
      .get('', this.getHouse)
      .get('/:houseId', this.getOneHouse) //need to put the param you are looking for before you can run the function - and in postman you will search not by "Id" but by the actual Id number to find a specific one 
      // console.log('controller connected')
      .get('/yearHouse/:year', this.searchHouses) // variable you declared in the service to be found and the data you will be calling in postman (the user ask- ie: 1990- in postman: localhost:3000/api/houses/yearHouse/1990) 
      .delete('/:houseId', this.deleteHouse) //the param you are searching for that will be deleted (the ext ID of that object)
      .put('/:houseId', this.updateHouse)
  }

  async createHouse(request, response, next) {
    try {
      const houseData = request.body // making the data param we want to add to the body of the request  
      const house = await houseService.createHouse(houseData) //sends that info you set the param for to the service 
      response.send(house) //send that thing you received from the service back to the user 
    } catch (error) {
      next(error)
    }

  }
  async getHouse(request, response, next) {
    try {
      const houses = await houseService.getHouse() //getting houses from service 
      response.send(houses) //giving the houses to the user
    } catch (error) {
      next(error)
    }
  }

  async getOneHouse(request, response, next) {
    const houseId = request.params.houseId //setting the params that the service needs to look for 
    const house = await houseService.getOneHouse(houseId) //sends the request to the service for that specific param
    response.send(house) //gets the house and sends it back to the user
  }


  async searchHouses(request, response, next) {
    try {
      const houseYear = request.params.year //the year is the param of the house I am looking up by 
      const houses = await houseService.searchHouses(houseYear) //tells the service to go and look for houses by the year 
      response.send(houses) //sends the houses back to the user
    } catch (error) {
      next(error)
    }
  }

  async deleteHouse(request, response, next) {
    try {
      const houseId = request.params.houseId //sending request to the service to get the Id to target a delete
      const message = await houseService.deleteHouse(houseId) //telling the service to get the Id of the one we want to delete
      response.send(message) //sending a message back- not a house bc the house will have been deleting 
    } catch (error) {
      next(error)
    }
  }
  async updateHouse(request, response, next) {
    try {
      const houseId = request.params.houseId
      const updateHouse = request.body
      const house = await houseService.updateHouse(houseId, updateHouse)
      response.send(house)
    } catch (error) {
      next(error)
    }


  }


}