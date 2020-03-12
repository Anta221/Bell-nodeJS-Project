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
      $(".btn-confirm").on("click" , function(){
  
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
              }
          });
  
  
  
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
                      html +='<h5 class="card-title"></h5>';
                      html +='<p class="card-text"> Nom: '+ tab[i].name +'</p>';
                      html +='<p class="card-text"> URL: '+ tab[i].lien +'</p>';
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

