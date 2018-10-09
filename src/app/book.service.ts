import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from './models/author';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Genre } from './models/genre';

@Injectable()
export class BookService {
  private API_PATH = 'http://localhost:3000';

  public static searchIsEmpty(searchTerm: string) {
    if (searchTerm && !searchTerm.trim()) {
      return of([]);
    }
  }

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

  searchBooksByTitle(searchTerm: string): Observable<Book[]> {
    BookService.searchIsEmpty(searchTerm);

    return this.http.get<Book[]>(`${this.API_PATH}/books/?q=${searchTerm}`).pipe(
      tap(_ => console.log(`books with matching ${searchTerm} searching term`))
    );
  }

  searchBooksByGenre(searchTerm: string): Observable<Genre[]> {
    BookService.searchIsEmpty(searchTerm);

    return this.http.get<Genre[]>(`${this.API_PATH}/genres/?q=${searchTerm}`).pipe(
      tap(_ => console.log(`books with matching ${searchTerm} searching term`))
    );
  }

  searchBooksByAuthor(searchTerm: string): Observable<Author[]> {
    BookService.searchIsEmpty(searchTerm);

    return this.http.get<Author[]>(`${this.API_PATH}/authors/?q=${searchTerm}`).pipe(
      tap(_ => console.log(`books with matching ${searchTerm} searching term`))
    );
  }

  //
  // searchBooks(searchTerm: string): Observable<any> {
  //   return this.http.get(`${this.API_PATH}?q=${searchTerm}`);
  // }
}
