import { Component, inject, output } from '@angular/core';
import { TyperService } from '../start-page/typer.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-content-bar',
  imports: [TranslatePipe],
  templateUrl: './content-bar.html',
  styleUrl: './content-bar.css',
})
export class ContentBar {
  contentType = output<string>();
  typerService = inject(TyperService);

  onCareer() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('career');
  }
  onProjects() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('projects');
  }

  onHobbies() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('hobbies');
  }
  onSkills() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('skills');
  }
  onPersonalAims() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('aims');
  }
  onMindset() {
    this.typerService.showContentDropdown.set(true);
    this.contentType.emit('mindset');
  }
}
