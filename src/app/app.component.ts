import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    )
    {
        this.matIconRegistry.addSvgIcon(
            "property",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/PROPERTY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "calculation",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/CALCULATION.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "survey",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/SURVEY.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "timeline",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/TIMELINE.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "delivery-time",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/DELIVERY-TIME.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "checklist",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/CHECKLIST.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "finance",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/FINANCE.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "clock",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/clock.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "underconstruct",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/under-construction.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "maplocation",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/map-location.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "arrow-right",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/angle-circle-arrow-right-icon.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "home-repair",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/HOME-REPAIR.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "user-cercle",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/user-cercle.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "home-heart",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/home-heart.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "fork",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/fork.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "pdf",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/pdf.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "agent",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/AGENT.svg")
        );
        
    }
}
