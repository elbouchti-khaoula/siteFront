import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Projet } from 'app/core/services/projets/projets.types';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'projet-contact',
    templateUrl: './contact.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetContactComponent implements OnInit {
    @Input() drawer: MatDrawer;
    @Input() projet: Projet;

    visible: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    closeDrawer(): void {
        this.visible.next(false);
        this.drawer.close();
    }

}
