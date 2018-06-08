import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigurationService {
    static configurationChangeSource = new Subject<string>();
    static configurationBusySource = new Subject<string>();
    static urlChangeSource = new Subject<string>();
    static screenshotSource = new Subject<string>();

    configurationChanged$ = ConfigurationService.configurationChangeSource.asObservable();
    UrlChangeSource$ = ConfigurationService.urlChangeSource.asObservable();
    busyChanged$ = ConfigurationService.configurationBusySource.asObservable();
    takeScreenshot$ = ConfigurationService.screenshotSource.asObservable();

    static busy = true;
    static error = false;
    static url = '';

    configurationChanged(name: string) {
        ConfigurationService.configurationChangeSource.next(name);
    }

    takeScreenshot(name: string) {
        ConfigurationService.screenshotSource.next(name);
    }

    isBusy(): boolean {
        return ConfigurationService.busy;
    }
    setBusy(state: boolean): void {
        console.log('busy ' + state);
        ConfigurationService.busy = state;
        ConfigurationService.configurationBusySource.next(name);
    }
    setError() {
        ConfigurationService.error = true;
        ConfigurationService.configurationBusySource.next(name);
    }

    setUrl(url: string) {
        ConfigurationService.url = url;
        ConfigurationService.urlChangeSource.next(name);
    }

    clearError() {
        ConfigurationService.error = false;
        ConfigurationService.configurationBusySource.next(name);
    }

    static settings = {
        name: 'Pacifico Glow',
        fontFace: 'Pacifico',
        spiralType: 'archimedean',
        fontWeight: 'bolder',
        fontScale: 70,
        strokeColour: 'white',
        strokeOpacity: '1',
        strokeScale: 20,
        strokeMinWidth: 1,
        glowCount: 2,
        lightness: '50%',
        lightnessGlow: '50%'
    };

    static themes = [
        {
            name: 'Titan Fat',
            fontFace: 'TitanOne',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 24,
            strokeMinWidth: 1,
            glowCount: 1,
            lightness: '50%',
            lightnessGlow: '50%'
        },
        {
            name: 'Pacifico Glow',
            fontFace: 'Pacifico',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 20,
            strokeMinWidth: 1,
            glowCount: 2,
            lightness: '50%',
            lightnessGlow: '50%'
        },
        {
            name: 'Pacifico Dark',
            fontFace: 'Pacifico',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'grey',
            strokeOpacity: '1',
            strokeScale: 40,
            strokeMinWidth: 1,
            glowCount: 1,
            lightness: '0%',
            lightnessGlow: '50%'
        },
        {
            name: 'Permanent Marker Black and White',
            fontFace: 'PermanentMarker',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'black',
            strokeOpacity: '0.7',
            strokeScale: 40,
            strokeMinWidth: 1,
            glowCount: 1,
            lightness: '90%',
            lightnessGlow: '50%'
        },
        {
            name: 'Permanent Marker',
            fontFace: 'PermanentMarker',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 40,
            strokeMinWidth: 1,
            glowCount: 2,
            lightness: '99%',
            lightnessGlow: '50%'
        },
        {
            name: 'Josenfin Slab',
            fontFace: 'JosenfinSlab',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 40,
            strokeMinWidth: 1,
            glowCount: 2,
            lightness: '99%',
            lightnessGlow: '50%'
        },
        {
            name: 'Halloween',
            fontFace: 'HennyPenny',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 80,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 20,
            strokeMinWidth: 1,
            glowCount: 10,
            lightness: '60%',
            lightnessGlow: '20%'
        },
        {
            name: 'Halloween II',
            fontFace: 'MetalMania',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 80,
            strokeColour: 'white',
            strokeOpacity: '0.9',
            strokeScale: 30,
            strokeMinWidth: 0.5,
            glowCount: 5,
            lightness: '30%',
            lightnessGlow: '20%'
        }
    ];
}
