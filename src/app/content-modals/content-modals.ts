import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy } from '@angular/core';
import { TyperService } from '../start-page/typer.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Timeline } from '../timeline/timeline';

@Component({
  selector: 'app-content-modals',
  imports: [CommonModule, TranslatePipe, Timeline],
  templateUrl: './content-modals.html',
  styleUrl: './content-modals.css',
})
export class ContentModals {
  typerService = inject(TyperService);
  contentType = input<string>();

  toggleModal() {
    this.typerService.showContentDropdown.update((show) => !show);
  }
}
