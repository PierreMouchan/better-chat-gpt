import { StoreSlice } from './store';
import { Theme } from '@type/theme';
import { ConfigInterface } from '@type/chat';
import { _defaultChatConfig, _defaultSystemMessage } from '@constants/chat';

export interface ConfigSlice {
  openConfig: boolean;
  theme: Theme;
  autoTitle: boolean;
  hideMenuOptions: boolean;
  defaultChatConfig: ConfigInterface;
  defaultSystemMessage: string;
  hideSideMenu: boolean;
  enterToSubmit: boolean;
  setOpenConfig: (openConfig: boolean) => void;
  setTheme: (theme: Theme) => void;
  setAutoTitle: (autoTitle: boolean) => void;
  setDefaultChatConfig: (defaultChatConfig: ConfigInterface) => void;
  setDefaultSystemMessage: (defaultSystemMessage: string) => void;
  setHideMenuOptions: (hideMenuOptions: boolean) => void;
  setHideSideMenu: (hideSideMenu: boolean) => void;
  setEnterToSubmit: (enterToSubmit: boolean) => void;
  setCacheId: (cacheId: number) => void;
  cacheId: number;
}

export const createConfigSlice: StoreSlice<ConfigSlice> = (set, get) => ({
  openConfig: false,
  theme: 'dark',
  hideMenuOptions: false,
  hideSideMenu: false,
  autoTitle: false,
  enterToSubmit: true,
  defaultChatConfig: _defaultChatConfig,
  defaultSystemMessage: _defaultSystemMessage,
  cacheId: 0,
  setOpenConfig: (openConfig: boolean) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      openConfig: openConfig,
    }));
  },
  setTheme: (theme: Theme) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      theme: theme,
    }));
  },
  setAutoTitle: (autoTitle: boolean) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      autoTitle: autoTitle,
    }));
  },
  setDefaultChatConfig: (defaultChatConfig: ConfigInterface) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      defaultChatConfig: defaultChatConfig,
    }));
  },
  setDefaultSystemMessage: (defaultSystemMessage: string) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      defaultSystemMessage: defaultSystemMessage,
    }));
  },
  setHideMenuOptions: (hideMenuOptions: boolean) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      hideMenuOptions: hideMenuOptions,
    }));
  },
  setHideSideMenu: (hideSideMenu: boolean) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      hideSideMenu: hideSideMenu,
    }));
  },
  setEnterToSubmit: (enterToSubmit: boolean) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      enterToSubmit: enterToSubmit,
    }));
  },
  setCacheId: (cacheId: number) => {
    set((prev: ConfigSlice) => ({
      ...prev,
      cacheId: cacheId,
    }));
  }
});
