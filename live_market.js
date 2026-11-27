function openOwnerForm() {
 const box = document.getElementById("ownerBox");
 box.style.display = box.style.display === "none" ? "block" : "none";
}

function addRealListing() {
 const type = document.getElementById("mType").value;
 const zone = document.getElementById("mCity").value.trim() || "HSR Layout, Bengaluru";
 const addr = document.getElementById("mAddr").value.trim() || "Main Road";
 const rate = parseInt(document.getElementById("mRate").value.replace(/\D/g, "")) || 500;
 const phone = document.getElementById("mPhone").value.trim();
 if (!phone) { alert("মালিকের মোবাইল নম্বর দিন!"); return; }

 const list = JSON.parse(localStorage.getItem("worker_market") || "[]");
 list.unshift({ type, zone: zone.toLowerCase(), zoneLabel: zone, addr, rate, phone, time: new Date().toLocaleTimeString() });
 localStorage.setItem("worker_market", JSON.stringify(list));
 renderRealMarket();
 document.getElementById("ownerBox").style.display = "none";
 alert("✅ Geo-Combo অ্যালগরিদম আপনার পোস্টটি এলাকার সাথে ম্যাচ করেছে!");
}

function renderRealMarket() {
 const wrap = document.getElementById("liveListings");
 if (!wrap) return;
 const list = JSON.parse(localStorage.getItem("worker_market") || "[]");
 const zones = {};

 list.forEach(item => {
  if (!zones[item.zone]) zones[item.zone] = { label: item.zoneLabel, work: null, room: null, bike: null };
  if (item.type.includes("কাজ") && !zones[item.zone].work) zones[item.zone].work = item;
  if (item.type.includes("ঘর") && !zones[item.zone].room) zones[item.zone].room = item;
  if (item.type.includes("গাড়ি") && !zones[item.zone].bike) zones[item.zone].bike = item;
 });

 wrap.innerHTML = Object.values(zones).map(z => {
  const ready = z.work && z.room && z.bike;
  const earn = z.work ? z.work.rate : 0;
  const cost = (z.room ? z.room.rate : 0) + (z.bike ? z.bike.rate : 0);
  const net = earn - cost;
  return `
  <div style="background:#0f172a;border:2px solid ${ready ? "#10b981" : "#f59e0b"};border-radius:12px;padding:12px;margin-bottom:12px">
   <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:bold;color:${ready ? "#10b981" : "#fbbf24"}">
    <span>${ready ? "⚡ ১০০% কমপ্লিট কম্বো (কাজ+ঘর+গাড়ি একসাথে)" : "🟡 আংশিক ম্যাচ (আরো স্লট যুক্ত হচ্ছে)"}</span>
    <span>📍 ${z.label}</span>
   </div>
   <div style="font-size:12px;margin:8px 0;line-height:1.6;color:#e2e8f0">
    🛠️ <b>কাজ:</b> ${z.work ? `₹${z.work.rate}/দিন (${z.work.addr}) <a href="tel:${z.work.phone}" style="color:#38bdf8">[কল]</a>` : "❌ এখনো যুক্ত হয়নি"}<br>
    🏠 <b>ঘর:</b> ${z.room ? `₹${z.room.rate}/দিন (${z.room.addr}) <a href="tel:${z.room.phone}" style="color:#38bdf8">[কল]</a>` : "❌ এখনো যুক্ত হয়নি"}<br>
    🛵 <b>গাড়ি:</b> ${z.bike ? `₹${z.bike.rate}/দিন (${z.bike.addr}) <a href="tel:${z.bike.phone}" style="color:#38bdf8">[কল]</a>` : "❌ এখনো যুক্ত হয়নি"}
   </div>
   ${z.work ? `<div style="background:#1e293b;padding:6px 10px;border-radius:6px;font-size:12px;color:#4ade80;font-weight:bold">💰 দৈনিক নিট ইনকাম (খরচ বাদে): ₹${net}/দিন</div>` : ""}
  </div>`;
 }).join("");
}
setTimeout(renderRealMarket, 600);
