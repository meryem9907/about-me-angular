import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../translation-service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  theme = signal<Theme>('light');
  translate = inject(TranslateService);
  ts = inject(TranslationService)
  isOpen = signal(false);
  readonly supportedLanguages: AppLanguage[] = ['tr', 'en', 'de'];
  currentLang: AppLanguage = 'en';

  currentLangLabel(): string {
    switch (this.currentLang) {
      case 'tr':
        return 'TR';
      case 'de':
        return 'DE';
      default:
        return 'EN';
    }
  }

  constructor() {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      this.theme.set(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }
    effect(() => {
      const current = this.theme();
      document.documentElement.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
    });
    const savedLang = localStorage.getItem('app-lang') as AppLanguage | null;
    const browserLang = this.translate.getBrowserLang() as AppLanguage | undefined;
    const initialLang =
      savedLang && this.supportedLanguages.includes(savedLang)
        ? savedLang
        : browserLang && this.supportedLanguages.includes(browserLang)
          ? browserLang
          : 'en';

    this.setLanguage(initialLang, false);
  }

  setLanguage(lang: AppLanguage, closeDropdown = true): void {
    if (!this.supportedLanguages.includes(lang)) return;

    this.translate.use(lang).subscribe({
      next: () => {
        this.currentLang = lang;
            this.ts.currentLang.set(lang)

        localStorage.setItem('app-lang', lang);
        document.documentElement.lang = lang;

        if (closeDropdown) {
          this.isOpen.set(false);
        }
      },
      error: (err) => {
        console.error('Language switch failed:', err);
      },
    });
  }

  toggleLightDark() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
    console.log(this.theme());
  }

  toggleLanguage() {
    this.isOpen.update((isOpen) => !this.isOpen());
  }
}
