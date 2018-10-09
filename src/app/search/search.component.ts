import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from '../models/author';
import { Genre } from '../models/genre';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs/internal/observable/merge';
import { Subject } from 'rxjs/internal/Subject';
import { concat } from 'rxjs/internal/observable/concat';
import { SearchItem } from '../models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  author: Observable<any>;
  books: Observable<any>;
  genre: Observable<any>;
  result$: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.books = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((searchTerm: string) => this.bookService.searchBooksByTitle(searchTerm)),
      map(x => x.map(y => (({ title: y.title, url: `books/${y.id}` }))))
    );

    this.genre = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((searchTerm: string) => this.bookService.searchBooksByGenre(searchTerm)),
      map(x => x.map(y => (({ title: y.name, url: `genres/${y.id}` }))))
    );

    this.author = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((searchTerm: string) => this.bookService.searchBooksByAuthor(searchTerm)),
      map(x => x.map(y => (({ title: y.name, url: `authors/${y.id}` })))),
    );

    this.result$ = merge(
      this.books,
      this.author,
      this.genre
    );
  }



}
