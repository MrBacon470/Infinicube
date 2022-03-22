import Decimal from "break_eternity.js";
import { createApp, reactive } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

const storageKey = "infiniSave";
const D = (x) => new Decimal(x);
//create all the variables in a data object for saving
function getDefaultObject() {
  return {
    matter: D(0),
    antimatter: D(0),
    currentUpdate: "v0.5.1",
  };
}

let player = getDefaultObject();
//saving and loading
function save() {
  window.localStorage.setItem(storageKey, JSON.stringify(player));
}
function load() {
  let savedata = JSON.parse(window.localStorage.getItem(storageKey));
  if (savedata !== undefined) fixSave(player, savedata);
}
//fix saves
function fixSave(main = getDefaultObject(), player) {
  if (typeof player === "object") {
    Object.keys(player).forEach((i) => {
      if (main[i] instanceof Decimal) {
        main[i] = D(player[i] !== null ? player[i] : main[i]);
      } else if (typeof main[i] == "object") {
        fixSave(main[i], player[i]);
      } else {
        main[i] = player[i];
      }
    });
    return main;
  } else return getDefaultObject();
}
export function exportSave() {
  save();
  let exportedData = btoa(JSON.stringify(player));
  const exportedDataText = document.createElement("textarea");
  exportedDataText.value = exportedData;
  document.body.appendChild(exportedDataText);
  exportedDataText.select();
  exportedDataText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(exportedDataText);
}
export function importSave() {
  let importedData = prompt("Paste your save data here!");
  player = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)));
  save();
  location.reload();
}
window.setInterval(function () {
  save();
}, 10000);
window.onload = function () {
  load();
};
//full reset
export function fullReset() {
  exportSave();
  window.localStorage.removeItem(storageKey);
  location.reload();
}
export function deleteSave() {
  if (
    confirm("Are you sure you want to delete your save? (This doesn't export)")
  ) {
    window.localStorage.removeItem(storageKey);
    location.reload();
  }
}
