export class Plugin {
    manifest: any;

    constructor() {
        // @ts-expect-error
        this.manifest = manifest; 
    }

    startPlugin(): void {};
    pluginWillUnload(): void {};

    start(): void {
        return this.startPlugin?.();
    }

    stop(): void {
        return this.pluginWillUnload?.();
    }
}
