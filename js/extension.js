let durationDisplaySwitch = document.getElementById('switch');
let switchStatus;

updateSwitchStatus();

function initiateSwitch() {
    document.getElementById("duration-display-switch").checked = switchStatus;
}

async function updateSwitchStatus() { 

    await chrome.storage.local.get(["durationDisplayHidden"]).then((result) => {
        switchStatus = result['durationDisplayHidden'] ?? false;
    });

    initiateSwitch();
    updateTab();
}

async function setSwitchStatus() {
    await chrome.storage.local.set({ "durationDisplayHidden": !switchStatus });
    updateSwitchStatus();
}

function modifyStyleSheet(tabs) {
    let currentTab = tabs[0];
    let currentTabId = currentTab['id'];

    chrome.scripting.executeScript({
        target: {tabId: currentTabId, allFrames: true},
        files: ['js/manage-style-sheet.js'],
    });
}

async function updateTab() {
    let query = { active: true, currentWindow: true };
    await chrome.tabs.query(query, modifyStyleSheet);
}

durationDisplaySwitch.addEventListener("click", (e) => {
        setSwitchStatus()
})
