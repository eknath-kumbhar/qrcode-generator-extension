var QRCodeStyling;

const urlInput = document.getElementById('url-input');
const qrCodeContainer = document.getElementById('qr-code');
let qrCode;

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
    qrCode = '';
    qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        margin: 5,
        qrOptions: {
            typeNumber: '0',
            mode: 'Byte',
            errorCorrectionLevel: 'Q'
        },
        dotsOptions: {
            type: 'extra-rounded',
        },
        cornersSquareOptions: {
            type: 'dot'
        },
        cornersDotOptions: {
            type: 'dot'
        },
    });

    qrCode.append(qrCodeContainer);
}

function download() {
    qrCode.download({ name: 'qr', extension: 'png' });
}

getCurrentPageUrl();

document.querySelector('#url-input').addEventListener('change', (e) => {
    renderQrCode(urlInput.value);
});

document.querySelector('#close-btn').addEventListener('click', (e) => {
    window.close();
});

document.querySelector('#download').addEventListener('click', (e) => {
    download();
});