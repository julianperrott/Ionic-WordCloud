import {} from 'jasmine';
import { TestBed, async } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { MyApp } from './app.component';

import { AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {
    AlertControllerMock,
    MenuControllerMock,
    PlatformMock,
    SplashScreenMock,
    StatusBarMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [IonicModule.forRoot(MyApp)],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: MenuController, useClass: MenuControllerMock }
            ]
        });
    }));

    beforeEach(() => {
        //fixture = TestBed.createComponent(MyApp);
        //component = fixture.componentInstance;
    });

    it('should be created', () => {
        //expect(component instanceof MyApp).toBe(true);
    });

    it('should have two pages', () => {
        //  expect(component.pages.length).toBe(2);
    });
});
