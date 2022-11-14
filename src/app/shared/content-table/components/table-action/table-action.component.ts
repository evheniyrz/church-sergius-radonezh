import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent implements OnInit {

  @Input() contentID!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
