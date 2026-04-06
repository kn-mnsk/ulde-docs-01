import { Component, signal, inject } from '@angular/core';
import { Ulde } from '../../core/ulde/ulde';

@Component({
  selector: 'ulde-viewer',
  templateUrl: './ulde-viewer.html',
  styleUrls: ['./ulde-viewer.scss'],
  standalone: true
})
export class UldeViewer {
  html = signal<string>('');
  private ulde = inject(Ulde);

  constructor() {
    this.load('index.md');
  }

  async load(path: string) {
    const result = await this.ulde.render(path);
    this.html.set(result.html);
  }
}
