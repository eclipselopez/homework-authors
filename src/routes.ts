import { Router, Request, Response } from "express"
import AuthorController from "./controllers/author.controller"

const routes = Router()
const authorCtrl =  new AuthorController

routes.post('/author_create', async(req: Request, res: Response) => {
    try {
        const author = req.body

        const response = await authorCtrl.createAuthor(author)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status( err.code ? err.code : 500 ).json(err)
    }
})

export default routes