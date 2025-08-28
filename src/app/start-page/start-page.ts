import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { TypeService } from './type.service';

@Component({
  selector: 'app-start-page',
  imports: [NgOptimizedImage],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage implements OnDestroy {
  showContentBar = output<boolean>();
  typeService = inject(TypeService);

  constructor() {
    effect(() => {
      const msg = this.typeService.currentMessage();
      this.typeService.type(msg);
    });
  }

  onRestart() {
    this.typeService.restart();
    this.showContentBar.emit(false);
  }

  onClick() {
    if (this.typeService.msgCounter() + 1 == this.typeService.messages.length) {
      this.typeService.currentMessage.set(this.typeService.messages[this.typeService.msgCounter()]);
      return;
    }
    this.typeService.clearTimer();
    this.typeService.msgCounter.set(this.typeService.msgCounter() + 1);
    this.typeService.currentMessage.set(this.typeService.messages[this.typeService.msgCounter()]);
    if (this.typeService.msgCounter() + 1 == this.typeService.messages.length) {
      this.showContentBar.emit(true);
    }
  }

  ngOnDestroy() {
    this.typeService.clearTimer();
    this.onRestart()
  }
}
