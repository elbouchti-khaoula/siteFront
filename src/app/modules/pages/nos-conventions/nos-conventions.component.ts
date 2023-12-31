import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nos-conventions',
  templateUrl: './nos-conventions.component.html',
  styleUrls: ['./nos-conventions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NosConventionsComponent implements OnInit, OnDestroy {
  isXsScreen: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is xsSmall
        this.isXsScreen = !matchingAliases.includes('sm');
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


  isHovered = false;

  onMouseEnter(): void {
    this.isHovered = false;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  hideImage = false;
  toggleImage() {
    this.hideImage = !this.hideImage;
    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }

  }

  hideImage2 = false;
  toggleImage2() {
    this.hideImage2 = !this.hideImage2;

    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }

  }

  hideImage3 = false;
  toggleImage3() {
    this.hideImage3 = !this.hideImage3;



    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }

  }

  hideImage4 = false;
  toggleImage4() {
    this.hideImage4 = !this.hideImage4;

    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }

  }

  hideImage5 = false;
  toggleImage5() {
    this.hideImage5 = !this.hideImage5;

    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }
  }

  hideImage6 = false;
  toggleImage6() {
    this.hideImage6 = !this.hideImage6;

    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

    if (this.hideImage7 = true) {
      this.hideImage7 = !this.hideImage7;
    } else {
      this.hideImage7 = this.hideImage7;
    }

  }

  hideImage7 = false;
  toggleImage7() {
    this.hideImage7 = !this.hideImage7;
    if (this.hideImage3 = true) {
      this.hideImage3 = !this.hideImage3;
    } else {
      this.hideImage3 = this.hideImage3;
    }

    if (this.hideImage = true) {
      this.hideImage = !this.hideImage;
    } else {
      this.hideImage = this.hideImage;
    }

    if (this.hideImage4 = true) {
      this.hideImage4 = !this.hideImage4;
    } else {
      this.hideImage4 = this.hideImage4;
    }

    if (this.hideImage5 = true) {
      this.hideImage5 = !this.hideImage5;
    } else {
      this.hideImage5 = this.hideImage5;
    }

    if (this.hideImage6 = true) {
      this.hideImage6 = !this.hideImage6;
    } else {
      this.hideImage6 = this.hideImage6;
    }

    if (this.hideImage2 = true) {
      this.hideImage2 = !this.hideImage2;
    } else {
      this.hideImage2 = this.hideImage2;
    }

  }

}
