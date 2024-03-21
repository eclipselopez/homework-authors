import logger from "../../lib/logger";
import HttpServer from "../class/server.class";
import IAuthor from "../interfaces/author.interface";
import IResponse from "../interfaces/response.interface";
import Author from "../models/author.model";


export default class AuthorController {
    private server: HttpServer
    private connection = null

    constructor() {
        this.server = HttpServer.instance
    }

    async createAuthor(author: IAuthor): Promise<IResponse> {
        try {
            this.connection = this.server.app.locals.dbConnection

            const response = await Author.create(author)

            if( !response ){
                return { ok: false, message: 'Incorrect data', response: null, code: 422 }
            }

            return { ok: true, message: 'Author created!', response: response, code: 201 }
        } catch (err: any) {
            logger.error(`[AuthorController/createAuthor] ${err}`)
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        } finally {
            if (this.connection) await this.server.app.locals.dbConnection.release(this.connection)
        }
    }
}