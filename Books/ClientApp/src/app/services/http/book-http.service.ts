import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { booksUrl } from 'src/app/configs/api-endpoint.constants';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBooks() {
    return this.http.get(booksUrl);
  }

  addBooks(books: Book[]) {
    return this.http.post(booksUrl, books);
  }

  deleteBooks(books: Book[]) {
    return this.http.post(`${booksUrl}/delete`, books);
  }
}
