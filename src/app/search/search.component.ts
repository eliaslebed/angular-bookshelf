import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  book: Observable<Book>;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.book = this.bookService.getBookById(1);
  }

}
