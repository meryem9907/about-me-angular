import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy } from '@angular/core';
import { TypeService } from '../start-page/type.service';

@Component({
  selector: 'app-content-modals',
  imports: [CommonModule],
  templateUrl: './content-modals.html',
  styleUrl: './content-modals.css',
})
export class ContentModals {
  typeService = inject(TypeService);
  contentType = input<string>();

  toggleModal() {
    this.typeService.showModal.update((show) => !show);
  }
}
