import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {
    IonicApp,
    IonicErrorHandler,
    IonicModule
} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Pages } from '../pages/index';
import { Components } from '../components/index';

import { PopoverPage } from '../pages/popover/popover';

import { IonPrismDirective } from 'ion-prism';
import { WordCloudComponent } from '../components/word-cloud/word-cloud';
import { LinkCloudComponent } from '../components/link-cloud/link-cloud';

import { ConfigurationService } from '../app/configuration.service';
import { HtmlToLinksService } from '../app/htmlToLinks.service';

@NgModule({
    declarations: [
        MyApp,
        Pages,
        Components,
        IonPrismDirective,
        WordCloudComponent,
        LinkCloudComponent,
        PopoverPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            menuType: 'push'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, Pages, PopoverPage],
    providers: [
        StatusBar,
        SplashScreen,
        ConfigurationService,
        HtmlToLinksService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
