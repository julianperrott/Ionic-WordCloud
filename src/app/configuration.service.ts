import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigurationService {
    // Observable string sources
    static configurationChangeSource = new Subject<string>();
    static configurationBusySource = new Subject<string>();
    static urlChangeSource = new Subject<string>();

    // Observable string streams
    configurationChanged$ = ConfigurationService.configurationChangeSource.asObservable();

    UrlChangeSource$ = ConfigurationService.urlChangeSource.asObservable();

    busyChanged$ = ConfigurationService.configurationBusySource.asObservable();

    static busy = true;
    static error = false;
    static url = "";

    // Service message commands
    configurationChanged(name: string) {
        ConfigurationService.configurationChangeSource.next(name);
    }

    isBusy(): boolean { return ConfigurationService.busy; }
    setBusy(state: boolean): void {
        console.log("busy " + state);
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
        lightness: '99%'
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
            lightness: '50%'
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
            lightness: '50%'
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
            lightness: '0%'
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
            lightness: '90%'
        },
        {
            name: 'Permanent Marker White',
            fontFace: 'PermanentMarker',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 70,
            strokeColour: 'white',
            strokeOpacity: '1',
            strokeScale: 40,
            strokeMinWidth: 1,
            glowCount: 2,
            lightness: '99%'
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
            lightness: '99%'
        }
    ];
}
