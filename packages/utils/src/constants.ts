import pkg from '../../../package.json' with { type: 'json' };

export const APP_NAME = pkg.name;
export const APP_VERSION = pkg.version;
export const API_URL = 'http://localhost:3000';
