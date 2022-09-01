var QRCode;

const urlInput = document.getElementById('url-input');
const qrCode = document.getElementById("qr-code");

function getCurrentPageUrl() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        const activeTab = tabs[0] || {};
        activeTab.hasOwnProperty('url') ? setInputValue(tabs[0].url) : '';
    });
}

function setInputValue(url) {
    urlInput.value = url;
    renderQrCode(url);
}

function renderQrCode(url) {
    qrCode.innerHTML = '';
    new QRCode(qrCode, {
        text: url,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });
}

getCurrentPageUrl();

document.querySelector('#qr-form').addEventListener('submit', (e) => {
    e.preventDefault();
    renderQrCode(urlInput.value);
});