import {Request, Response} from 'express'
import knex from '../database/connection'

class pointsController{
  async index(request: Request, response: Response){
    const { city, uf, items } = request.query

    const parsedItems = String(items).split(',').map(item => Number(item.trim()))
    
    const points = await knex('points').join('point_items','points.id', '=', 'point_items.point_id')
                  .whereIn('point_items.item_id',parsedItems)
                  .where('city', String(city))
                  .where('uf', String(uf))
                  .distinct()
                  .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...points,
        image_url: `http://192.168.0.102:3333/uploads/${point.image}`,
      }
    })
    return response.json(serializedPoints)
  }

  async show(request: Request, response: Response){
    const {id} = request.params

    const point = await knex('points').where('id',id).first()

    const items = await knex('items').join('point_items','items.id', '=', 'point_items.item_id')
                  .where('point_items.point_id', id).select('items.title')

    if(!point){
      return response.status(400).json({message:'point not found'})
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.102:3333/uploads/${point.image}`,
    }

    return response.json({point:serializedPoint,items})
  }
  async create (request: Request, response: Response){
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city,
      items
    } = request.body
    
    const trx = await knex.transaction()
  
    const point = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image: request.file.filename
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]
  
    const pointItems = items
              .split(',')
              .map((item:string) => Number(item.trim()))
              .map((item_id:number) => {
                return { item_id, point_id }
              })
    
    await trx('point_items').insert(pointItems)
  
    await trx.commit()

    return response.json({
      id: point_id,
      ...point,
    })
  }
}

export default pointsController