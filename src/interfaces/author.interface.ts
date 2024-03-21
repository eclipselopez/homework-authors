export default interface IAuthor {
    id?: string,
    name: string,
    nationality: string,
    birthDate: Date,
    biography: string,
    books?: string[]
}