import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Plyr from 'plyr';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
})
export class VideoPlayerComponent {
  @Input() src: any;
  player: any;

  ngAfterViewInit() {
    this.player = new Plyr('.video_player', {
      youtube: {
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        customControls: true,
        noCookie: false,
      },
      controls: ['play-large', 'play'],
    });

    this.player.source = {
      type: 'video',
      sources: [
        {
          src: this.src,
          provider: 'youtube',
        },
      ],
    };

    this.player.on('ended', () => {
      this.player.stop();
    });
  }
}
