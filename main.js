const CONTENT_WIDTH = 800;
const CHAR_BOX_WIDTH = 40;

document.addEventListener('DOMContentLoaded', () => {
    const contentBox = document.getElementById('content');
    contentBox.style.width = CONTENT_WIDTH + 'px';
});

function readingFile(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
        const chartElements = document.querySelectorAll('[data-ready]');
        if (chartElements.length > 0) {
            for (const element of chartElements) {
                element.remove();
            }
        }

        const countChars = textAnalyzer(reader.result);
        dataVisualization(countChars);
    };
}

// ======== Utility Functions ========

function textAnalyzer(str) {
    const pattern = /[A-ZА-Я]/;
    const boxChars = str.split('');
    const counterChar = {};

    for (const char of boxChars) {
        const upperCaseChar = char.toUpperCase();
        if (pattern.test(upperCaseChar)) {
            counterChar[upperCaseChar] = (counterChar[upperCaseChar] || 0) + 1;
        }
    }

    return counterChar;
}

function dataVisualization(chars) {
    const resultBox = document.getElementById('result');
    const numbers = Object.values(chars);
    const maxNumber = Math.max(...numbers);

    for (const char in chars) {
        const quantityChar = chars[char];
        const width = (quantityChar * (CONTENT_WIDTH - CHAR_BOX_WIDTH)) / maxNumber;
        const div = document.createElement('div');
        div.innerHTML = `<span style="width:${CHAR_BOX_WIDTH}px;">${char}&nbsp;</span>
        <div style="background-color:brown;width:${width}px;">${quantityChar}</div>`;
        div.dataset.ready = '';
        resultBox.insertBefore(div, null);
    }
}
