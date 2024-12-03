setTimeout(
    () => {
        isDurationHidden();
    }, 250
)


function updateSheet(durationHidden){
    
    let sheet = window.document.styleSheets[0];

    if (durationHidden) {
        sheet.insertRule('.sravvpl_duration { display: none; }', sheet.cssRules.length);
    } else {
        sheet.insertRule('.sravvpl_duration { display: block; }', sheet.cssRules.length);
    }
}

async function isDurationHidden() {
    await chrome.storage.local.get(["durationDisplayHidden"]).then((result) => {
        let durationHidden = result['durationDisplayHidden'] ?? false;
        updateSheet(durationHidden)
      });
}

