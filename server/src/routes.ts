import express, { response, request } from 'express'
import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'
import multer from 'multer'
import multerConfig from './config/multer'
import {celebrate, Joi} from 'celebrate'

//utilizar as rotas em outro arquivo
const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post(
	'/points',
	upload.single('image'),
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),
			items: Joi.string().required()
		})
	},{
		abortEarly: false //validar todos os campos
	}),
	 pointsController.create)


export default routes
/*

{
	"name": "Mteste",
	"email": "contato@mail.com",
	"whatsapp": "99999999",
	"latitude": -47.423423,
	"longitude": -33.312344,
	"city": "Presidente Prudete",
	"uf": "SP",
	"items": [
		1,2,6 
	]
	}

*/

// const users = ['Diego','Felipe','Victor']

// app.get('/users', (request, response) => {
//   const search = String(request.query.search)
//   const filteredUsers = search ? users.filter(user => user.includes(search)) : users
//   response.json(filteredUsers)
// })

// app.get('/users/:id',(request,response) => {
//   const id = Number(request.params.id)

//   const user = users[id]

//   return response.json(user)
// })

// app.post('/user', (request,response) => {
//   const data = request.body
  
//   const user = {
//     name: data.name,
//     email: data.email
//   }
//   return response.json(user)
// })