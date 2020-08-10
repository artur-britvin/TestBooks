import { Genre } from './genre.enum';

export interface Book {
    id?: number;
    title?: string;
    author?: string;
    volumeOfPages?: number;
    countryOfPublication?: string;
    genre?: Genre;
}

