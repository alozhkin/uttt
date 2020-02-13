
Array.from(document.getElementsByClassName('login-form')).forEach(it => {
    it.addEventListener('submit', formListener());
});

const board = Array.from(document.getElementsByClassName('board-section'))[0];
const utttTable = document.createElement('table');

utttTable.className = "uttt-board";
for (let j = 0; j < 3; j++) {
    const tr = document.createElement('tr');
    for (let k = 0; k < 3; k++) {
        const td = document.createElement('td');
        if (k === 0 && j === 0) td.appendChild(temp());
        else td.appendChild(createTable(j * 3 + k));
        td.className = 'uttt-cell';
        tr.appendChild(td);
    }
    utttTable.appendChild(tr);
}

board.appendChild(utttTable);

function formListener(event) {
}

function onCellClick(event) {
    event.target.innerHTML = '<svg viewBox="0 0 50 50">' +
        '<line class="cross" x1="10" x2="40" y1="10" y2="40" stroke="#A30022" fill="transparent" stroke-width="5"/>' +
        '<line class="cross" x1="40" x2="10" y1="10" y2="40" stroke="#A30022" fill="transparent" stroke-width="5"/>' +
        '</svg>';
    highlight(event.target);
    return false;
}

function highlight(target) {
    Array.from(document.getElementsByClassName('highlighted-cell')).forEach(it => it.classList.remove('highlighted-cell'));
    target.classList.add('highlighted-cell');
}

function onMiddleClick(event) {
    event.target.innerHTML = '<svg viewBox="0 0 50 50"><circle class="nought" cx="25" cy="25" r="16" stroke="#1DA828"' +
        ' fill="transparent" stroke-width="5"/></svg>';
    highlight(event.target);
    return false;
}

function createTable(counter) {
    const boards = [
        'top-left-board',
        'top-center-board',
        'top-right-board',
        'middle-left-board',
        'middle-center-board',
        'middle-right-board',
        'bottom-left-board',
        'bottom-center-board',
        'bottom-right-board',
    ];
    const table = document.createElement('table');
    table.className = "ttt-board " + boards[counter];
    for (let j = 0; j < 3; j++) {
        const tr = document.createElement('tr');
        for (let k = 0; k < 3; k++) {
            const td = document.createElement('td');
            td.className = 'ttt-cell';
            td.addEventListener('click', onCellClick);
            td.addEventListener('auxclick', onMiddleClick);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function temp() {
    const table = document.createElement('table');
    table.className = "ttt-board";
    for (let j = 0; j < 3; j++) {
        const tr = document.createElement('tr');
        for (let k = 0; k < 3; k++) {
            const td = document.createElement('td');
            td.className = 'ttt-cell gloomy';
            td.addEventListener('click', onCellClick);
            td.addEventListener('auxclick', onMiddleClick);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

Array.from(document.getElementsByClassName('rules-button')).forEach(button => {
    button.addEventListener('click', function () {
        Array.from(document.getElementsByClassName('modal')).forEach(it => it.hidden = false)
    })
});

Array.from(document.getElementsByClassName('rules-board')).forEach(it => f(it));


function f(a) {
    const r = document.createElement('table');

    r.className = 'uttt-board';
    for (let j = 0; j < 3; j++) {
        const tr = document.createElement('tr');
        for (let k = 0; k < 3; k++) {
            const td = document.createElement('td');
            td.appendChild(createRulesTable(j * 3 + k));
            td.className = 'uttt-cell';
            tr.appendChild(td);
        }
        r.appendChild(tr);
    }
    a.appendChild(r);
}

function createRulesTable(counter) {
    const boards = [
        'top-left-board',
        'top-center-board',
        'top-right-board',
        'middle-left-board',
        'middle-center-board',
        'middle-right-board',
        'bottom-left-board',
        'bottom-center-board',
        'bottom-right-board',
    ];
    const table = document.createElement('table');
    table.className = "ttt-board " + boards[counter];
    for (let j = 0; j < 3; j++) {
        const tr = document.createElement('tr');
        for (let k = 0; k < 3; k++) {
            const td = document.createElement('td');
            td.className = 'ttt-cell';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

const closeButton = Array.from(document.getElementsByClassName('close-button'))[0];

closeButton.addEventListener('click', function () {
    Array.from(document.getElementsByClassName('modal')).forEach(it => it.hidden = true)
});

window.onclick = function(event) {
    if (event.target === document.getElementsByClassName('modal')[0]) {
        event.target.hidden = true;
    }
};