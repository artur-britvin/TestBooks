import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { SynchronizeService } from 'src/app/services/synchronize.service';
import { BookListHandler } from 'src/app/models/bookListHandler';
import { BookListComponent } from '../book-list/book-list.component';
import { promise } from 'protractor';
import { MatDialog } from '@angular/material/dialog';
import { BookAddComponent } from '../book-add/book-add.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  booksListHandler: BookListHandler = {
    books: [],
    added: [],
    deleted: []
  };

  constructor(
    private bookService: BookService,
    private syncService: SynchronizeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.booksListHandler = this.bookService.getBooks();
    this.syncService.startSyncronize(this.booksListHandler);
  }

  onDialog() {
    this.dialog.open(BookAddComponent, {
      data: this.booksListHandler
    });
  }
}
