import { Injectable } from '@angular/core';
import { BookListHandler } from '../models/bookListHandler';

@Injectable({
  providedIn: 'root'
})
export class StoreHandlerService {

  private listName = 'bookListHandler';

  constructor() { }

  getStorage():BookListHandler{
    return JSON.parse(localStorage.getItem(this.listName)) as BookListHandler;
  }

  setStorage(bookListHandler: BookListHandler){
    localStorage.clear();
    localStorage.setItem(this.listName, JSON.stringify(bookListHandler));
  }
}
