import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'projets-search',
  templateUrl: './projets-search.component.html',
  styleUrls: ['./projets-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProjetsSearchComponent implements
  OnInit,
  OnDestroy
{

  private fragment: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _activatedRoute: ActivatedRoute) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._activatedRoute.fragment
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(fragment => {
        this.fragment = fragment;
        if (fragment && document.getElementById(fragment)) {
          setTimeout(() => {
            try {
              document.getElementById(this.fragment).scrollIntoView({ behavior: "smooth" });
            } catch (e) { }
          }, 1500);
        } 
        // else {
        //   setTimeout(() => {
        //     const nativeElement = this._elementRef.nativeElement;
        //     const firstChild = nativeElement.children[0];
        //     firstChild.scrollTop = 0
        //   }, 300);
        // }
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

}
