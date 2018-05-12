import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigurationService }     from '../../app/configuration.service';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private configurationService: ConfigurationService) {
  }

  ionViewDidLoad() {
    
    }

  doSomething(){
    this.configurationService.configurationChanged("banana");
  }

}
