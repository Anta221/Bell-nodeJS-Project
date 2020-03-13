//traitement Ajax
  /*$(document).ready(function(){

let valider = document.getElementById('valider');
valider.addEventListener('click', getBells);



  /*  $.get({
      url:  "http://127.0.0.1:3000/bell", 
      success: function(response){
        console.log(response);
      }
    })
  }
*/
/*
function getBells(){

    var settings = {
      "url": "http://127.0.0.1:3000/bell",
      "method": "POST"
    };
    $.ajax(settings).done(function (response) {
      showBells(response);
    });
  }

  function showBells(response){
    let textBlock = document.getElementById("block");
    textBlock.innerHTML = "";
  
    for(let i = 0; i < response.length; i++) {
    let line = document.createElement("P");
      let lineText = document.createTextNode(`Nom: ${response[i].name}, lien: ${response[i].lien}`);
      line.appendChild(lineText);
      textBlock.appendChild(line);
    }
  }

 
})*/


$(document).ready(function() {
  /*
          $("#form_invite_create").on("submit" , function(e){
  
              e.preventDefault(); 
              */
   
  
      /**
       * Permet d'ajouter une sonnerie
       */
      $("#valider").on("click" , function(){
        let erreur = true; 

        if($("#name").val() == "" && $("#lien").val() == ""){
          $("#erreur_name").text("Veuillez saisir le Nom");
          $("#erreur_lien").text("Veuillez saisir le lien");
          erreur = false; 

       }
     


         if(erreur == true){

          let donnee = {
              "name" : $("#name").val(), 
              "lien" : $("#lien").val()
          };
         
          $.post({
              url: "http://127.0.0.1:3000/bell", 
              cache: false,
              dataType: "json",
              ContentType: "application/json;charset=utf-8",
              data: donnee,
              success:function(res){
                  console.log(res);
                  window.location ="success.html";
              },
              error:function(res){
                console.log(res);
              }
          });
              
        }
        else{
          let html='<div class="modal-body">';
              html +='<p>Une erreure s\'est produite Veuillez recommencer ultérieurement.</p>';
              html+='</div><div class="modal-footer">';
              html+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>';

            $(".modal .modal-content").html(html);
            $(".modal").modal("show");

        }
   
  
      })
  

      //contrôle des inputs
      $("#name").on("change" , function(){
        if($("#name").val() !="" ){
          $("#erreur_name").text("");
          $("#valider").prop("disabled" , false);
        }else{
          $("#erreur_name").text("Veuillez saisir le Nom");
          $("#valider").prop("disabled" , true);
        }
      })


      $("#lien").on("change" , function(){
        //let regex = new RegExp( "(http:|https:)+(\/\/)+(:)");
        //let a = regex.test($("#lien").val());
          //console.log(a);
        if($("#lien").val() !="" ){
          $("#erreur_lien").text("");
          $("#valider").prop("disabled" , false);



        }else{
          $("#erreur_lien").text("Veuillez saisir le Lien");
          $("#valider").prop("disabled" , true);
        }
      })
  
  
      $("#vote").on('click' , function(){
      
          $.get({
              url: "http://127.0.0.1:3000/bell", 
              success:function(res){
  
                 
                   let tab =[];
  
                  $.each( res, function( key, val ) {
                        
                         tab.push(val );
  
                    });
  
                    let tab2 =[];
                    for(let i = 0 ; i < tab.length ; i++){
  
                      let html ="";
                      html +='<div class="col-sm-3">'; 
                      html +='<div class="card">';
                      html +='<div class="card-body">';
                      html +='<div class="embed-responsive embed-responsive-16by9">'
                      //html += '<iframe class="embed-responsive-item" src="'+tab[i].lien+'" allowfullscreen></iframe>';
                      html += '<iframe src="'+tab[i].lien+'" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                      html +='</div>';
                    
                      html +='<h5 class="card-title"></h5>';
                      html +='<p class="card-text"> Nom: '+ tab[i].name +'</p>';
                      html +='<p class="card-text"> Lien: '+ tab[i].lien +'</p>';
                      html +='<p class="coeur">&#9829;<span><span></p>';
                      html +='</div>';
                      html +='</div>';
  
                      tab2.push(html);
  
                  
                    }
               
                    $("#sonnerie .row").html(tab2);
  
  
                    let coeurs = document.querySelectorAll(".coeur"); 
                    let cpt = []; 
                      for(let i = 0 ; i < coeurs.length ; i++){
                          cpt[i] = 0; 
                          coeurs[i].addEventListener("click" , function(e){
                              cpt[i] ++;
                              console.log(cpt);
                          
                              e.currentTarget.childNodes[1].innerHTML = cpt[i] ; 
  
                              console.log(  e.currentTarget);
                          })
                          
                      }
                      
  
                 
              }
          });
  
            
     
      }); 
  
  
  
  
      
  
  })

