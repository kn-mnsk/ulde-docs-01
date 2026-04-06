export class LayoutEngine {
  renderShell(html: string): string {
    return `
      <article class="docs-article">
        ${html}
      </article>
    `;
  }
}
