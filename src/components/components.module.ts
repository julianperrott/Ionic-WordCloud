import { NgModule } from '@angular/core';
import { CommonHeaderComponent } from './common-header/common-header';
import { FooterLinksComponent } from './footer-links/footer-links';
import { ExpandableComponent } from './expandable/expandable';
import { WordCloudComponent } from './word-cloud/word-cloud';

@NgModule({
    declarations: [
        CommonHeaderComponent,
        FooterLinksComponent,
        ExpandableComponent,
        WordCloudComponent
    ],
    imports: [],
    exports: [
        CommonHeaderComponent,
        FooterLinksComponent,
        ExpandableComponent,
        WordCloudComponent
    ]
})
export class ComponentsModule {}
