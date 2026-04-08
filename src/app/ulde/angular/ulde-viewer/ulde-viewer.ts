import { Component, signal, effect, Inject, inject, AfterViewInit, OnInit, OnDestroy, PLATFORM_ID, EffectRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Ulde } from '../../core/ulde/ulde';
import mermaid from 'mermaid';
import { UldeLayoutShell } from '../ulde-layout-shell/ulde-layout-shell';


@Component({
  selector: 'ulde-viewer',
  imports: [UldeLayoutShell],
  templateUrl: './ulde-viewer.html',
  styleUrls: ['./ulde-viewer.scss'],
  standalone: true
})
export class UldeViewer implements OnInit, AfterViewInit, OnDestroy {
  // html = signal<string>('');
  html = signal<SafeHtml | string>('');
  private ulde = inject(Ulde);
  private sanitizer = inject(DomSanitizer);

  protected readonly $title = signal("UdeViewer");

  private $isBrowser = signal<boolean>(false);

  private stopEffect?: EffectRef;
  // private stopEffect?:  () => void);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

    const isBrowser = isPlatformBrowser(this.platformId);
    this.$isBrowser.set(isBrowser);

    // react to html() changes and run Mermaid after DOM updates
    this.stopEffect = effect(() => {
      if (!this.$isBrowser()) return;
      const current = this.html();
      if (!current) return;

      queueMicrotask(async () => {
        try {
          mermaid.initialize({ startOnLoad: false });
          await mermaid.run({ querySelector: '.mermaid' });
        } catch (err) {
          console.error('[UldeViewer] Mermaid render error:', err);
        }
      });
    });

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.$isBrowser()) return;

    this.load('index.md');
  }

  ngOnDestroy(): void {
    this.stopEffect?.destroy();

  }

  async load(path: string) {
    // const ctx = await this.ulde.render(path);
    // const safe = this.sanitizer.bypassSecurityTrustHtml(ctx.html);
    // this.html.set(safe);

    const result = await this.ulde.render(path);
    this.html.set(result.html);
  }
}
