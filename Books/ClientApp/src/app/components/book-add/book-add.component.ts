import { Component, OnInit, Input, Inject } from '@angular/core';
import { BookListHandler } from 'src/app/models/bookListHandler';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { Genre } from 'src/app/models/genre.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreHandlerService } from 'src/app/services/store-handler.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  booksListHandler: BookListHandler;
  public genres = Genre;

  constructor(
    private storeHadnler: StoreHandlerService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public handler) {
    this.booksListHandler = handler;
  }

  bookForm = this.fb.group({
    title: [
      "",
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)]
    ],
    author: [
      "",
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)]
    ],
    volumeOfPages: [
      null,
      [Validators.required]
    ],
    countryOfPublication: [
      "",
      [Validators.required, Validators.minLength(2)]
    ],
    genre: [
      "",
      [Validators.required]
    ],
  })

  ngOnInit(): void {
  }

  onSubmit() {
    var book = this.bookForm.value as Book
    this.booksListHandler.added.push(book);
    this.booksListHandler.books.push(book);
    this.storeHadnler.setStorage(this.booksListHandler);
  }
}
