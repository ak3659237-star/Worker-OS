const slots = [
 { id: 1, city: "Bengaluru", dist: "Bengaluru Urban", thana: "HSR Layout PS", vill: "Agara Village", road: "27th Main Rd, Hanuman Temple-এর পাশে", pkg: "PG ₹100 + Zypp EV ₹160/day",
   steps: ["ধাপ ১: KSR Bengaluru স্টেশনে নামুন", "ধাপ ২: 500D সরকারি বাসে HSR BDA নামুন (₹25)", "ধাপ ৩: 27th Main Rd ধরে ৩০০মি হেঁটে OTP দিন"] },
 { id: 2, city: "Lucknow", dist: "Lucknow", thana: "Gomti Nagar PS", vill: "Vibhuti Khand", road: "Kisan Bazar Rd, Gate 2", pkg: "Room ₹80 + EV ₹130/day",
   steps: ["ধাপ ১: Charbagh স্টেশনে নামুন", "ধাপ ২: মেট্রো বা সিটি বাসে Gomti Nagar আসুন", "ধাপ ৩: Kisan Bazar Gate 2-এ OTP দিন"] }
];
const trains = {
 sec_blr: { info: "🟢 জেনারেল বগি: সামনে ২টি ও পেছনে ২টি | ভাড়া: ₹235", stops: ["19:05 Secunderabad (PF 2)", "01:45 Dhone Jn (PF 3)", "06:45 Yelahanka (Bengaluru)", "07:40 KSR Bengaluru City"] },
 kan_sec: { info: "🟢 জেনারেল বগি: পেছনে ৩টি | ভাড়া: ₹410", stops: ["11:40 Kanpur Central (PF 4)", "21:15 Bhopal Jn (PF 1)", "04:10 Nagpur Jn (PF 3)", "13:30 Secunderabad Jn"] }
};
function switchTab(t,el){
 document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
 el.classList.add('active');
 ['slots','train','guide'].forEach(id=>document.getElementById('tab-'+id).style.display=id===t?'block':'none');
}
function renderAll(){
 const c=document.getElementById('cityFilter').value;
 const list=c==='ALL'?slots:slots.filter(s=>s.city===c);
 document.getElementById('slotList').innerHTML=list.map(s=>`
 <div class="card"><span class="badge">🟢 খালি (₹0 Advance)</span>
 <div class="addr-grid">🏛️ <b>জেলা:</b> ${s.dist}<br>🚔 <b>থানা:</b> ${s.thana}<br>🏡 <b>গ্রাম/এলাকা:</b> ${s.vill}<br>🛣️ <b>রোড:</b> <span style="color:#fbbf24">${s.road}</span></div>
 <p style="font-size:12px">🏠🛵 ${s.pkg}</p>
 <button class="btn btn-claim" onclick="alert('✅ লকড! OTP: '+Math.floor(1000+Math.random()*9000))">স্লট লক করুন</button>
 <button class="btn btn-nav" onclick="openGuide(${s.id})">🧭 ধাপ গাইড</button><button class="btn" style="background:#eab308;color:#000" onclick="openGoogleMap('${s.road}','${s.city}')">🗺️ লাইভ ম্যাপ</button><button class="btn" style="background:#8b5cf6;color:#fff" onclick="speakText('গন্তব্য '+'${s.vill}, থানা ${s.thana}, রোড ${s.road}')">🔊 শুনে নিন</button></div>`).join('');
}
function openGuide(id){
 const s=slots.find(x=>x.id===id);
 document.getElementById('guideTitle').innerText='📍 গন্তব্য: '+s.vill+' ('+s.thana+')';
 document.getElementById('stepContainer').innerHTML=s.steps.map(st=>`<label class="step-check"><input type="checkbox"><span>${st}</span></label>`).join('');
 switchTab('guide',document.querySelectorAll('.tab')[2]);
}
function renderTrain(){
 const d=trains[document.getElementById('trainRoute').value];
 document.getElementById('trainDetails').innerHTML=`<p style="font-size:12px;color:#38bdf8">${d.info}</p><div class="timeline">`+d.stops.map(st=>`<div class="t-step">🔵 <b>${st}</b></div>`).join('')+`</div>`;
}
renderAll(); renderTrain();
