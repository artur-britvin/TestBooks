import { Book } from './book';

export interface BookListHandler {
    books: Book[],
    deleted: Book[],
    added: Book[]
}
