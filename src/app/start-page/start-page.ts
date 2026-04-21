import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnDestroy, output, signal } from '@angular/core';
import { TyperService } from './typer.service';
import { Header } from '../header/header';
import { TranslatePipe } from '@ngx-translate/core';
import { Timeline } from '../timeline/timeline';

@Component({
  selector: 'app-start-page',
  imports: [NgOptimizedImage, CommonModule, TranslatePipe, Timeline],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage implements OnDestroy {
  showContentBar = output<boolean>();
  typerService = inject(TyperService);
  wiggle = signal(true);
  showRestart = signal(false);

  constructor() {
    effect(() => {
      const msg = this.typerService.currentMsg();
      console.log("ignite")
      const messages = this.typerService.messages();
      this.typerService.typeMsg(msg);
    });
  }

  speak() {
    this.showRestart.set(true);
    this.wiggle.set(false);
    // check if last msg
    if (this.typerService.msgCounter() + 1 == this.typerService.messages().length) {
      this.typerService.currentMsg.set(
        this.typerService.messages()[this.typerService.msgCounter()],
      );   
      // check if last msg is typed to end
      console.log(this.typerService.currentMsg())    
      this.showContentBar.emit(true);
      return;
    }
    this.typerService.msgCounter.set(this.typerService.msgCounter() + 1);
    this.typerService.currentMsg.set(this.typerService.messages()[this.typerService.msgCounter()]);
  }


  onRestart() {
    this.typerService.restart();
    this.showContentBar.emit(false);
    this.wiggle.set(true);
    this.showRestart.set(false);
  }

  ngOnDestroy() {
    this.wiggle.set(true);
    this.typerService.clearTimer();
    this.typerService.langChangedSub.update((sub) => {
      sub.unsubscribe();
      return sub;
    });
    this.onRestart();
    this.showRestart.set(false);
  }
}
