import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPage } from './start-page/start-page';
import { ContentBar } from './content-bar/content-bar';
import { CommonModule } from '@angular/common';
import { ContentModals } from './content-modals/content-modals';
import { Links } from './links/links';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { TranslationService } from './translation-service';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPage, ContentBar, Links, CommonModule, ContentModals, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  showContentBar = signal(false);
  contentType = signal<string>('');
  private ts = inject(TranslationService);

  ngOnInit(): void {
    this.ts.configLanguage();
   
  }

  onContentChange(showContentBar: boolean) {
    this.showContentBar.set(showContentBar);
  }

  receiveContent(contentType: string) {
    this.contentType.set(contentType);
  }
}
