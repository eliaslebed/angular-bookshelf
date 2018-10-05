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

  public books? = [];

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    const array = this.bookService.getBooks();
    console.log(array);
  }

}
