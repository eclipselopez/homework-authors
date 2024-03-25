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

    async findAuthors(term: string, limit: number, page: number): Promise<IResponse> {
        try {
            this.connection = this.server.app.locals.dbConnection
            
            if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
                return { ok: false, message: 'Invalid limit or page', response: null, code: 400 };
            }

            const regex = new RegExp(term ? term : '', 'i')

            const response = await Author.find(
                {id: regex}
            )
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

            if (response.length === 0) {
                return { ok: false, message: 'No authors found with these terms', response: null, code: 404 };
            }

            return { ok: true, message: 'Authors found!', response: response, code: 200 }
        } catch (err: any) {
            logger.error(`[AuthorController/findAuthors] ${err}`)
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        } finally {
            if (this.connection) await this.server.app.locals.dbConnection.release(this.connection)
        }    
    }

    async getAuthorById(idAuthor: string): Promise<IResponse> {
        try{
            this.connection = this.server.app.locals.dbConnection

            if (!idAuthor) {
                return { ok: false, message: 'Invalid id', response: null, code: 400 };
            }

            const response: any = await Author.findOne({_id: idAuthor})

        if (!response) {
            return { ok: false, message: 'Author not found', response: null, code: 404 };
        }

            return { ok: true, message: 'Found author!', response: response, code: 200 }
        } catch (err: any) {
            logger.error(`[AuthorController/getAuthorById] ${err}`)
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        } finally {
            if(this.connection) await this.server.app.locals.dbConnection.release(this.connection)
        }
    }

    async updateAuthor(author: IAuthor, idAuthor:string): Promise<IResponse> {
        try{
            this.connection = this.server.app.locals.dbConnection

            if (!idAuthor) {
                return { ok: false, message: 'Invalid id', response: null, code: 400 };
            }

            const response: any = await Author.findOneAndUpdate(
                {_id: idAuthor}, 
                author,
                { returnDocument: 'after' }
            )

            if (!response) {
                return { ok: false, message: 'Author not found', response: null, code: 404 };
            }

            return { ok: true, message: 'Found author!', response: response, code: 200 }
        } catch (err: any) {
            logger.error(`[AuthorController/updateAuthor] ${err}`)
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        } finally {
            if(this.connection) await this.server.app.locals.dbConnection.release(this.connection)
        }
    }

    async deleteAuthor(idAuthor: string): Promise<IResponse> {
        try{
            this.connection = this.server.app.locals.dbConnection

            if (!idAuthor) {
                return { ok: false, message: 'Invalid id', response: null, code: 400 };
            }

            const response = await Author.findOneAndDelete({_id: idAuthor})

            if (!response) {
                return { ok: false, message: 'Author not found', response: null, code: 404 };
            }

            return { ok: true, message: 'Found author!', response: response, code: 200 }
        } catch (err: any) {
            logger.error(`[AuthorController/updateAuthor] ${err}`)
            return { ok: false, message: 'Error ocurred', response: err, code: 500 }
        } finally {
            if(this.connection) await this.server.app.locals.dbConnection.release(this.connection)
        }   
    }
}