import { makeAutoObservable } from 'mobx';

export class CommonStore {
  pageLoading = true;

  user = {
    name: 'test',
    email: 'test@google.com',
  };

  constructor() {
    // https://mobx.js.org/observable-state.html#makeautoobservable
    makeAutoObservable(this);
    // makeObservable(this, {
    //   spaceLoading: true,
    //   setSpaceLoading: action,
    // });
  }

  setPageLoading = (loading: boolean) => (this.pageLoading = loading);

  setUser = (user: Partial<typeof this.user>) => Object.assign(this.user, user);
}

const commonStore = new CommonStore();

export default commonStore;
