import mermaid from 'mermaid';
import { UldePlugin } from '../../registry/plugin-registry';

export const MermaidPlugin: UldePlugin = {
  name: 'mermaid',
  phase: 'interactive',   // render AFTER HTML is in place
  async run(ctx: any) {
    console.log(`Log: Plugin name=${this.name} phase=${this.phase}\n run Before: ctx=`, ctx)
    // 1. Replace ```mermaid code blocks with <div class="mermaid">...</div>

    const html = ctx.html.replace(
      // ctx.html = ctx.html.replace(
      /```mermaid([\s\S]*?)```/g,
      (match: any, code: any) => {
        console.log(`Log: MermaidPlugin match=`, match, `\ncode=`, code)
        return `<div class="mermaid">${code.trim()}</div>`;
      }
    );



    // 2. Mermaid must run only in the browser
    if (typeof window === 'undefined') return;
    console.log(`Log: MermaidPlugin After: ctx.html=`, ctx.html)
    // 3. Initialize Mermaid (safe to call multiple times)
    try {
      mermaid.initialize({ startOnLoad: false });
      await mermaid.run({querySelector: '.language-mermaid'});
      // await mermaid.run();
    } catch (err) {
      console.error('[ULDE Mermaid Plugin] Failed to render diagram:', err);
    }
  }
};
