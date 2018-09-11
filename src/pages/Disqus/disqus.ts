import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-about',
    templateUrl: 'disqus.html'
})
export class DisqusPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
