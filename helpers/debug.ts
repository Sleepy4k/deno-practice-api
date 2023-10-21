import "https://deno.land/x/dotenv@v3.2.2/load.ts";

/**
 * @desc Debugging helper
 * 
 * @param type string
 * @param args unknown[]
 * 
 * @return void
 */
export function debug(type: string, ...args: unknown[]): void {
  if (Deno.env.get("APP_DEBUG") === 'true') {
    switch (type) {
      case 'log':
        console.log(...args);
        break;
      case 'error':
        console.error(...args);
        break;
      case 'warn':
        console.warn(...args);
        break;
      default:
        console.log(...args);
        break;
    }
  }
}
