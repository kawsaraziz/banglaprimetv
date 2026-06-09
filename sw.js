fetch('channels.json')
    .then(r => r.json())
    .then(data => { 
        channels = data; 
        renderAll(); 
        renderMenu(); 
    })
    .catch(err => {
        console.error("JSON লোড হয়নি, এররটি হলো:", err);
        alert("চ্যানেল লিস্ট পাওয়া যাচ্ছে না! দয়া করে ফাইল পাথ চেক করুন।");
    });
