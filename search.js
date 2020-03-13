const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const autoCompleteResult = document.querySelector('.auto-complete-results');
const autoCompleteBox = document.querySelector('.auto-complete-box');


let responseData = [];
let returnData = [];

window.addEventListener("DOMContentLoaded", getData);


function getData() {
    fetch("data.json")
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => {
        responseData = response.result;
        // 받아 온 데이터를 저장하기 위하여 배열에 담는다.
    });
}

searchInput.addEventListener("keyup", checkValue);

function autoComplete(val) {
    // 매번 새로 검색 할 때 마다 새 검색 기록을 띄우기 위해 매번 배열을 초기화
    returnData = [];

    for(i = 0; i < responseData.length; i++) {
        if(responseData[i].startsWith(val)) {
            returnData.push(responseData[i]);
        }
    }
    return returnData;
}

function checkValue(e) {
    let showData = [];
    if(e.target.value.length > 0) {
        autoCompleteResult.innerHTML = '';
        showData = autoComplete(e.target.value);
        if(showData) {
            for(i = 0; i < showData.length; i++) {
                autoCompleteBox.className = 'auto-complete-box-active'
                autoCompleteResult.innerHTML += `<li class = "auto-complete-results-list">${showData[i]}</li>`;
            }
        }
        autoCompleteResult.style.display = 'block';
    } else {
        showData = [];
        autoCompleteBox.className = 'auto-complete-box'
        autoCompleteResult.innerHTML = '';
    }
}