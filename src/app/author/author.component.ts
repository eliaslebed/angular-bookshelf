import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BookService } from '../book.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: Observable<Author>;

  constructor(private authorService: BookService) {
  }

  ngOnInit() {
    this.author = this.authorService.getAuthorById(1);
  }

}
