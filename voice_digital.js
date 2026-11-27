function voiceSearch(targetId) {
 const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
 if (!SpeechRec) return alert("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই, নিচের বাটনে ট্যাপ করুন!");
 const rec = new SpeechRec();
 rec.lang = 'en-IN';
 rec.onresult = e => {
  document.getElementById(targetId).value = e.results[0][0].transcript;
  if(document.getElementById('fromStation').value && document.getElementById('toStation').value) searchAnyTrain();
 };
 rec.start();
}

function quickRoute(f, t) {
 document.getElementById('fromStation').value = f;
 document.getElementById('toStation').value = t;
 searchAnyTrain();
}

function speakText(txt) {
 const msg = new SpeechSynthesisUtterance(txt);
 msg.lang = 'bn-IN';
 window.speechSynthesis.speak(msg);
}
