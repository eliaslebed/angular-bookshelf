import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from './models/author';
import { filter, map, tap } from 'rxjs/operators';

@Injectable()
export class BookService {
  private API_PATH = 'http://localhost:3000';
  public query = '';
  public searchThreshold = 2;

  constructor(private http: HttpClient) {

  }

  getAllBooks() {
    return this.http.get<Book[]>(`${this.API_PATH}/books`);
  }

  getBooksByGenre(genreId: number) {
    return this.http.get<Book[]>(`${this.API_PATH}/books/genreId/${genreId}`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/books/${bookId}`);
  };

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${this.API_PATH}/authors/${authorId}`);
  };

  getGenreById(genreId: number) {
    return this.http.get<Author>(`${this.API_PATH}/genres/${genreId}`);
  }

  searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.http.get(`${this.API_PATH}?q=${this.query}&_limit=${this.searchThreshold}`)
      .pipe(map((book) => book));
  }
}
