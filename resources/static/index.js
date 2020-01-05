
const form = document.getElementById('login-form');
form.addEventListener('submit', function (event) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    const username = encodeURIComponent(form.elements['username'].value);
    const password = encodeURIComponent(form.elements['password'].value);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            form.hidden = true;
        } else {
            const errorText = document.getElementById("error-text");
            errorText.hidden = false
        }
    };
    xhr.send("username=" + username + "&password=" + password);

    event.preventDefault();
    return false;
});

const board = Array.from(document.getElementsByClassName('board-section'))[0];
const utttTable = document.createElement('table');

utttTable.className = "uttt-board";
for (let j = 0; j < 3; j++) {
    const tr = document.createElement('tr');
    for (let k = 0; k < 3; k++) {
        const td = document.createElement('td');
        td.appendChild(createTable());
        td.className = 'uttt-cell';
        tr.appendChild(td);
    }
    utttTable.appendChild(tr);
}

board.appendChild(utttTable);

function onCellClick(event) {
    // event.target.innerHTML = '<svg viewBox="0 0 50 50"><circle class="nought" cx="25" cy="25" r="20" stroke="red"' +
    //     ' fill="transparent" stroke-width="10"/></svg>';
    event.target.innerHTML = '<svg viewBox="0 0 50 50">' +
        '<line class="cross" x1="10" x2="40" y1="10" y2="40" stroke="#0AC2FF" fill="transparent" stroke-width="5"/>' +
        '<line class="cross" x1="40" x2="10" y1="10" y2="40" stroke="#0AC2FF" fill="transparent" stroke-width="5"/>' +
        '</svg>';
    return false;
}

function onMiddleClick(event) {
    event.target.innerHTML = '<svg viewBox="0 0 50 50"><circle class="nought" cx="25" cy="25" r="16" stroke="#2bf042"' +
        ' fill="transparent" stroke-width="5"/></svg>';
    return false;
}

function createTable() {
    const table = document.createElement('table');
    table.className = "ttt-board";
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



