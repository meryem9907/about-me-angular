import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TypeService {
  messages = [
    '...',
    'Hello, my friend! Glad you found me!',
    'How about I tell you about myself while sipping a delicious turkish tea?',
    'Sounds great?',
    "Let's go!!!",
    'First short introduction: My name is Meryem Ünüvar and ...',
    '...my passion is programming.',
    'What would you like to know about me?',
  ];
  msgCounter = signal(0);
  currentMessage = signal(this.messages[this.msgCounter()]);
  speed = 30;
  visible = signal('');
  showModal = signal(true)

  private timer: number | undefined | null = null;
  private charInd = signal(0);

  type(msg: string) {
    console.log(`incoming: ${msg}`);
    this.visible.set('');
    this.charInd.set(0);
    this.timer = window.setInterval(() => {
      if (this.charInd() < msg.length) {
        this.visible.update((value) => (value += msg.charAt(this.charInd())));
        this.charInd.update((i) => i + 1);
      } else {
        this.clearTimer();
        this.charInd.set(0);
      }
    }, this.speed);
  }

  restart() {
    this.msgCounter.set(0);
    this.currentMessage.set(this.messages[this.msgCounter()]);
    this.clearTimer();
    this.visible.set('...');
    this.charInd.set(0);
    this.showModal.set(false)
  }

  clearTimer() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}
