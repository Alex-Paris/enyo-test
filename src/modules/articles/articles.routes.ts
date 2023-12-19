import { Router } from 'express'

import ArticlesController from './ArticlesController'

const articlesRouter = Router()
const articlesController = new ArticlesController()

// articlesRouter.get('/articles', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

articlesRouter.post('/import', articlesController.import)

export default articlesRouter
