$(document).ready(function() {

    
      /**
       * Permet d'ajouter une sonnerie
       */
      $("#valider").on("click" , function(){
        let erreur = true; 

          //vérification champ name
          if($("#name").val() == ""){
            $("#erreur_name").text("Veuillez saisir le Nom");
            $("#valider").prop("disabled" , true);
            erreur = false; 

          }

          //vérification champ lien
          if($("#lien").val() == ""){
            $("#erreur_lien").text("Veuillez saisir le lien");
            $("#valider").prop("disabled" , true);
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
                    //$("#name").val("");
                    //$("#lien").val("");

                    // redirection
                    window.setTimeout("location=('success.html');" , 3000);
                },
                error:function(res){
                  console.log(res);
                }
            });
              
          }else{
            //affichage modal
            let html='<div class="modal-body">';
                html +='<p class="text-danger">Veuillez remplir tous les champs</p>';
                html+='</div><div class="modal-footer">';
                html+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>';

              $(".modal .modal-content").html(html);
              $(".modal").modal("show");

          }
   
  
      })
  

      //contrôle des inputs

      $("#name").on("change" , function(){
        if($("#name").val() !=""){
          $("#erreur_name").text("");
          $("#valider").prop("disabled" , false);
        }else{
          $("#erreur_name").text("Veuillez saisir le Nom");
          $("#valider").prop("disabled" , true);
        }
      })


      $("#lien").on("change" , function(){

        //controle type url
        let regex = new RegExp( '/(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/');
        let a = regex.test($("#lien").val());
      
        if($("#lien").val() !="" && a == true){
          $("#erreur_lien").text("");
          $("#valider").prop("disabled" , false);

        }else{
          $("#erreur_lien").text("Veuillez saisir une URL valide");
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
                      html +='<div class="col-sm-4">'; 
                      html +='<div class="card">';
                      html +='<div class="embed-responsive embed-responsive-16by9">'
                      //html += '<iframe class="embed-responsive-item" src="'+tab[i].lien+'" allowfullscreen></iframe>';
                      html += '<iframe src="'+tab[i].lien+'" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                      html +='</div>';
                      html +='<div class="card-body">';                   
                      html +='<h5 class="card-title"></h5>';
                      html +='<p class="card-text"> Nom: '+ tab[i].name +'</p>';
                      html +='<p class="card-text"> URL: <a href="'+ tab[i].lien +'" target="_blank">' + tab[i].name +'</a></p>';
                      html +='<p class="coeur d-flex">&#9829;<span><span></p>';
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

