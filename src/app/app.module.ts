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
import { StylePicker } from '../components/renderStyle/stylePicker';
import { ShapePopoverPage } from '../components/shape-picker/shapePopover/shapePopover';

import { D3CloudFacade } from '../components/word-cloud/d3CloudFacade';
import { GlowingStyle } from '../components/renderStyle/styles/glowingStyle';
import { WaterMaskStyle } from '../components/renderStyle/styles/waterMaskStyle';
import { SnowMaskStyle } from '../components/renderStyle/styles/snowMaskStyle';
import { ShadowMaskStyle } from '../components/renderStyle/styles/shadowMaskStyle';
import { StyleFactory } from '../components/renderStyle/styleFactory';
import { StrokedStyle } from '../components/renderStyle/styles/strokedStyle';
import { DropShadowStyle } from '../components/renderStyle/styles/dropShadowStyle';
import { DistressedStyle } from '../components/renderStyle/styles/distressedStyle';
import { SplashStyle } from '../components/renderStyle/styles/splashStyle';
import { ScratchStyle } from '../components/renderStyle/styles/scratchStyle';
import { BlopStyle } from '../components/renderStyle/styles/blopStyle';
import { PansenStyle } from '../components/renderStyle/styles/pansenStyle';
import { ShadedStyle } from '../components/renderStyle/styles/shadedStyle';
import { AnimatedPatternStyle } from '../components/renderStyle/styles/animatedPatternStyle';

@NgModule({
    declarations: [MyApp, Pages, Components, WordCloudComponent, LinkCloudComponent, PopoverPage, AboutPage, ColorPicker, ShapePicker, StylePicker, ShapePopoverPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            menuType: 'push'
        }),
        IonicPageModule.forChild(AboutPage),
        IonicPageModule.forChild(PopoverPage)
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, Pages, PopoverPage, ColorPicker, ShapePicker, ShapePopoverPage, StylePicker],
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
        SnowMaskStyle,
        ShadowMaskStyle,
        StyleFactory,
        StrokedStyle,
        DropShadowStyle,
        DistressedStyle,
        SplashStyle,
        ScratchStyle,
        BlopStyle,
        PansenStyle,
        ShadedStyle,
        AnimatedPatternStyle
    ]
})
export class AppModule {}
