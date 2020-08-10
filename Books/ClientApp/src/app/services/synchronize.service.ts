import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { intervalInMinutes } from '../configs/sync-interval.constants';
import { BookListHandler } from '../models/bookListHandler';
import { BookHttpService } from './http/book-http.service';
import { StoreHandlerService } from './store-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SynchronizeService {

  private static TIME = 60000;
  constructor(
    private bookHttpService: BookHttpService,
    private storeHandler: StoreHandlerService
  ) {}

  startSyncronize(bookListHandler: BookListHandler): void {
    
    setInterval(() => { this.synchronize(bookListHandler) }, intervalInMinutes * SynchronizeService.TIME);
  }

  synchronize(bookListHandler: BookListHandler): void {
    this.added(bookListHandler);
    this.deletes(bookListHandler);

  }

  private deletes(bookListHandler: BookListHandler): void {
    this.bookHttpService.deleteBooks(bookListHandler.deleted).subscribe(respons => {
      bookListHandler.deleted = [];
      this.storeHandler.setStorage(bookListHandler);
    })
  }

  private added(bookListHandler: BookListHandler): void {
    this.bookHttpService.addBooks(bookListHandler.added).subscribe(respons => {
      bookListHandler.added = [];
      this.storeHandler.setStorage(bookListHandler);
    })
  }
}
