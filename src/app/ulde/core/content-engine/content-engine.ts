export class ContentEngine {
  async load(path: string): Promise<string> {
    const response = await fetch(`/assets/docs/${path}`);
    return await response.text();
  }

  resolveLinks(html: string): string {
    return html; // placeholder for your existing resolver
  }
}
