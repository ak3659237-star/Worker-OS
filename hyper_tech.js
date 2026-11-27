function findNearMe() {
 if (!navigator.geolocation) return alert("GPS চালু করুন!");
 navigator.geolocation.getCurrentPosition(p => {
  const lat = p.coords.latitude.toFixed(5), lon = p.coords.longitude.toFixed(5);
  window.open(`https://www.google.com/maps/search/Police+Station+and+PG+near+${lat},${lon}`, "_blank");
 }, () => alert("লোকেশন পারমিশন দিন!"));
}

function showDigitalQR() {
 const id = "WOS-IN-" + Math.floor(100000 + Math.random() * 900000);
 const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${id}`;
 const box = document.getElementById('techBox');
 box.innerHTML = `<div style="text-align:center;background:#0f172a;padding:12px;border-radius:10px;border:1px solid #10b981;margin-top:8px">
  <span class="badge">🪪 Verified Digital Worker Pass</span><br><br>
  <img src="${qrUrl}" style="border-radius:8px;border:4px solid #fff"><br>
  <b style="color:#38bdf8;font-size:14px">${id}</b><br>
  <span style="font-size:11px;color:#94a3b8">রুম বা ই-বাইক নিতে এই QR কোড স্ক্যান করান</span>
 </div>`;
}
