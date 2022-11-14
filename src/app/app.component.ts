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
        // used in landing
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
            "agentc",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/AGENT.svg")
        );
        
        // used in projet
        this.matIconRegistry.addSvgIcon(
            "underconstruct",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/under-construction-icon.svg")
        );
    }
}
