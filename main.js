import "./style.css";
import { Elm } from "./src/Main.elm";

if (process.env.NODE_ENV === "development") {
    const ElmDebugTransform = await import("elm-debug-transformer")

    ElmDebugTransform.register({
        simple_mode: true
    })
}




const root = document.querySelector("#app div");
const app = Elm.Main.init({
    flags: {
        url: location.href,
        storedData: null,
    },
    node: root
});

// Listen for commands from the `setStorage` port.
// Turn the data to a string and put it in localStorage.
// https://github.com/elm-community/js-integration-examples/tree/master/localStorage
app.ports.setStorage.subscribe(function (state) {
    localStorage.setItem('initial-data', JSON.stringify(state));
});

/* Manage urls using Browser.element
 https://github.com/elm/browser/blob/1.0.2/notes/navigation-in-elements.md */


// Inform app of browser navigation (the BACK and FORWARD buttons)
window.addEventListener('popstate', function () {
    const field = location.pathname.slice(1);
    const storedData = localStorage.getItem(field);
    const flags = storedData ? JSON.parse(storedData) : null;
    app.ports.onUrlChange.send({ url: location.href, storedData });
});

// Change the URL upon request, inform app of the change.
// app.ports.pushUrl.subscribe(function (url) {
//     history.pushState({}, '', url);
//     app.ports.onUrlChange.send(location.href);
// });
