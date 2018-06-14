import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Pages } from '../pages/index';
import { Components } from '../components/index';

import { PopoverPage } from '../components/popover/popover';

import { AboutPage } from '../pages/about/about';

import { IonPrismDirective } from 'ion-prism';
import { WordCloudComponent } from '../components/word-cloud/word-cloud';
import { LinkCloudComponent } from '../components/link-cloud/link-cloud';

import { ConfigurationService } from '../services/configuration.service';
import { HtmlToLinksService } from '../services/htmlToLinks.service';

import { IonicPageModule } from 'ionic-angular';

import { Screenshot } from '@ionic-native/screenshot';
import { ScreenshotService } from '../services/screenshot.service';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ColorPicker } from '../components/color-picker/color-picker';

@NgModule({
    declarations: [
        MyApp,
        Pages,
        Components,
        IonPrismDirective,
        WordCloudComponent,
        LinkCloudComponent,
        PopoverPage,
        AboutPage,
        ColorPicker
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            menuType: 'push'
        }),
        IonicPageModule.forChild(AboutPage),
        IonicPageModule.forChild(PopoverPage),
        IonicPageModule.forChild(ColorPicker)
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, Pages, PopoverPage, ColorPicker],
    providers: [
        StatusBar,
        SplashScreen,
        ConfigurationService,
        HtmlToLinksService,
        Screenshot,
        ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ScreenshotService
    ]
})
export class AppModule {}
