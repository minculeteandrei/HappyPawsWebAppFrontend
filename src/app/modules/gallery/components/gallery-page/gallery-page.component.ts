import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { IMAGES_PATH_GALLERY } from 'src/app/constants/constants';

@Component({
  selector: 'app-gallery-page',
  host: {
    class: "flex flex-col grow"
  },
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.images = [
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image1.jpg`, thumb: `${IMAGES_PATH_GALLERY}/image1.jpg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image2.jpg`, thumb: `${IMAGES_PATH_GALLERY}/image2.jpg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image3.jpg`, thumb: `${IMAGES_PATH_GALLERY}/image3.jpg`}),
    ]
  }

}
