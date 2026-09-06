import { action, makeObservable, observableRef } from "mobx"
import { type RootStore } from "."

export class CommonStore {
  rootStore?: RootStore
  loading = false

  constructor(rootStore?: RootStore) {
    makeObservable(this, {
      rootStore: observableRef,
      setLoading: action,
    })
    this.rootStore = rootStore
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }
}
