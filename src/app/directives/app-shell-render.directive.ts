import { Directive, ViewContainerRef, Inject, PLATFORM_ID, TemplateRef } from "@angular/core";
import { isPlatformServer } from "@angular/common";


@Directive({
    selector: '[appShellRender]'
})
export class AppShellRenderDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private template: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId
    ) {

    }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.template);
        } else {
            this.viewContainer.clear();
        }
    }
}