import { Router } from 'express'

import ArticlesController from './ArticlesController'

const articlesRouter = Router()
const articlesController = new ArticlesController()

articlesRouter.get('/articles', articlesController.get)
articlesRouter.post('/import', articlesController.import)

export default articlesRouter
