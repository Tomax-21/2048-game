/*let table = [[0, 2, 0, 0, 2048],
            [128, 0, 0, 0, 2],
            [4, 0, 128, 128, 0],
            [64, 0, 0, 0, 0],
            [16, 4, 2, 0, 128]]*/

let table = [[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0]]

/*
let table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
*/
console.log(table.length)

let tableColor = {
    0: "#eee4da",
    2: "#faf8ef",
    4: "#ede0c8",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F67C5F",
    128: "#EDCF72",
    256: "#fcba03",
    512: "#f540e3",
    1024: "#f51818",
    2048: "#42e3c8"
}

choixNiveau(4)
getScore(table)

function choixNiveau(taille) {
   // console.log(taille)
    document.getElementById("perdu").innerHTML = ""

    var tbl = document.getElementById("tableau")
    while(tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
    }


    for (var l = 0; l < taille; l++) {
        var row = document.createElement("tr");
    
        for (var c = 0; c < taille; c++) {
            var cell = document.createElement("td");

            cell.id = "case"+l+"_"+c;
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }

    if (taille == 3) {
        table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }

    
    if (taille == 4) {
        table = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    }

    if (taille == 5) {
        table = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],  [0, 0, 0, 0, 0]]
    }

    if (taille == 6) {
        table = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],  [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
    }

    //creationTable(table)

    generation(table)
    getScore(table)
    


}

function regen() {
    choixNiveau(table.length)
    document.getElementById("perdu").innerHTML = ""

}

function generation(table) {
    genNewCase(table)
    genNewCase(table)


}

document.addEventListener("keyup", event => {

    
    if (event.key === "ArrowRight") {
        simpliferDroite(table)
        genNewCase(table)
        getScore(table)
    }

    if (event.key === "ArrowLeft") {
        
        simpliferGauche(table)
        genNewCase(table)
        getScore(table)

    }

    if (event.key === "ArrowUp") {
        simpliferHaut(table)
        genNewCase(table)
        getScore(table)

    }

    if (event.key === "ArrowDown") {
        simpliferBas(table)
        genNewCase(table)
        getScore(table)

    }


})




function creationTable(table) {
    for (let i = 0; i < table.length; i++) {
        for (let l = 0; l < table.length; l++) {
            caseName = document.getElementById("case"+i+"_"+l)


            
            
                caseName.innerHTML = table[i][l]


                caseColor = caseName.innerHTML
                color = tableColor[caseColor]
                caseName.style.backgroundColor = color  

                if (table[i][l] == 0) {
                    caseName.innerHTML = ""
                }
                


        }
    }
    
    return table
}




function genNewCase(table) {
    let possible = false

    for (let i = 0; i < table.length; i++) {
        for (let l = 0; l < table.length; l++) {
            if (table[i][l] == 0) {
                possible =true
                
            }
        }
    }

    if (possible == true) {
        do {
            nb = Math.floor(Math.random() * table.length);
            nb2 = Math.floor(Math.random() * table.length);
        } while (table[nb][nb2] != 0); 



        modifClass()

     /*   let caseLancementAnim = document.getElementById("case"+nb+"_"+nb2);
        caseLancementAnim.classList.add("lancement-animation")*/

    
       
        let listeNbAdd = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4]
        nbAdd = Math.floor(Math.random() * 16)
        table[nb][nb2] = listeNbAdd[nbAdd];

        setTimeout(deleteClassAnim, 500)



        
 
    }

    else {
        defaite(table)
    }

    creationTable(table)
    return table
}

function modifClass() {
  /*  console.log("1")*/
    let caseLancementAnim = document.getElementById("case"+nb+"_"+nb2);
    caseLancementAnim.classList.add("lancement-animation");

}

function deleteClassAnim() {
    for (let i = 0; i < 5; i++) {
            
        for (let j = 0; j < 5; j++) {

            let caseDeleteAnim = document.getElementById("case"+i+"_"+j);

            try {
                caseDeleteAnim.classList.remove("lancement-animation")

                
            } catch { }

            

        }

    }
/*
    try {
        document.getElementById("differenceScore").classList.remove("ajout-score")
        console.log("fgjdfkjf")
    } catch { }*/




}


function gauche(ligne) {

    for (let i = 0; i < table.length; i++) {
            
        for (let j = 1; j < table.length; j++) {
                
            if (ligne[j-1] == 0) {
                [ligne[j-1], ligne[j]] = [ligne[j], ligne[j-1]];
            }
        }
         
    }

    return ligne
}


function simplifierG(ligne) {
    l1 = gauche(ligne);

        
    //for (let i = 1; i < 5; i++) {
        
        for (let j = 1; j < table.length; j++) {

            if (l1[j-1] == l1[j]) {

                l1[j-1] =  l1[j] *2;
                l1[j] = 0;
            }

        }
        l1 = gauche(l1);
   // }
    return ligne

}


