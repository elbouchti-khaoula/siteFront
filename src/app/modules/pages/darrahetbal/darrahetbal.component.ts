import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'darrahetbal',
  templateUrl: './darrahetbal.component.html',
  styleUrls: ['./darrahetbal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class DarrahetbalComponent implements OnInit {

  videoUrl: string = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  constructor() {
  }

  ngOnInit() {
    // const tag = document.createElement('script');
    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
  }

}
