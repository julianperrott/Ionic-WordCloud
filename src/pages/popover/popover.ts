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

  themes = [];
  theme = { fontScale: 0, fontFace: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private configurationService: ConfigurationService) {
    this.themes = ConfigurationService.themes;
    this.theme = ConfigurationService.settings;
  }

  ionViewDidLoad() {
    
    }

  update(){
    this.configurationService.configurationChanged("");
  }

  themeChanged(){
    this.configurationService.setTheme(this.theme);
  }

}
