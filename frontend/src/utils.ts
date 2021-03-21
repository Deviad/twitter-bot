declare var process: any;

export function getEnvironmentVars(key: string): string {
    if (typeof process !== 'undefined' && process && process.env) {
        return process.env[key];
    } else {
        return '';
    }
}
