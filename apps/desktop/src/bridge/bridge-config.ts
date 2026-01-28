/**
 * Bridge Configuration - Implementations for Main Process
 *
 * Implement all IPC bridge functions here. Channel names are defined in bridge-channels.ts.
 * TypeScript will error if you forget to implement a channel.
 *
 * To add a new bridge function:
 * 1. Add the channel name to `bridge-channels.ts`
 * 2. Add the implementation here (TypeScript will remind you!)
 */

import { app, dialog, shell } from 'electron';
import type { BridgeChannel } from './bridge-channels';

// Ensures all channels are implemented - TypeScript will error if any are missing

export const bridgeConfig = {
  /**
   * Simple ping/pong for testing connectivity
   */
  ping: async () => {
    return 'pong' as const;
  },

  /**
   * Get app version from package.json
   */
  getAppVersion: async () => {
    return app.getVersion();
  },

  /**
   * Get app name
   */
  getAppName: async () => {
    return app.getName();
  },

  /**
   * Open external URL in default browser
   */
  openExternal: async (url: string) => {
    await shell.openExternal(url);
    return true;
  },

  /**
   * Show native message box
   */
  showMessageBox: async (options: {
    type?: 'none' | 'info' | 'error' | 'question' | 'warning';
    title?: string;
    message: string;
    buttons?: string[];
  }) => {
    const result = await dialog.showMessageBox({
      type: options.type ?? 'info',
      title: options.title ?? 'Message',
      message: options.message,
      buttons: options.buttons ?? ['OK'],
    });
    return {
      response: result.response,
      checkboxChecked: result.checkboxChecked,
    };
  },

  /**
   * Get platform info
   */
  getPlatform: async () => {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.versions.node,
      electronVersion: process.versions.electron,
    };
  },
} satisfies Record<BridgeChannel, (...args: any[]) => Promise<any>>;

export type BridgeChannels = keyof typeof bridgeConfig;
