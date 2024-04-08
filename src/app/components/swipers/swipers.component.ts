import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { VideoPlayerComponent } from '../video-player/video-player.component';

register();

@Component({
  selector: 'app-swipers',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './swipers.component.html',
  styleUrl: './swipers.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwipersComponent {
  swiperElement = signal<SwiperContainer | null>(null);
  @ViewChild(VideoPlayerComponent, { static: false })
  videoPlayer: VideoPlayerComponent | undefined;
  @ViewChildren(VideoPlayerComponent)
  videoPlayers!: QueryList<VideoPlayerComponent>;

  resourceList = [
    { type: 'TEXTO', data: 'Hola' },
    {
      type: 'VIDEO',
      data: 'https://www.youtube.com/watch?v=KEUUKA3fuaQ&ab_channel=Sharedgap',
    },
    { type: 'TEXTO', data: 'Si' },
    {
      type: 'VIDEO',
      data: 'https://www.youtube.com/watch?v=P_Oh7HizY5I&ab_channel=bstore',
    },
    { type: 'TEXTO', data: 'No' },
    {
      type: 'VIDEO',
      data: 'https://www.youtube.com/watch?v=bNJW113tbKk&ab_channel=UniversalPictures',
    },
    { type: 'TEXTO', data: 'Chau' },
  ];

  ngAfterViewInit() {
    this.initSwiper();
    console.log('ngAfterViewInit', this.swiperElement());
  }

  initSwiper() {
    const swiperElementConstructor = document.querySelector('swiper-container');
    const swiperParams = {
      slidesPerView: 1,
    };
    if (swiperElementConstructor) {
      Object.assign(swiperElementConstructor, swiperParams);
    }
    this.swiperElement.set(swiperElementConstructor);
    this.swiperElement()?.initialize();
  }

  onSlideChange(swiper: any) {
    const indexSwiper = swiper.detail[0].activeIndex;
    const activeSlide = this.resourceList[indexSwiper];

    if (activeSlide.type === 'VIDEO') {
      const videoPlayer = this.videoPlayers.find(
        (element) => element.src === activeSlide.data
      );
      if (videoPlayer) {
        videoPlayer.player.play();
      }
    }
  }
}
