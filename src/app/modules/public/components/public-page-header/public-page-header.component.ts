import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-public-page-header',
  templateUrl: './public-page-header.component.html',
  styleUrls: ['./public-page-header.component.scss']
})
export class PublicPageHeaderComponent implements OnInit {

  @Output() onTriggerChange: EventEmitter<void> = new EventEmitter();

  @Input() isMenuOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidenav(): void {
    this.onTriggerChange.next();
  }

}
