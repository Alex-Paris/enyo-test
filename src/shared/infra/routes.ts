import { Router } from 'express'

import articlesRouter from '../../modules/articles/articles.routes'

const routes = Router()

routes.use('/api', articlesRouter)

export default routes
