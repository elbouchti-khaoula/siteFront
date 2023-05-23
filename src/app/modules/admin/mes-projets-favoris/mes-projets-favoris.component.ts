import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';
import { ProjetFavori } from 'app/core/projets/projets.types';
import { ProjetsService } from 'app/core/projets/projets.service';

@Component({
  selector: 'mes-projets-favoris',
  templateUrl: './mes-projets-favoris.component.html',
  styleUrls: ['./mes-projets-favoris.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MesProjetsFavorisComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  projetsFavoris: ProjetFavori[] = [];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _projetsService: ProjetsService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._projetsService.projetsFavoris$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: ProjetFavori[]) => {

                this.projetsFavoris = response;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
