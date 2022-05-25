import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit {

  public sidenavOpenedChange = false;
  constructor() { }

  ngOnInit(): void {
  }

}
