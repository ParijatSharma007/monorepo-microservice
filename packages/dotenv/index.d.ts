// index.d.ts

declare module '@repo/envconfigure' {
    import { Plugin } from 'vite';
  
    /**
     * Environment plugin for Vite that injects custom or default environment variables
     * into the build process.
     *
     * @param env Optional environment variables to inject.
     * @returns Vite Plugin object with a custom define config.
     */
    export function viteEnvPlugin(env?: Record<string, string | undefined>): Plugin;
  }
  