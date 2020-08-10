import { Component, OnInit, Input, ViewChild, IterableDiffers } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookListHandler } from 'src/app/models/bookListHandler';
import { StoreHandlerService } from 'src/app/services/store-handler.service';
import { Genre } from 'src/app/models/genre.enum';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() booksListHandler: BookListHandler;

  public genre = Genre;
  pageLength;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  iterableDiffer;

  splicedData: Book[];

  constructor(
    private storeHadnler: StoreHandlerService,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.booksListHandler.books);
    if (changes) {
      const offset = this.getOffset(this.pageIndex, this.pageSize)
      this.splicedData = this.booksListHandler.books.slice(offset).slice(0, this.pageSize);
      this.pageLength = this.booksListHandler.books.length;
    }

  }
  onDelete(book: Book) {
    let index = this.booksListHandler.books.indexOf(book);

    if (this.booksListHandler.added.includes(book)) {
      let indexInAdded = this.booksListHandler.added.indexOf(book)

      this.deleteFromList(this.booksListHandler.added, indexInAdded);
      this.deleteFromList(this.booksListHandler.books, index);
    } else {

      this.deleteFromList(this.booksListHandler.books, index);
      this.booksListHandler.deleted.push(book);
    }
    this.storeHadnler.setStorage(this.booksListHandler);

  }

  private deleteFromList(list: Book[], index: number) {
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChangeEvent(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const offset = this.getOffset(this.pageIndex, this.pageSize)
    this.splicedData = this.booksListHandler.books.slice(offset).slice(0, this.pageSize);
  }

  private getOffset(pageIndex: number, pageSize: number) {
    return ((pageIndex + 1) - 1) * pageSize;
  }

}
