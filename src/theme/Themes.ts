import { Injectable } from '@angular/core';

@Injectable()
export class Themes {
    static items = [
        {
            name: 'Titan Fat',
            fontFace: 'TitanOne',
            spiralType: 'archimedean',
            fontWeight: 'bolder',
            fontScale: 100,
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
            fontScale: 100,
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
            fontScale: 100,
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
            fontScale: 100,
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
            fontScale: 100,
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
            fontScale: 100,
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
            fontScale: 90,
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
            fontScale: 90,
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
