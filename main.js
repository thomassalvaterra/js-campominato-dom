// <div class="square"></div>
let bottone = document.getElementById("btnPlay");

btnPlay.addEventListener("click", function() {
    console.log("Avvia partita!");
    creaGriglia();
});

// let numCelle = 100;
// let grid = document.getElementById("grid");

function creaGriglia() {

    const grid = document.getElementById("grid");
    //vogliamo che la griglia sia vuota
    grid.innerHTML = "";

    //recupera il livello dalla select
    const livello = getLivello(); 
    let dimensioneGriglie = [100, 81, 49];  
    let numCelleTotali = dimensioneGriglie[livello-1];// let numCelleTotali;
    let numCellePerRiga = Math.sqrt(numCelleTotali); //radice quadrata: es 100 totali -> 10 per riga   // let numCellePerRiga;

    //  if(livello==1) {
    //      numCelleTotali = 100;
    //      numCellePerRiga = 10;
    //  } else if(livello==2) {
    //      numCelleTotali = 81;
    //      numCellePerRiga = 9;
    //  } else if(livello==3) {
    //      numCelleTotali = 49;
    //      numCellePerRiga = 7;
    //  }

    //DA FARE: genera lista bombe
    const bombsList = [];
    let gameover = false;
    let punteggio = 0;
    // for (let i = 0; i < 16; i++) {
    //     const newNumber = getRndInteger(1, numCelleTotali);

    //     if(!bombsList.includes(newNumber)) {
    //         bombsList.push (newNumber);
    //     }    
    // }

    while(bombsList.length<16) {
        const newNumber = getRndInteger(1, numCelleTotali);

        if(!bombsList.includes(newNumber)) {
            bombsList.push (newNumber);
            console.log(`Number: ${newNumber}`);
        } else {
            console.log(`Duplicate: ${newNumber}`);
        }  
    }

    console.log(bombsList);

    for (let i = 1; i <= numCelleTotali; i++) {

        let cella = creaQuadrato(i, bombsList, gameover);
        cella.style.width = `calc(100% / ${numCellePerRiga})`;
        cella.style.height = `calc(100% / ${numCellePerRiga})`;

        //per ogni quadrato voglio un evento che gestisca il click    
        cella.addEventListener("click", function() {
        
            const numCelleValide = numCelleTotali - bombsList;
            //DA FARE: controllare l'array delle bombe
            if(!gameover) {
                if(!bombsList.includes(i)) {
                    cella.classList.add("cliccata");
                    punteggio++;
                    document.getElementById("msg").innerHTML = `Punteggio: ${punteggio}`;

                    if (punteggio >= numCelleValide) {
                        alert("You win!");
                        gameover = true;
                    //DA FARE: incrementare il punteggio
                    } else {
                        cella.classList.toggle("mina");
                        gameover = true;
                    //DA FARE: termina partita
                    }
                } 
            }  
        });
         grid.appendChild(cella);
    }   
};
    
function getLivello() {

    const livello = parseInt(document.getElementById("livelli").value);
    console.log("Difficoltà: ", livello);
    return livello;
};

function creaQuadrato(numero, bombsList, gameover) {

    const cella = document.createElement("div");
    cella.classList.add("square");
    cella.innerText = numero;

    return cella;
};   

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


