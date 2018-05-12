import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Popover } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Pages } from '../pages/index';
import { Components } from '../components/index';

import { PopoverPage } from '../pages/popover/popover';

import { IonPrismDirective } from 'ion-prism';
import { WordCloudComponent } from '../components/word-cloud/word-cloud';

import { ConfigurationService }     from '../app/configuration.service';

@NgModule({
    declarations: [
        MyApp,
        Pages,
        Components,
        IonPrismDirective,
        WordCloudComponent,
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
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
