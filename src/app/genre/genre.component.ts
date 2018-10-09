import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Genre } from '../models/genre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  books: Observable<Book[]>;
  genre: Observable<Genre>;

  constructor(private bookService: BookService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const genreId = this.route.paramMap.pipe(
      filter(x => x.has('genreId')),
      map(x => Number(x.get('genreId'))),
    );

    this.genre = genreId.pipe(
      switchMap(x => this.bookService.getGenreById(x))
    );

    this.books = genreId.pipe(
      switchMap(x => this.bookService.getBooksByGenre(x))
    );
  }

  routeBack() {
    this.location.back();
  }

}
