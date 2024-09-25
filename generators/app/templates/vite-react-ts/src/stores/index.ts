import { createContext, useContext } from 'react';
import common from './common';

const rootStore = { common };
const rootStoreRef = { current: rootStore };

// debugging, runing in console, such as:
// window.__ROOT_STORE__.common.setPageLoading(true)
// @ts-expect-error ignore type error
window.__ROOT_STORE__ = rootStore;

export const getRootStore = () => rootStoreRef.current;

export const storeContext = createContext(rootStore);

export const StoreProvider = storeContext.Provider;

export function useStore() {
  const store = useContext(storeContext);
  return store;
}

export default rootStore;
