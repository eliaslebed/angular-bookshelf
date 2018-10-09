import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable } from 'rxjs/internal/Observable';
import { bufferCount, concatAll, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { concat } from 'rxjs/internal/observable/concat';
import { SearchItem } from '../models/search';
import { merge } from 'rxjs/internal/observable/merge';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  author: Observable<SearchItem[]>;
  books: Observable<SearchItem[]>;
  genre: Observable<SearchItem[]>;
  result$: Observable<SearchItem[]>;
  observableArray = [this.author, this.books, this.genre];
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService, private router: Router) {
  }

  moveToRoute(e) {
    this.router.navigate([e.url]);
  }

  ngOnInit() {
    const routes = ['books', 'genres', 'authors'];

    this.result$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap(searchTerm => concat(
        this.bookService.searchBooksByAuthor(searchTerm)
          .pipe(map(x => x.map(y => ({ title: y.name, url: `authors/${y.id}`, id: y.id, type: 'Author: ' })))),
        this.bookService.searchBooksByTitle(searchTerm)
          .pipe(map(x => x.map(y => ({ title: y.title, url: `books/${y.id}`, id: y.id, type: 'Books: ' })))),
        this.bookService.searchBooksByGenre(searchTerm)
          .pipe(map(x => x.map(y => ({ title: y.name, url: `genres/${y.id}`, id: y.id, type: 'Genres: ' })))),
      )),
      bufferCount(3),
      map(x => x.reduce((acc, y) => acc.concat(y), []))
    );
  }
}
