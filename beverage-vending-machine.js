let storedMoney = 0;
let walletMoney = 0;
let beverages = [
    { name: "coke", price: 700, stockNumber: 5 },
    { name: "orageJuice", price: 1200, stockNumber: 5 },
    { name: "water", price: 700, stockNumber: 5 },
    { name: "cornTee", price: 700, stockNumber: 5 },
    { name: "milkis", price: 700, stockNumber: 5 },
    { name: "coffee", price: 500, stockNumber: 5 },
    { name: "trevi", price: 700, stockNumber: 5 },
];

document.querySelector("#notification-area").style.display = "none";
document.querySelector("#money-reset").style.display = "none";
document.querySelector("#reset").style.display = "none";

function walletInput() {
    walletMoney = document.querySelector("#wallet-input-box > input").value;

    document.querySelector("#wallet-money").value = walletMoney;

    document.querySelector("#wallet-input-box").style.display = "none";
    document.querySelector("#notification-area").style.display = "block";
    document.querySelector("#money-reset").style.display = "block";
    document.querySelector("#reset").style.display = "block";
}

function inputMoney(inputMoney) {
    if (walletMoney >= inputMoney) {
        walletMoney -= inputMoney;
    } else {
        return alert("지갑에 돈이 부족합니다.");
    }

    storedMoney += inputMoney;

    document.querySelector("#stored-money").value = storedMoney;
    document.querySelector("#input-money").value = inputMoney;
    document.querySelector("#wallet-money").value = walletMoney;

    for (const beverage of beverages) {
        if (beverage.price <= storedMoney && beverage.stockNumber > 0) {
            document.querySelector(`#${beverage.name}`).style.backgroundColor = "yellow";
            document.querySelector(`#${beverage.name}`).style.borderStyle = "outset";
        }
    }
    document.querySelector("#text-area").innerHTML = "";
}

function walletMoneyReset() {
    document.querySelector("#notification-area").style.display = "none";
    document.querySelector("#money-reset").style.display = "none";
    document.querySelector("#wallet-input-box").style.display = "block";
}

function reset() {
    window.location.reload();
}

function beverageChoice(parameter) {
    for (const beverage of beverages) {
        if (beverage.name === parameter) {
            if (storedMoney < beverage.price) {
                return (document.querySelector("#text-area").innerHTML = "음료자판기에 잔돈이 부족해서 선택한 음료를 구매할 수 없습니다.");
            }
            if (beverage.stockNumber < 1) {
                return (document.querySelector("#text-area").innerHTML = "선택한 음료 재고가 없습니다.");
            }

            beverage.stockNumber -= 1;
            storedMoney -= beverage.price;
            document.querySelector(`#${parameter} > span`).innerHTML = beverage.stockNumber.toString();
            document.querySelector("#text-area").innerHTML = "선택한 음료가 나왔습니다. 잔돈이 나옵니다.";
            walletMoney += storedMoney;
            storedMoney = 0;
            document.querySelector("#stored-money").value = storedMoney;
            document.querySelector("#wallet-money").value = walletMoney;
            console.log();
            let buttons = document.querySelectorAll("#beverage-list > button");

            for (const button of buttons) {
                button.style.backgroundColor = "";
            }
        }
    }
}
