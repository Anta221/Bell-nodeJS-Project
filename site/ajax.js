$(document).ready(function() {

    
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
                    
                    //vide le formulaire
                    $("#name").val("");
                    $("#lien").val("");

                    // redirection
                    window.setTimeout("location=('success.html');" , 3000);
                },
                error:function(res){
                  console.log(res);
                }
            });
              
          }else{
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
        if($("#lien").val() !="" ){
          $("#erreur_lien").text("");
          $("#valider").prop("disabled" , false);
        }else{
          $("#erreur_lien").text("Veuillez saisir le Lien");
          $("#valider").prop("disabled" , true);
        }
      })
  
  
      /**
       * Affiche toutes les sonneries
       * Permet de voter
       */
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
  
  
  
      /**
       * Retour
       */
      $("#btn-retour").on("click" , function(){
        window.location=('index.html');

      })
  
      
  
  })

