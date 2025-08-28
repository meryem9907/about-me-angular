import { Component, inject, output } from '@angular/core';
import { TypeService } from '../start-page/type.service';

@Component({
  selector: 'app-content-bar',
  imports: [],
  templateUrl: './content-bar.html',
  styleUrl: './content-bar.css',
})
export class ContentBar {
  contentType = output<string>()
  typeService = inject(TypeService)

  onInterests() {
    this.typeService.showModal.set(true)
    this.contentType.emit("interests");
  }
  onSkills() {
    this.typeService.showModal.set(true)
    this.contentType.emit("skills");
  }
  onPersonalAims() {
    this.typeService.showModal.set(true)
    this.contentType.emit("aims");
  }
  onMindset() {
    this.typeService.showModal.set(true)
    this.contentType.emit("mindset");
  }
}
