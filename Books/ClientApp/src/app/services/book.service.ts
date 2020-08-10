import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BookListHandler } from 'src/app/models/bookListHandler';
import { BookHttpService } from './http/book-http.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private listName = 'bookListHandler';
  private list: BookListHandler = {
    books: [],
    added: [],
    deleted: []
  };

  constructor(
    private bookHttp: BookHttpService
  ) { }

  private getAllBooksFromLS() {
    let obj = JSON.parse(localStorage.getItem(this.listName)) as BookListHandler;
    if (obj && obj.books) {
      this.list = obj;
    }
  }
  
  private setAllBooksToLS(bookListHandler: BookListHandler) {
    localStorage.setItem(this.listName, JSON.stringify(bookListHandler));
  }

  private getBookHandler(): void {
    this.bookHttp.getAllBooks().subscribe((res) => {
      if(res){
      this.list.books = res as Book[];
      }
      this.setAllBooksToLS(this.list);
    }, error => {
      console.log("No Data on Server!");

    })
  }

  getBooks() {
    this.getAllBooksFromLS();
    if (!this.list.books.length) {
      this.getBookHandler();
    }
    return this.list;
  }
}
