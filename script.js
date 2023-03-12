var QRCodeStyling;
const urlFieldId = 'url'

const urlInput = document.getElementById(urlFieldId);
const qrCodeContainer = document.getElementById('qr-code');
let qrCode;

function getCurrentPageUrl() {
    chrome.tabs && chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        const activeTab = tabs[0] || {};
        activeTab.hasOwnProperty('url') ? setInputValue(tabs[0].url) : '';
    });
}

function setInputValue(url) {
    urlInput.value = url;
    renderQrCode(url);
}

function renderQrCode(url) {
    qrCode = '';
    qrCode = new QRCodeStyling({
        width: 232,
        height: 232,
        margin: 5,
        data: url,
        dotsOptions: {
            type: 'extra-rounded'
        },
        cornersSquareOptions: {
            type: 'extra-rounded'
        },
        cornersDotOptions: {
            type: 'extra-rounded'
        },
    });
    qrCodeContainer.innerHTML = '';
    qrCode.append(qrCodeContainer);
}

function download() {
    qrCode.download({ name: 'qr', extension: 'png' });
}

getCurrentPageUrl();

document.querySelector(`#${urlFieldId}`).addEventListener('change', (e) => {
    renderQrCode(urlInput.value);
});

document.querySelector('#close-btn').addEventListener('click', (e) => {
    window.close();
});

document.querySelector('#download').addEventListener('click', (e) => {
    download();
});