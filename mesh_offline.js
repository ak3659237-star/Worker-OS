if ("serviceWorker" in navigator) {
 navigator.serviceWorker.register("./sw.js").then(() => console.log("Mesh Offline Core Active"));
}

function checkSignalMesh() {
 const online = navigator.onLine;
 const bar = document.getElementById("meshStatus");
 if (bar) {
  bar.innerHTML = online
   ? "🟢 Mesh Node: Weak-Signal Sync Ready (Saved in Phone Memory)"
   : "🟠 Zero-Internet Mode: Running 100% Offline from Local Mesh Core";
 }
}
window.addEventListener("online", checkSignalMesh);
window.addEventListener("offline", checkSignalMesh);
setTimeout(checkSignalMesh, 800);
