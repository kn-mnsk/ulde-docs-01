import MarkdownIt from 'markdown-it';

export class ContentEngine {
  private md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  async load(path: string): Promise<string> {
    const response = await fetch(`/assets/docs/${path}`);
    return await response.text();
  }

  renderMarkdown(raw: string): string {
    // const html = this.md.render(raw);
    // console.log(`Log: ContentEngine renderMarkdown html=`, html);
    // return html;
    return this.md.render(raw);
  }

  resolveLinks(html: string): string {
    return html; // keep for later
  }
}
