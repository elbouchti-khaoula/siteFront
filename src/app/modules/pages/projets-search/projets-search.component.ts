import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'projets-search',
  templateUrl: './projets-search.component.html',
  styleUrls: ['./projets-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProjetsSearchComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
