import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../translation-service';

@Component({
  selector: 'app-timeline',
  imports: [TranslatePipe, DatePipe],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {
  ts = inject(TranslationService);
  dates = {
    startStudy: new Date('2022-10-01'),
    endStudy: new Date('2026-03-14'),
    workingStudentStart: new Date('2025-11-01'),
    workingStudentEnd: new Date('2026-03-14'),
     internStart: new Date('2025-02-20'),
    internEnd: new Date('2024-10-01'),
  };
}
