import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Observable<Book>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private bookService: BookService) {
    this.book = route.paramMap.pipe(
      filter(p => p.has('bookId')),
      switchMap(p => this.bookService.getBookById(Number(p.get('bookId'))))
    );

  };

  routeBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
