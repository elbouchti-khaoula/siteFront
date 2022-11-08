import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'projets-filter',
  templateUrl: './projets-filter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProjetsFilterComponent implements OnInit {
  searchForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(private _formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    // Create the form
    this.searchForm = this._formBuilder.group({
      ville: [''],
      quartier: [''],
      typeBien: [''],
      prixMin: [''],
      prixMax: ['']
    });

  }
}
