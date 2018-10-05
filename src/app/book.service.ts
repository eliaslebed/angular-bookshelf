import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from './models/author';

@Injectable()
export class BookService {
  private API_PATH = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http.get(`${this.API_PATH}/books`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/books/${bookId}`);
  };

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${this.API_PATH}/authors/${authorId}`);
  };
}
