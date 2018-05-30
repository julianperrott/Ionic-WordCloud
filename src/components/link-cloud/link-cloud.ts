import { Component, Input, OnChanges } from '@angular/core';

import { Link } from '../../app/htmlToLinks.service';

import { ConfigurationService } from '../../app/configuration.service';

@Component({
  selector: 'link-cloud',
  templateUrl: 'link-cloud.html'
})
export class LinkCloudComponent implements OnChanges {
  @Input() links:Link[];
  text: string;
  rows = [];
  sortedLinks:Link[]=[];

  constructor(private configurationService: ConfigurationService) {
  }

  navigateTo(url){
  this.configurationService.setUrl(url);
}

  ngOnChanges() {
    let rows = [];
    let row =[];

    let sortedLinks = this.links.sort((a:Link, b:Link) => b.text.length - a.text.length || a.text.localeCompare(b.text));
      
    
    const reducer = (accumulator:Link[], currentValue:Link) => { 
      if (accumulator.length == 0 || accumulator[accumulator.length - 1].text != currentValue.text){
        accumulator.push(currentValue);
      }
      return accumulator;
    }
    
    this.sortedLinks = sortedLinks.reduce(reducer, []);
  


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
