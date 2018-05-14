import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigurationService {

    // Observable string sources
    static configurationChangeSource = new Subject<string>();

    static settings = {
        minFontSize: 10,
        maxFontSize: 300,
        fontFace: 'TitanOne',
        spiralType : 'archimedean',
        fontWeight: 'bolder',
        fontScale: 70
    }

    // Observable string streams
    configurationChanged$ = ConfigurationService.configurationChangeSource.asObservable();

    // Service message commands
    configurationChanged(name: string) {
        ConfigurationService.configurationChangeSource.next(name);
    }
}
