import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from './models/author';
import { map, tap } from 'rxjs/operators';

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

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/books/${bookId}`);
  };

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${this.API_PATH}/authors/${authorId}`);
  };

  searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.http.get(`${this.API_PATH}?q=${this.query}&maxResult=${this.searchThreshold}`)
      .pipe(map((book) => book));
  }
}
