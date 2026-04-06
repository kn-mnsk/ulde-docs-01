import { Component, signal, Inject, inject, AfterViewInit, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Ulde } from '../../core/ulde/ulde';
import { UldeLayoutShell } from '../ulde-layout-shell/ulde-layout-shell';


@Component({
  selector: 'ulde-viewer',
  imports: [UldeLayoutShell],
  templateUrl: './ulde-viewer.html',
  styleUrls: ['./ulde-viewer.scss'],
  standalone: true
})
export class UldeViewer implements OnInit, AfterViewInit, OnDestroy {
  html = signal<string>('');
  private ulde = inject(Ulde);

  protected readonly $title = signal("UdeViewer");

  private $isBrowser = signal<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

    const isBrowser = isPlatformBrowser(this.platformId);
    this.$isBrowser.set(isBrowser);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.$isBrowser()) return;

    this.load('index.md');
  }

  ngOnDestroy(): void {

  }

  async load(path: string) {
    const result = await this.ulde.render(path);
    this.html.set(result.html);
  }
}
