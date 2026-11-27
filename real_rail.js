const realTrains = {
 "12703": {
  name: "12703 Falaknuma Exp (Howrah ➔ Secunderabad)",
  status: "49m late | Crossed MANGULI (Updated seconds ago)",
  stops: [
   { code: "BHC", km: "296 km", name: "Bhadrak", arr: "13:09", schA: "12:20", dep: "13:11", schD: "12:22", pf: "PF 2", delay: "49m delay", passed: true },
   { code: "JJKR", km: "340 km", name: "Jajpur K Road", arr: "14:01", schA: "12:51", dep: "14:03", schD: "12:53", pf: "PF 3", delay: "1h 10m", passed: true },
   { code: "CTC", km: "412 km", name: "Cuttack", arr: "15:40", schA: "14:00", dep: "15:45", schD: "14:05", pf: "PF 1", delay: "1h 40m", current: true },
   { code: "BBS", km: "440 km", name: "Bhubaneswar", arr: "16:15", schA: "14:40", dep: "16:20", schD: "14:45", pf: "PF 4", delay: "1h 35m", passed: false }
  ]
 },
 "12785": {
  name: "12785 Kacheguda - Ashokapuram Exp (Secunderabad ➔ Bengaluru)",
  status: "On Time | Crossed DHARMAVARAM (Updated seconds ago)",
  stops: [
   { code: "KCG", km: "0 km", name: "Kacheguda / Secunderabad", arr: "Start", schA: "--", dep: "19:05", schD: "19:05", pf: "PF 2", delay: "Right Time", passed: true },
   { code: "DHNE", km: "298 km", name: "Dhone Junction", arr: "01:45", schA: "01:45", dep: "01:50", schD: "01:50", pf: "PF 3", delay: "Right Time", passed: true },
   { code: "DMM", km: "438 km", name: "Dharmavaram Jn", arr: "04:30", schA: "04:30", dep: "04:35", schD: "04:35", pf: "PF 1", delay: "Right Time", current: true },
   { code: "YNK", km: "596 km", name: "Yelahanka Jn (Bengaluru)", arr: "06:45", schA: "06:45", dep: "06:47", schD: "06:47", pf: "PF 4", delay: "Right Time", passed: false },
   { code: "SBC", km: "614 km", name: "KSR Bengaluru City Jn", arr: "07:40", schA: "07:40", dep: "End", schD: "--", pf: "PF 6", delay: "Right Time", passed: false }
  ]
 }
};

function renderRealTrain(tNo) {
 const tr = realTrains[tNo] || realTrains["12785"];
 let rows = tr.stops.map(s => `
  <div class="rail-row">
   <div><b>${s.code}</b><br><span style="color:#64748b;font-size:10px">${s.km}</span></div>
   <div class="track-col">
    <div class="track-line ${s.passed || s.current ? 'passed' : ''}"></div>
    ${s.current ? '<div class="train-pin">🚆</div>' : '<div class="st-dot"></div>'}
   </div>
   <div><b>${s.name}</b><br><span class="delay-txt">${s.delay}</span></div>
   <div><b style="color:#dc2626">${s.arr}</b><br><span style="color:#64748b;font-size:10px">${s.schA}</span></div>
   <div><b style="color:#dc2626">${s.dep}</b><br><span style="color:#64748b;font-size:10px">${s.schD}</span></div>
   <div><span style="background:#e2e8f0;padding:2px 4px;border-radius:4px;font-weight:bold">${s.pf}</span></div>
  </div>`).join('');

 window.curTr = tr; document.getElementById('trainDetails').innerHTML = `
  <div class="rail-card">
   <div style="background:#0f172a;color:#38bdf8;padding:8px 10px;font-size:12px;font-weight:bold">${tr.name}</div>
   <div class="rail-top"><span>Dist</span><span></span><span>Station</span><span>Arr</span><span>Dep</span><span>PF</span></div>
   ${rows}
   <div class="live-footer"><span>${tr.status}</span><span>🔄</span></div>
<button class="btn" style="margin:0;border-radius:0;background:#8b5cf6;color:#fff;font-size:13px" onclick="announceRail(window.curTr)">🔊 অডিও শুনুন: কোন স্টেশনে এসেছে ও নেক্সট স্টেশন</button>
  </div>`;
}

function searchAnyTrain() {
 const f = (document.getElementById('fromStation').value || '').toLowerCase();
 if (f.includes('howrah') || f.includes('bhadrak') || f.includes('12703')) renderRealTrain("12703");
 else renderRealTrain("12785");
}

function announceRail(tr) {
 const cur = tr.stops.find(s => s.current) || tr.stops[0];
 const idx = tr.stops.indexOf(cur);
 const nxt = tr.stops[idx + 1] || tr.stops[tr.stops.length - 1];
 speakText(tr.name + " এখন " + cur.name + " স্টেশনে এসেছে। সামনের নেক্সট স্টেশন হলো " + nxt.name + ", প্ল্যাটফর্ম নম্বর " + nxt.pf);
}
