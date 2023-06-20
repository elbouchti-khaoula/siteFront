import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projet } from 'app/core/services/projets/projets.types';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector       : 'contact-promoteur-popup',
    templateUrl    : './contact-promoteur-popup.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class ContactPromoteurPopupComponent implements OnInit
{
    projet: Projet;
    visible: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { projet: Projet },
        public matDialogRef: MatDialogRef<ContactPromoteurPopupComponent>,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        if ( this._data.projet.id )
        {
            this.projet = this._data.projet;
        }
    }

    closeDialog() {
        this.visible.next(false);
        this.matDialogRef.close();
    }

}
