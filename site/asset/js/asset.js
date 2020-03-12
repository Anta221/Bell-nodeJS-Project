let btnAdd = document.getElementById("ajouter"); 
let form = document.getElementById('form'); 
let bg = document.getElementById("bg"); 
let btnAnnuler = document.getElementById("btn_annuler"); 

//Affiche le formulaire d'ajout
btnAdd.addEventListener("click" , function(){
    form.classList.toggle("visible");
    bg.classList.toggle("hide");
    btnAdd.classList.add("hide");
})

//annulation 
btnAnnuler.addEventListener("click" , function(){
    form.classList.remove("visible");
    bg.classList.remove("hide");
    btnAdd.classList.remove("hide");
})