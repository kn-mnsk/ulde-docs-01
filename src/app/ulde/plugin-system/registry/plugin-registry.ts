export interface UldePlugin {
  name: string;
  phase: string;
  run(ctx: any): void | Promise<void>;
}

export class PluginRegistry {
  private plugins: UldePlugin[] = [];

  register(plugin: UldePlugin) {
    this.plugins.push(plugin);
  }

  async runPhase(phase: string, ctx: any) {
    const phasePlugins = this.plugins.filter(p => p.phase === phase);
    for (const plugin of phasePlugins) {
      await plugin.run(ctx);
    }
  }
}
