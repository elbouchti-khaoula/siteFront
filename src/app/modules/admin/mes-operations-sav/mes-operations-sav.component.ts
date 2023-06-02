import { EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, map, of, switchMap, takeUntil, tap, debounceTime, filter } from 'rxjs';
import { OperationSav } from './mes-operations-sav.types';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mes-operations-sav',
  templateUrl: './mes-operations-sav.component.html',
  styleUrls: ['./mes-operations-sav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class MesOperationsSavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) private _sort: MatSort;
  @Input() debounce: number = 300;
  isLoading: boolean = false;
  
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  operationsSavs: OperationSav[] ;
  listOperationsSavs: OperationSav[]= [
    { id: 1, nom: 'operation1', statut: 'stat1', date: null },
    { id: 2, nom: 'operation5', statut: 'stat3', date: null },
    { id: 3, nom: 'operation3', statut: 'stat2', date: null },
    { id: 4, nom: 'operation5', statut: 'stat3', date: null },
    { id: 5, nom: 'operation5', statut: 'stat3', date: null }
  ];
  operationsSavs$: Observable<OperationSav[]>;
  selectedDossier: any;
  searchInputControl: FormControl = new FormControl();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { 
    this.getDossiers('')
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((operation: OperationSav[]) => {
      this.operationsSavs = operation;
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnInit(): void {
    
    this.searchInputControl.valueChanges
        .pipe(
            debounceTime(this.debounce),
            takeUntil(this._unsubscribeAll),
            map((value) => {
              //this.isLoading=true;
                if (!value) {
                    return '';
                }
                return value;
            }),
            filter(value => value && value.length >= 1)
        ).subscribe((value) => {
      
            this.getDossiers(value).subscribe((operationsSavs) => {
                this.operationsSavs = operationsSavs;
                this.operationsSavs = [...operationsSavs];
                this._changeDetectorRef.markForCheck();
                this.search.next(this.operationsSavs);
              //  this.isLoading = false;
            });
        })
;
}


  

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getDossiers(
    search: string = ''
  ): Observable<OperationSav[]> {
    return of(this.listOperationsSavs).pipe(
      map((response) => {
        let dossiers = response;
        if (search) {
          dossiers = dossiers.filter(
            (element) =>
              element.nom && element.nom.toLowerCase().includes(search.toLowerCase())
          );
        }
        return dossiers;
      })
    );
  }
}
