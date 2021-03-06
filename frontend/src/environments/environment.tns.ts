import { environment as devEnvironment } from './environment.dev';
import { environment as prodEnvironment } from './environment.prod';

export const environment = (() => {
    let envVars;

    if (
        typeof process !== 'undefined' && process &&
        Object.prototype.hasOwnProperty.call(process, 'env') && process.env &&
        Object.prototype.hasOwnProperty.call(process.env, 'environment') && process.env.environment
    ) {
        switch (process.env.environment) {
            case 'prod':
                envVars = prodEnvironment;
                break;
            default:
                envVars = devEnvironment;
        }
    } else {
        envVars = devEnvironment;
    }

    return envVars;
})();
