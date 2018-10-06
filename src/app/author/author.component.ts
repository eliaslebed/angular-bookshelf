import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BookService } from '../book.service';
import { Author } from '../models/author';
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: Observable<Author>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private authorService: BookService) {
    this.author = route.paramMap.pipe(
      filter(p => p.has('authorId')),
      switchMap(p => this.authorService.getAuthorById(Number(p.get('authorId'))))
    );
  }

  routeBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
