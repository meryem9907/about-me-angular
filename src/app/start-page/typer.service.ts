import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TyperService {
  messagesKeys = [
    '...',
    'message.part1',
    'message.part2',
    'message.part3',
    'message.part4',
    'message.part5',
    'message.part6',
    'message.part7',
  ];
  messages = signal(['']);
  msgCounter = signal(0);
  currentMsg = signal(this.messages()[this.msgCounter()]);
  speed = 30;
  visibleMsg = signal('');
  showContentDropdown = signal(true);
  translateService = inject(TranslateService);
  langChangedSub = signal<Subscription>(new Subscription());
  private timer: number | undefined | null = null;
  private charInd = signal(0);

  constructor() {
    this.loadTranslatedMessages();
    this.langChangedSub.set(
      this.translateService.onLangChange.subscribe(() => {
        this.loadTranslatedMessages();
      }),
    );
  }

  loadTranslatedMessages() {
    forkJoin(this.messagesKeys.map((key) => this.translateService.get(key))).subscribe(
      (translations: string[]) => {
        this.messages.set([...translations]);
        this.currentMsg.set(this.messages()[this.msgCounter()]);
      },
    );
  }

  typeMsg(msg: string) {
    this.clearTimer()
    this.visibleMsg.set('');
    this.charInd.set(0);
    this.timer = window.setInterval(() => {
      if (this.charInd() < msg.length) {
        this.visibleMsg.update((value) => value + msg.charAt(this.charInd()));
        this.charInd.update((i) => i + 1);
      } else {
        this.clearTimer();
        this.charInd.set(0);
      }
    }, this.speed);
  }

  restart() {
    this.msgCounter.set(0);
    this.currentMsg.set(this.messages()[this.msgCounter()]);
    this.clearTimer();
    this.visibleMsg.set('...');
    this.charInd.set(0);
    this.showContentDropdown.set(false);
  }

  clearTimer() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}
