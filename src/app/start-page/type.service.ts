import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TypeService {
  messages = [
    '...',
    'Hey there, traveler! You’ve unlocked my secret page 👾',
    'Pull up a chair — how about we chat over a cozy cup of matcha latte? 🍵💚',
    'Sounds like a quest you’re ready for?',
    'Alright then… *LEVEL 1: Introduction begins!* 🎮',
    'My name is Meryem Ünüvar — part human, part code sorcerer 🧙‍♀️💻',
    'My ultimate power-up? Programming… lots and lots of programming ⚡',
    'So, hero, what do you want to explore next? 🎯 (Interests, Skills, Mindset…)',
  ];
  msgCounter = signal(0);
  currentMessage = signal(this.messages[this.msgCounter()]);
  speed = 30;
  visible = signal('');
  showModal = signal(true);

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
    this.showModal.set(false);
  }

  clearTimer() {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
}
