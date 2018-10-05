import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Observable<Book[]>;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.books = this.bookService.getAllBooks();
  }

}
