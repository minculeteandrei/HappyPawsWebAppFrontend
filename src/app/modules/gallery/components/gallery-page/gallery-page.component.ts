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
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image4.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image4.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image5.jpg`, thumb: `${IMAGES_PATH_GALLERY}/image5.jpg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image6.jpg`, thumb: `${IMAGES_PATH_GALLERY}/image6.jpg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image7.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image7.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image8.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image8.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image9.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image9.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image10.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image10.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image11.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image11.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image12.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image12.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image13.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image13.jpeg`}),
      new ImageItem({src: `${IMAGES_PATH_GALLERY}/image14.jpeg`, thumb: `${IMAGES_PATH_GALLERY}/image14.jpeg`}),
    ]
  }

}
