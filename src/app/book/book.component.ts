import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Observable<Book>;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.book = this.bookService.getBookById(1);
  }

}
