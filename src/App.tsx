import React, { useEffect } from 'react';
import useStore, { StoreState } from '@store/store';
import i18n from './i18n';


import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';
import ApiPopup from '@components/ApiPopup';
import { DATABASE_ENDPOINT } from '@utils/api';

export async function sendingSettingsToDb(){
  const apiKey = useStore.getState().apiKey!
  const settings = JSON.parse(window.localStorage.getItem('free-chat-gpt')!);
  const newCacheId = ++settings.state.cacheId;
  settings.state.cacheId = newCacheId
  useStore.getState().setCacheId(newCacheId)


  // update chat settings inside db
  await fetch(`${DATABASE_ENDPOINT}/better-chat-gpt/${apiKey.slice(0, 5) + apiKey.slice(-5)}`, {
    method: "POST",
    body: JSON.stringify({ settings }),
    headers: {
      "Content-Type": "application/json",
    }
  })
}


export async function syncingWithDb(){
  const apiKey = useStore.getState().apiKey;
  if (apiKey) {
    try {
      // fetch history from server
      const response = await fetch(`${DATABASE_ENDPOINT}/better-chat-gpt/${apiKey.slice(0, 5) + apiKey.slice(-5)}`, {
        method: 'GET',
      })
      const data = await response.json() as {settings?: { state: StoreState }, message?: string};
      if(!data.settings){
        throw new Error(data.message);
      }

      // re-setting the apiKey back to the real one
      data.settings.state.apiKey = apiKey;


      // if the settings are different from the local storage, update the local storage and reload the page
      const currentSettings = JSON.parse(localStorage.getItem('free-chat-gpt')!) as { state: StoreState };

      if(currentSettings.state.cacheId < data.settings.state.cacheId){
        alert('Settings will be synced with the server. Page will reload...');
        localStorage.setItem('free-chat-gpt', JSON.stringify(data.settings));
        window.location.reload()
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function App() {
  const initialiseNewChat = useInitialiseNewChat();
  const setChats = useStore((state) => state.setChats);
  const setTheme = useStore((state) => state.setTheme);
  const setApiKey = useStore((state) => state.setApiKey);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  useEffect(()=>{
    // Registering SW
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service worker registered:', registration);
          })
          .catch((error) => {
            console.error('Error registering service worker:', error);
          });
      });
    }
  },[])

  useEffect(() => {
    async function getChatGPTSettings(){

      syncingWithDb();

      const chats = useStore.getState().chats;
      const currentChatIndex = useStore.getState().currentChatIndex;
        if (!chats || chats.length === 0) {
          initialiseNewChat();
        }
        if (
          chats &&
          !(currentChatIndex >= 0 && currentChatIndex < chats.length)
        ) {
          setCurrentChatIndex(0);
        }

    }
    getChatGPTSettings()

    function focusSync(){
      console.log('sync');
        syncingWithDb();
    }

    window.addEventListener('focus', focusSync)

    return () => {
      window.removeEventListener('focus', focusSync)
    }
  }, []);

  return (
    <div className='overflow-hidden w-full h-full relative'>
      <Menu />
      <Chat />
      <ApiPopup />
    </div>
  );
}

export default App;
