import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ulde-layout-shell',
  imports: [],
  templateUrl: './ulde-layout-shell.html',
  styleUrl: './ulde-layout-shell.scss',
})
export class UldeLayoutShell {
  html = input<string>('');
}
