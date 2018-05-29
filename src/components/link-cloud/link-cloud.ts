import { Component, Input, OnChanges } from '@angular/core';

import { Link } from '../../app/htmlToLinks.service';

@Component({
  selector: 'link-cloud',
  templateUrl: 'link-cloud.html'
})
export class LinkCloudComponent implements OnChanges {
  @Input() links:Link[];
  text: string;
  rows = [];

  constructor() {
  }

  ngOnChanges() {
    let rows = [];
    let row =[];

    this.links.forEach( (link,i)=> {
      if (i==0 || link.depth == this.links[i-1].depth){
        row.push(link);
      }else {
        rows.push(row);
        row=[];
        row.push(link);
      }
    });
    rows.push(row);
    this.rows=rows;
  }

}
