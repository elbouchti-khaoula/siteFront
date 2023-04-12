import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { TableauAmortissementPagination, TableauAmortissement } from './tableau-amortissement.types';
import { TableauAmortissementService } from './tableau-amortissement.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector       : 'tableau-amortissement',
    templateUrl    : './tableau-amortissement.component.html',
    styleUrls      : ['./tableau-amortissement.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    animations     : fuseAnimations
})
export class TableauAmortissementComponent implements OnInit, OnDestroy
{
    // @ViewChild(MatSort) private _sort: MatSort;
    // @ViewChild(MatPaginator) private _paginator: MatPaginator;
    // pagination: TableauAmortissementPagination;
    @Input() dossierId : number;
    @Input() drawer: MatDrawer;
    isLoading: boolean = false;

    tableauAmortissement$: Observable<TableauAmortissement[]>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        // private _changeDetectorRef: ChangeDetectorRef,
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
        // // Get the pagination
        // this._tableauAmortissementService.pagination$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((pagination: TableauAmortissementPagination) => {

        //         // Update the pagination
        //         this.pagination = pagination;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get tableau amortissement
        this.tableauAmortissement$ = this._tableauAmortissementService.tableauAmortissement$;
    }

    /**
     * After view init
     */
    // ngAfterViewInit(): void
    // {
    //     if ( this._sort && this._paginator) 
    //     {
    //         // Set the initial sort
    //         this._sort.sort({
    //             id          : 'numEcheance',
    //             start       : 'asc',
    //             disableClear: true
    //         });

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();

    //         // If the user changes the sort order...
    //         this._sort.sortChange
    //             .pipe(takeUntil(this._unsubscribeAll))
    //             .subscribe(() => {
    //                 // Reset back to the first page
    //                 this._paginator.pageIndex = 0;
    //             });

    //         // Get tableau if sort or page changes
    //         merge(this._sort.sortChange, this._paginator.page).pipe(
    //             switchMap(() => {
    //                 this.isLoading = true;
    //                 return this._tableauAmortissementService.getTableauAmortissement(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
    //             }),
    //             map(() => {
    //                 this.isLoading = false;
    //             })
    //         ).subscribe();
    //     }
    // }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    closeDrawer(): void {
        this.drawer.close();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
