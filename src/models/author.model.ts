import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    birthDate: { type: Date, required: true },
    biography: { type: String, required: true },
    books: [{ type: String }]
}, { collection: 'authors' })

const Author = mongoose.model('Author', authorSchema)

export default Author