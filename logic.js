var changeTheme = document.getElementById("theme")
var inputValue = document.getElementById("inputValue")
var outputValue = document.getElementById("outputValue")
var mode = 0;

var cursNow = {
    "USD" : 0,
    "RUB" : 0,
    "EUR" : 0
}

var cursPast = {
    "USD" : 0,
    "RUB" : 0,
    "EUR" : 0
}


changeTheme.addEventListener("click", () => {
    if(mode === 0){
        document.getElementsByClassName("wrapper")[0].classList.toggle('dark')
        document.getElementsByClassName("form")[0].classList.toggle('dark')
        document.getElementsByClassName("changeСurrency")[0].classList.toggle('dark')
        document.getElementsByClassName("changeTime")[0].classList.toggle('dark')
        document.getElementsByClassName("value")[0].classList.toggle('dark')
        document.getElementsByClassName("action")[0].classList.toggle('dark')
        document.getElementsByClassName("theme")[0].classList.toggle('dark')
        mode = 1
    }
    else if(mode === 1){
        document.getElementsByClassName("wrapper")[0].classList.remove('dark')
        document.getElementsByClassName("form")[0].classList.remove('dark')
        document.getElementsByClassName("changeСurrency")[0].classList.remove('dark')
        document.getElementsByClassName("changeTime")[0].classList.toggle('dark')
        document.getElementsByClassName("value")[0].classList.remove('dark')
        document.getElementsByClassName("action")[0].classList.remove('dark')
        document.getElementsByClassName("theme")[0].classList.remove('dark')
        mode = 0
    }
})

document.getElementById("action").addEventListener("click", calculateValue)

function calculateValue(){
    let result;
    if(document.getElementById("changeСurrency").value !== "0"){
        if(document.getElementById("changeTime").value === "Now"){
            result = (inputValue.value * cursNow[document.getElementById("changeСurrency").value]).toFixed(3)
        }
        else if(document.getElementById("changeTime").value === "Past"){
            result = (inputValue.value * cursPast[document.getElementById("changeСurrency").value]).toFixed(3)
        }
        else{
            result = "Выбери период"
        }
    }
    else{
        result = "Выберите валюту"
    }
    outputValue.value = result
}

function saveData(){
    fetchCursEveryDay()
    fetchCursPast()
}


function fetchCursPast() {
    fetch('https://www.nbrb.by/api/exrates/rates?ondate=2016-7-6&periodicity=0')
    .then(response => response.json())
    .then(response => {
        cursPast["USD"] = response[4].Cur_OfficialRate / response[4].Cur_Scale
        cursPast["EUR"] = response[5].Cur_OfficialRate / response[5].Cur_Scale
        cursPast["RUB"] = response[16].Cur_OfficialRate / response[16].Cur_Scale
        console.log(cursPast)
    })
    .catch(err => {
        console.log(err)
    })
}


function fetchCursEveryDay() {
    fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
    .then(response => response.json())
    .then(response => {
        cursNow["USD"] = response[5].Cur_OfficialRate / response[5].Cur_Scale
        cursNow["EUR"] = response[6].Cur_OfficialRate / response[6].Cur_Scale
        cursNow["RUB"] = response[17].Cur_OfficialRate / response[17].Cur_Scale
        console.log(cursNow)
    })
    .catch(err => {
        console.log(err)
        alert("Нет подключения к интернету или исчезла ссылка")
    })
}