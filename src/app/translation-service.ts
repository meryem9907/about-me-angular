import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeTr from '@angular/common/locales/tr';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translate = inject(TranslateService);
  currentLang = signal('en');

  configLanguage() {
    registerLocaleData(localeDe);
    registerLocaleData(localeTr);
    const savedLang = localStorage.getItem('app-lang') as AppLanguage | null;
    this.translate.addLangs(['de', 'en', 'tr']);
    this.translate.setFallbackLang(savedLang ?? 'en');
    this.translate.use(savedLang ?? 'en');
    this.currentLang.set(savedLang ?? 'en');
  }
}
