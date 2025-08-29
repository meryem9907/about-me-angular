import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class Links {
  router = inject(Router);
  goToLinkedIn() {
    window.open(
      'https://www.linkedin.com/in/meryem-%C3%BCn%C3%BCvar-994776193/?originalSubdomain=de',
      '_blank',
    );
  }

  goToGitHub() {
    window.open('https://github.com/meryem9907', '_blank');
  }
}
