import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

// import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
// import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper";
// install Swiper modules
// SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


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
