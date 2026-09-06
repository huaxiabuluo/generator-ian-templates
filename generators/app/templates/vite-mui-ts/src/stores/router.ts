import { action, makeObservable, observableRef } from "mobx"
import type { Location } from "react-router-dom"
import type { RootStore } from "."

export class RouterStore {
  rootStore?: RootStore
  location?: Location

  constructor(rootStore?: RootStore) {
    makeObservable(this, {
      location: observableRef,
      rootStore: observableRef,
      updateLocation: action,
    })
    this.rootStore = rootStore
  }

  updateLocation = (location: Location) => (this.location = location)
}
