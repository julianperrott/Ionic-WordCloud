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

  fontScale = -1;
  fontFace = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, private configurationService: ConfigurationService) {
    this.fontScale = ConfigurationService.settings.fontScale;
    this.fontFace  = ConfigurationService.settings.fontFace;
  }

  ionViewDidLoad() {
    
    }

  update(){
    ConfigurationService.settings.fontScale = this.fontScale;
    ConfigurationService.settings.fontFace = this.fontFace;

    this.configurationService.configurationChanged("");
  }

}
