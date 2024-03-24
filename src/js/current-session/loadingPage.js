import switchToLibrary from "../header/header"
import currentSession from "./currentSession";

export default function loadingPage() {
    if (sessionStorage.getItem('my-lib')) {
        switchToLibrary()
    } else (
        currentSession()
    )
}