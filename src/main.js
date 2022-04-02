import Decimal from "break_eternity.js";
import { createApp, reactive, VueElement } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

const storageKey = "infiniSave";
const D = (x) => new Decimal(x);
//create all the variables in a data object for saving
function getDefaultObject() {
  return {
    matter: D(0),
    antimatter: D(0),
    currentUpdate: "v0.0.1",
  };
}
let player = reactive({matter:D(0),antimatter:D(0),currentUpdate: 'v0.0.1'})
//saving and loading
function save() {
  window.localStorage.setItem(storageKey, JSON.stringify(player));
}
function load() {
  let savedata = JSON.parse(window.localStorage.getItem(storageKey));
  if(savedata !== null && savedata !== undefined) player = savedata
}
//fix saves
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
