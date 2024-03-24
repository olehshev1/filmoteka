import { watchedBtnCB, queueBtnCB } from "../my-library/callbacksForMyLibrery"

export default function currentLibrary() {
    if (localStorage.getItem('current-my-lyb') === "q") {
        queueBtnCB()
    } else {
        watchedBtnCB()
    }
}