function simpliferGauche(table) {
    for (let i = 0; i < table.length; i++) {
        simplifierG(table[i]);
    }
    return table
    
}



function droite(ligne) {

    for (let i = 0; i < table.length; i++) {
            
        for (let j = 1; j < table.length; j++) {
                
            if (ligne[j] == 0) {
                [ligne[j-1], ligne[j]] = [ligne[j], ligne[j-1]];
            }
        }
         
    }

    return ligne
}


function simplifierD(ligne) {
    l1 = droite(ligne);

        
    //for (let i = 1; i < 5; i++) {
        
        let j= (table.length)-1
        while (j>0) {
            if (l1[j] == l1[j-1]) {

                l1[j] =  l1[j-1] *2;
                l1[j-1] = 0;
        }

        j--
    }
    l1 = droite(l1);
   // }
    return ligne

}


function simpliferDroite(table) {
    for (let i = 0; i < table.length; i++) {
        simplifierD(table[i]);
    }
    return table
    
}



function haut(ligne, c) {

    for (let i = 0; i < table.length; i++) {
            
        for (let j = 1; j < table.length; j++) {
                
            if (ligne[j-1][c] == 0) {
                [ligne[j-1][c], ligne[j][c]] = [ligne[j][c], ligne[j-1][c]];
            }
        }
         
    }

    return ligne
}


function simplifierH(ligne, c) {
    l1 = haut(ligne, c);

        
    //for (let i = 1; i < 5; i++) {
        
        for (let j = 1; j < table.length; j++) {

            if (l1[j-1][c] == l1[j][c]) {

                l1[j-1][c] =  l1[j][c] *2;

                l1[j][c] = 0;
            }

        }
        l1 = haut(l1, c);
   // }
    return ligne

}


function simpliferHaut(table) {
    for (let i = 0; i < table.length; i++) {
        simplifierH(table, i);
    }
    return table
    
}


function bas(ligne, c) {

    for (let i = 0; i < table.length; i++) {
            
        for (let j = 1; j < table.length; j++) {
                
            if (ligne[j][c] == 0) {
                [ligne[j-1][c], ligne[j][c]] = [ligne[j][c], ligne[j-1][c]];
            }
        }
         
    }

    return ligne
}



function simplifierB(ligne, c) {
    l1 = bas(ligne, c);

        
    //for (let i = 1; i < 5; i++) {
        
        let j = (table.length)-1

        while (j>0) {
            if (l1[j][c] == l1[j-1][c]) {

                l1[j][c] =  l1[j-1][c] *2;
                l1[j-1][c] = 0;
            }

            j--

        }
        l1 = bas(l1, c);
   // }
    return ligne

}


function simpliferBas(table) {
    for (let i = 0; i < table.length; i++) {
        simplifierB(table, i);
    }
    return table
    
}



function defaite(table) {

    let perdu = ""
    for (let i = 0; i < table.length; i++) {
            
        for (let j = 0; j < table.length; j++) {

            try {
                if (table[i][j] == table[i][j+1]){
                    perdu = "false";
                }   
            } catch { }

            try {
                if (table[i][j] == table[i+1][j]) {
                    perdu = "false"
                }
        
            } catch { }

            try {
                
                if (table[i][j] == table[i-1][j]) {
                    perdu = "false"
                }
            } catch { }


            try {
                
                if (table[i][j] == table[i][j-1]) {
                    perdu = "false"
                }
            } catch { }

        
        }
    }

    if (perdu != "false") {

        document.getElementById("perdu").innerHTML = "Vous avez perdu"
        document.getElementById("perdu").classList.add("apparitionD")


    }

    
    
}


function getScore(table) {


    liste_valeur = {
        0: 0,
        2: 0,
        4: 4,
        8: 16,
        16: 48,
        32: 128,
        64: 320,
        128: 768,
        256: 1792,
        512:4096,
        1024: 9216,
        2048: 20480,
        4096: 45056

    }
    score = 0

    scoreActuel = document.getElementById("score-nb").innerHTML
    


    for (let i = 0; i < table.length; i++) {
            
        for (let j = 0; j < table.length; j++) {
            valeur = parseInt(table[i][j])

            score += liste_valeur[valeur]


            document.getElementById("score-nb").innerHTML= score


            
        }

    }

    differenceScore = parseInt(document.getElementById("score-nb").innerHTML)-scoreActuel
    document.getElementById("differenceScore").innerHTML = "+ "+differenceScore
    try {
        if (parseInt(differenceScore) > 0) {
            document.getElementById("differenceScore").classList.add("ajout-score")

            setTimeout(supprimerClassScore, 700)


        }

    } catch { }
  


}


function supprimerClassScore() {
    try {
        document.getElementById("differenceScore").classList.remove("ajout-score")
        
    } catch { }
}


