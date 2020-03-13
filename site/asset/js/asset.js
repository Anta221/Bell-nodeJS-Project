let btnAdd = document.getElementById("ajouter"); 
let btnVote = document.getElementById("vote"); 
let form = document.getElementById('form'); 
let bg = document.getElementById("bg"); 
let btnAnnuler = document.getElementById("btn_annuler"); 
let sonnerie = document.getElementById("sonnerie"); 
let btnEnvois = document.getElementById("btn_envoyer");
let btnValider = document.getElementById("valider");
let btnRetour = document.getElementById("btn-retour")

//Affiche le formulaire d'ajout
btnAdd.addEventListener("click" , function(){
    form.classList.toggle("visible");
    bg.classList.toggle("hide");
    btnAdd.classList.add("hide");
    btnVote.classList.add("hide");
})

//Affiche les sonneries
btnVote.addEventListener("click" , function(){
    
    sonnerie.classList.toggle("visible");
    bg.classList.toggle("hide");
    btnAdd.classList.add("hide");
    btnVote.classList.add("hide");
    btnRetour.classList.toggle("visible");
    
   
})




//annulation 
btnAnnuler.addEventListener("click" , function(){
    form.classList.remove("visible");
    bg.classList.remove("hide");
    btnAdd.classList.remove("hide");
    btnVote.classList.remove("hide");
})



