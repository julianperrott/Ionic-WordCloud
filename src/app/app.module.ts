import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Components } from '../components/index';

import { MyApp } from './app.component';
import { Pages } from '../pages/index';

import { PopoverPage } from '../components/popover/popover';

import { AboutPage } from '../pages/about/about';

import { WordCloudComponent } from '../components/word-cloud/word-cloud';
import { LinkCloudComponent } from '../components/link-cloud/link-cloud';

import { ConfigurationService } from '../services/configuration.service';
import { HtmlToLinksService } from '../services/htmlToLinks.service';
import { HtmlToTextService } from '../services/htmlToText.service';
import { WordsToCountService } from '../services/wordsToCountService';

import { IonicPageModule } from 'ionic-angular';

import { Screenshot } from '@ionic-native/screenshot';
import { ScreenshotService } from '../services/screenshot.service';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ColorPicker } from '../components/color-picker/color-picker';
import { ShapePicker } from '../components/shape-picker/shape-picker';

@NgModule({
    declarations: [
        MyApp,
        Pages,
        Components,
        WordCloudComponent,
        LinkCloudComponent,
        PopoverPage,
        AboutPage,
        ColorPicker,
        ShapePicker
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            menuType: 'push'
        }),
        IonicPageModule.forChild(AboutPage),
        IonicPageModule.forChild(PopoverPage),
        IonicPageModule.forChild(ColorPicker),
        IonicPageModule.forChild(ShapePicker)
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, Pages, PopoverPage, ColorPicker, ShapePicker],
    providers: [
        StatusBar,
        SplashScreen,
        ConfigurationService,
        HtmlToLinksService,
        HtmlToTextService,
        Screenshot,
        ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ScreenshotService,
        WordsToCountService
    ]
})
export class AppModule {}
