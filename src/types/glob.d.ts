declare module "glob" {
  interface GlobOptions {
    cwd?: string;
  }

  export function glob(pattern: string, options?: GlobOptions): Promise<string[]>;
}
