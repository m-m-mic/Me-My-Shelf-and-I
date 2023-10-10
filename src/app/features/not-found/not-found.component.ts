import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

@Component({
  standalone: true,
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [ButtonModule],
})
export class NotFoundComponent implements OnInit {
  router = inject(Router);
  title = inject(Title);

  ngOnInit() {
    this.title.setTitle(convertTitle('Not Found'));
  }
}
