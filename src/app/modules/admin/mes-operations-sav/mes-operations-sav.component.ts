import { EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DemandeSAV } from 'app/core/demandes-sav/demandes-sav.types';
import { OperationSAVRef } from 'app/core/referentiel/referentiel.types';
import moment from 'moment';

@Component({
  selector: 'mes-operations-sav',
  templateUrl: './mes-operations-sav.component.html',
  styleUrls: ['./mes-operations-sav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class MesOperationsSavComponent implements OnInit, OnDestroy
{
  @Input() debounce: number = 300;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  dossiersCredit: any[] = [];
  operationsSAV: DemandeSAV[];
  listOperationsSavs: DemandeSAV[] = [
    { demandeSavId: 1, codeOperation: 'FRA', dossierId: 1, statut: 'traité', dateCreation: new Date(), motifRemboursement: '' },
    { demandeSavId: 2, codeOperation: 'DON', dossierId: 1, statut: 'en cours', dateCreation: new Date(), motifRemboursement: '' },
    { demandeSavId: 3, codeOperation: 'RAT', dossierId: 1, statut: 'en cours', dateCreation: new Date(), motifRemboursement: '' },
    { demandeSavId: 4, codeOperation: 'FRA', dossierId: 2, statut: 'traité', dateCreation: new Date(), motifRemboursement: '' },
    { demandeSavId: 5, codeOperation: 'DON', dossierId: 2, statut: 'traité', dateCreation: new Date(), motifRemboursement: '' },
    { demandeSavId: 6, codeOperation: 'FRA', dossierId: 3, statut: 'traité', dateCreation: new Date(), motifRemboursement: '' },
    // { demandeSavId: 7, codeOperation: 'RAT', dossierId: 3, statut: 'en cours', dateCreation: new Date(), motifRemboursement: '' }
  ];
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  )
  {
    let operationsSAVRef: OperationSAVRef[] = JSON.parse(localStorage.getItem('operationSAVref'));
    this.operationsSAV = this.listOperationsSavs;

    this.listOperationsSavs.forEach((item, index) => {

      if (item.dossierId) {
        let dossier = this.dossiersCredit?.find(e => e.id === item.dossierId)
        if (!dossier) {
          this.dossiersCredit.push(
            {
              id: item.dossierId,
              montant: 10000000,
              crd: 200000,
              mensuaite: 2000,
              dureeRestante: 170,
              duree: 240,
              operations: [{...item, nomOperation: operationsSAVRef?.find(e => e.codeOperation == item.codeOperation)?.nomOperation, dateCreationStr: moment(item.dateCreation).format('DD/MM/yyyy hh:mm')}]
            }
          );
        } else {
          dossier.operations.push({...item, nomOperation: operationsSAVRef?.find(e => e.codeOperation == item.codeOperation)?.nomOperation, dateCreationStr: moment(item.dateCreation).format('DD/MM/yyyy hh:mm')})
        }
      }
    });

    // console.log("+-+-+- this.dossiersCredit", this.dossiersCredit);

    // this.getDossiers('')
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((operation: OperationSav[]) => {
    //     this.operationsSAV = operation;
    //     this._changeDetectorRef.markForCheck();
    //   });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {

    //   this.searchInputControl.valueChanges
    //     .pipe(
    //       debounceTime(this.debounce),
    //       takeUntil(this._unsubscribeAll),
    //       map((value) => {
    //         if (!value) {
    //           return '';
    //         }
    //         return value;
    //       }),
    //       filter(value => value && value.length >= 1)
    //     ).subscribe((value) => {

    //       this.getDossiers(value).subscribe((operationsSavs) => {
    //         this.operationsSAV = operationsSavs;
    //         this.operationsSAV = [...operationsSavs];
    //         this._changeDetectorRef.markForCheck();
    //         this.search.next(this.operationsSAV);
    //       });
    //     });

  }

  ngOnDestroy(): void {
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

  // getDossiers(
  //   search: string = ''
  // ): Observable<OperationSav[]> {
  //   return of(this.listOperationsSavs).pipe(
  //     map((response) => {
  //       let dossiers = response;
  //       if (search) {
  //         dossiers = dossiers.filter(
  //           (element) =>
  //             element.codeOperation && element.codeOperation.toLowerCase().includes(search.toLowerCase())
  //         );
  //       }
  //       return dossiers;
  //     })
  //   );
  // }

}
