import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Components } from '../components';

import { MyApp } from './app.component';
import { Pages } from '../pages';

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
import { ShapePopoverPage } from '../components/shape-picker/shapePopover/shapePopover';

import { D3CloudFacade } from '../components/word-cloud/Style/D3CloudFacade';
import { GlowingStyle } from '../components/word-cloud/Style/GlowingStyle';
import { WaterMaskStyle } from '../components/word-cloud/Style/WaterMaskStyle';
import { SnowMaskStyle } from '../components/word-cloud/Style/SnowMaskStyle';

@NgModule({
    declarations: [MyApp, Pages, Components, WordCloudComponent, LinkCloudComponent, PopoverPage, AboutPage, ColorPicker, ShapePicker, ShapePopoverPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            menuType: 'push'
        }),
        IonicPageModule.forChild(AboutPage),
        IonicPageModule.forChild(PopoverPage),
        IonicPageModule.forChild(ShapePopoverPage),
        IonicPageModule.forChild(ColorPicker),
        IonicPageModule.forChild(ShapePicker)
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, Pages, PopoverPage, ColorPicker, ShapePicker, ShapePopoverPage],
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
        WordsToCountService,
        D3CloudFacade,
        GlowingStyle,
        WaterMaskStyle,
        SnowMaskStyle
    ]
})
export class AppModule {}
