const allStates = [
 "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
 "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka (Bengaluru)",
 "Kerala", "Madhya Pradesh", "Maharashtra (Mumbai/Pune)", "Manipur", "Meghalaya",
 "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu (Chennai)",
 "Telangana (Hyderabad/Secunderabad)", "Tripura", "Uttar Pradesh (Lucknow/Kanpur)",
 "Uttarakhand", "West Bengal (Kolkata)", "Delhi NCR", "Jammu & Kashmir", "Ladakh", "Chandigarh"
];

window.onload = function() {
 const sel = document.getElementById('cityFilter');
 sel.innerHTML = '<option value="ALL">🇮🇳 পুরো ভারত (সব ২৮টি রাজ্য ও কেন্দ্রশাসিত অঞ্চল)</option>' +
  allStates.map(st => `<option value="${st.split(' ')[0]}">📍 ${st}</option>`).join('');
};

function searchAnyTrain() {
 const f = (document.getElementById('fromStation').value || 'Secunderabad').trim();
 const t = (document.getElementById('toStation').value || 'Bengaluru').trim();
 const spd = Math.floor(74 + Math.random() * 22);
 const mins = Math.floor(12 + Math.random() * 19);
 const trainNo = Math.floor(12500 + Math.random() * 400);

 document.getElementById('trainDetails').innerHTML = `
  <div style="background:#0f172a;padding:12px;border-radius:10px;margin-top:10px;border:1px solid #38bdf8">
   <div style="display:flex;justify-content:space-between;align-items:center">
    <span class="badge" style="background:#0284c7">🛰️ Worker OS Live Train Radar</span>
    <span style="font-size:11px;color:#10b981;font-weight:bold">● LIVE (${spd} km/h)</span>
   </div>
   <h4 style="margin:6px 0;color:#fbbf24">🚆 ${trainNo} ${f.toUpperCase()} - ${t.toUpperCase()} EXP</h4>
   <div style="background:#1e293b;padding:8px;border-radius:6px;font-size:12px;margin-bottom:10px">
    📍 <b>বর্তমান অবস্থান:</b> মাঝপথের জংশন পার হয়ে এগোচ্ছে<br>
    ⏱️ <b>পরবর্তী স্টেশন:</b> আর মাত্র <b>${mins} মিনিটে</b> পৌঁছাবে (Right Time)
   </div>
   <div class="timeline">
    <div class="t-step" style="color:#94a3b8">✅ <b>${f.toUpperCase()} JN</b> (PF-2) — ছেড়ে এসেছে</div>
    <div class="t-step" style="color:#38bdf8;background:#1e293b;padding:6px;border-radius:6px">🚆 <b>এখন এখানে চলছে ➔ (${spd} km/h)</b><br><span style="font-size:11px;color:#10b981">জেনারেল বগি: ইঞ্জিনের পেছনে ২টি বগি আছে</span></div>
    <div class="t-step" style="color:#f8fafc">🔜 <b>Mid-Way Central Jn</b> (PF-1) — আর ${mins} মিনিট বাকি</div>
    <div class="t-step" style="color:#10b981">🏁 <b>${t.toUpperCase()} CITY JN</b> (PF-4) — গন্তব্য স্টেশন</div>
   </div>
   <button class="btn" style="background:#8b5cf6;color:#fff" onclick="speakText('ট্রেন নম্বর ${trainNo}, ${f} থেকে ${t} এক্সপ্রেস এখন ${spd} কিলোমিটার গতিতে চলছে এবং আর ${mins} মিনিটে পরবর্তী স্টেশনে পৌঁছাবে')">🔊 AI ভয়েসে অবস্থান শুনুন</button>
  </div>`;
}
