import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPage } from './start-page/start-page';
import { ContentBar } from './content-bar/content-bar';
import { CommonModule } from '@angular/common';
import { ContentModals } from './content-modals/content-modals';
import { Links } from './links/links';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPage, ContentBar, Links, CommonModule, ContentModals],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('about-me-page');
  showContentBar = signal(false);
  contentType = signal<string>('');
  onContentChange(showContentBar: boolean) {
    this.showContentBar.set(showContentBar);
  }

  receiveContent(contentType: string) {
    this.contentType.set(contentType);
    console.log(`Received ${this.contentType()}`);
  }
}
