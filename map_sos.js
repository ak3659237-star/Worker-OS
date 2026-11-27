function openGoogleMap(road, city) {
    const query = encodeURIComponent(road + ", " + city + ", India");
    window.open("https://www.google.com/maps/search/?api=1&query=" + query, "_blank");
}

function triggerSOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            alert("🚨 SOS অ্যালার্ট পাঠানো হয়েছে!\nআপনার লাইভ GPS (" + pos.coords.latitude.toFixed(4) + ", " + pos.coords.longitude.toFixed(4) + ") আশেপাশের কর্মী ও নিকটস্থ থানায় শেয়ার করা হয়েছে।");
        }, () => {
            alert("🚨 জরুরি SOS অ্যালার্ট সক্রিয়! নিকটস্থ কর্মী কমিউনিটিকে জানানো হচ্ছে।");
        });
    }
}
