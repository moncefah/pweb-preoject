let cumulPoints = 0;
let numero = 0;
const tableauJouere = [
    {
        nom: "moncef",
        prenom: "ahmane",
        points: 100
    },
    {
        nom: "Hentabli",
        prenom: "Zakaria",
        points: 50
    }
];
let initBool = true;

const doInsertRow = (nombre, nom, prenom, points) => {
    const row = document.createElement("tr");
    row.classList.add("row");

    const col1 = document.createElement("td");
    col1.classList.add("col-number");
    col1.innerText = nombre ;

    const col2 = document.createElement("td");
    col2.classList.add("col-text");
    col2.innerText = nom;

    const col3 = document.createElement("td");
    col3.classList.add("col-text");
    col3.innerText = prenom;

    const col4 = document.createElement("td");
    col4.classList.add("col-number");
    col4.innerText = points;

    const col5 = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    col5.appendChild(checkBox);
    col5.classList.add("col-check-box");

    row.append(col1, col2, col3, col4, col5);
    document.querySelector("table").appendChild(row);
};
const updateSummary = ()=>{
    document.querySelector("#nbr-points").innerText = cumulPoints;
    document.querySelector("#nbr-lignes").innerText = numero;
}
const doInsert = (nom, prenom, points) => {
    cumulPoints += points;
    numero += 1;
    if (checkInputs()){
        doInsertRow(numero, nom, prenom, points);
        updateSummary();
        tableauJouere.push(objData)
    }
    if(initBool){
        doInsertRow(numero, nom, prenom, points);
        updateSummary();
    }


};

const init = () => {
    tableauJouere.forEach((element) => {
        const arr = Object.values(element);
        doInsert(...arr);
    });
    initBool = false;
};

const rowsToArray = () => {
    const returnArray = [];
    const rows = document.querySelectorAll(".row");
    for (const row of rows) {
        const obj = {
            num: row.children[0].innerText,
            nom: row.children[1].innerText,
            prenom: row.children[2].innerText,
            points: row.children[3].innerText
        };
        returnArray.push(obj);
    }
    return returnArray
};

const getCheckBoxOn = () => {
    const rows = document.querySelectorAll(".row");
    const listToDelete = [];
    for (const row of rows) {
        const checkbox = row.querySelector('input');
        if (checkbox.checked) {
            listToDelete.push(row);
        }
    }
    return listToDelete;
};
const getFormData =()=> {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const points = document.getElementById("points").value;

    return { nom, prenom, points };
}
const checkInputs = ()=> {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const points = document.getElementById("points").value
    if (nom === "" || prenom === "" || points === "") {
        return false;
    } else {
        return true;
    }
}
// main
init();

const add = document.querySelector(".button__add").addEventListener("click", () => {
    const objToAdd = getFormData();
    doInsert(objToAdd.nom , objToAdd.prenom , parseInt(objToAdd.points));
});

const log = document.querySelector(".button__log").addEventListener("click", () => {
    console.log(rowsToArray());
});

document.querySelector(".button__del").addEventListener("click", () => {
    const listToDelete = getCheckBoxOn();
    listToDelete.forEach((element) => {
        cumulPoints -= (element.children[3].innerText)
        numero -= 1
        document.querySelector("table").removeChild(element);

    });
    console.log(numero)
    updateSummary()
});
