import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
  OnDestroy,
  AfterViewInit {

  private fragment: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _route: ActivatedRoute) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._route.fragment
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(fragment => {
        this.fragment = fragment;
        // console.log("+-+-+- fragment ngOnInit", fragment);
        if (fragment && document.getElementById(fragment) != null) {
          document.getElementById(fragment).scrollIntoView({ behavior: "smooth" });
        }
      });
  }

  /**
   * After view init
   */
  ngAfterViewInit() {
    setTimeout(() => {
      try {
        // console.log("+-+-+- this.fragment ngAfterViewInit", this.fragment);
        document.querySelector('#' + this.fragment).scrollIntoView();
      } catch (e) {
      }
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
