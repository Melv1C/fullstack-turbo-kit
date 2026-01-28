// Channel definitions (shared between main and preload)
export { bridgeChannels, type BridgeChannel } from './bridge-channels';

// Main process exports
export { bridgeConfig, type BridgeChannels } from './bridge-config';
export { registerBridgeHandlers, unregisterBridgeHandlers } from './register-handlers';
