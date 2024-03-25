import { Router, Request, Response } from "express"
import AuthorController from "./controllers/author.controller"

const routes = Router()
const authorCtrl =  new AuthorController

routes.post('/create_author', async(req: Request, res: Response) => {
    try {
        const author = req.body

        const response = await authorCtrl.createAuthor(author)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status( err.code ? err.code : 500 ).json(err)
    }
})

routes.get('/find_authors', async(req: Request, res: Response) => {
    try{
        const {term, page, limit} = req.query

        const response = await authorCtrl.findAuthors(String(term), Number(page), Number(limit))
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status( err.code ? err.code : 500).json(err)
    }
})

routes.get('/get_author/:idAuthor', async(req: Request, res: Response) => {
    try{
        const { idAuthor } = req.params

        const response = await authorCtrl.getAuthorById(String(idAuthor))
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

routes.put('/update_author/:idAuthor', async(req: Request, res:Response) => {
    try {
        const { idAuthor } = req.params
        const body = req.body
        
        const response = await authorCtrl.updateAuthor(body, idAuthor)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

routes.delete('/delete_author/:idAuthor', async(req: Request, res: Response) => {
    try{
        const { idAuthor } = req.params

        const response = await authorCtrl.deleteAuthor(idAuthor)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

export default routes