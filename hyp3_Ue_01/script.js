"use strict";

let notesData = [];

const STORAGE_KEY = "hyp3.lab1.g1.2023";

const contentsArea = document.querySelector("#contents");
const notesDiv = document.querySelector("#notes");

function saveData() {

    if (contentsArea.value.trim().length == 0) return;

    const entry = {
        date: new Date().toLocaleString(),
        contents: contentsArea.value
    };

    notesData.push(entry); // speichern data un zit in nodes
    contentsArea.value = "";

    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesData)); // .stringify umwandelt in eine String

    renderData();// aufruf von renderData

}

function renderData() {
    let output = "";


    for(let i in notesData){ // benutzen von nodes
        //x button
        output  +=
        //`<em>${entry.date}</em>-- ${entry.contents}<br>`; //html für browser
        `<button onclick = "removeEntry(${i})">x</button> 
        <em>${notesData[i].date}</em> -- ${notesData[i].contents}<br>`;// funktionen für button


   
    }

    notesDiv.innerHTML = output;
};


function removeEntry(i){
    alert(i);
}


function loadData(){
    const data = localStorage.getItem(STORAGE_KEY);

    if(data){
        notesData = JSON.parse(data); // json zurück in js objekt
    }


};


function removeEntry(index) {
    notesData.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesData)); // // .stringify umwandelt in eine String
    renderData();
}

function clearAll() {
    notesData = [];// Leert das Array, um alle Einträge zu löschen
    localStorage.removeItem(STORAGE_KEY);// Löscht auch die Daten aus dem lokalen Speicher
    renderData();
}


document.querySelector("#save").addEventListener('click', saveData);
document.querySelector("#clear").addEventListener('click', clearAll);



loadData();
renderData();

renderData.splice(output);


/*Aufgabe:
Beim taste "x" drücken muss Zeile verschwinden. 
Neue Button "clear" hinzufügen und auch machen das es alles löscht*/