import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { TableauAmortissement } from './tableau-amortissement.types';
import { TableauAmortissementService } from './tableau-amortissement.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'tableau-amortissement',
    templateUrl: './tableau-amortissement.component.html',
    styleUrls: ['./tableau-amortissement.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableauAmortissementComponent implements OnInit, AfterViewInit, OnDestroy {
    
    tableauLength: number = 0;
    @Input() drawer: MatDrawer;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    dataSource: MatTableDataSource<TableauAmortissement> = new MatTableDataSource<TableauAmortissement>([]);
    tableauAmortissement$: Observable<TableauAmortissement[]>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tableauAmortissementService: TableauAmortissementService
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
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {

        this.dataSource.paginator = this._paginator;
        this.dataSource.sort = this._sort;

        if (this._sort) {
            // Set the initial sort
            this._sort.sort({
                id: 'numEcheance',
                start: 'asc',
                disableClear: true
            });

            this._changeDetectorRef.detectChanges();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;
                });

            // Get tableau if sort or page changes
            // merge(this._sort.sortChange, this._paginator.page).pipe(
            //     switchMap(() => {
            //         this.isLoading = true;
            //         return this._tableauAmortissementService.getTableauAmortissement(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
            //     }),
            //     map(() => {
            //         this.isLoading = false;
            //     })
            // ).subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        this.tableauAmortissement$ = of([]);
        this._tableauAmortissementService.clearTableauAmortissement();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    setTableauAmortissementData(tableauAmortissement: TableauAmortissement[]) {
        this.tableauLength = tableauAmortissement.length;
        this.dataSource.data = tableauAmortissement;
        this.tableauAmortissement$ = this.dataSource.connect();
    }

    /**
     * Close the drawer
     */
    closeDrawer(): void {
        this.drawer.close();
    }

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
