class Ajax
{

  constructor(lien){
    this.lien = lien;
  }

  /**
  * Ajouter Une sonnerie 
  */
  addSound(name, urlSound){
    let erreur = true; 
  
  //vérification champ name
    if(name == ""){
      $("#erreur_name").text("Veuillez saisir le Nom");
      $("#valider").prop("disabled" , true);
      erreur = false; 

    }
    
    //vérification champ lien
    if(urlSound == ""){
      $("#erreur_lien").text("Veuillez saisir le lien");
      $("#valider").prop("disabled" , true);
      erreur = false; 
  
      }
        
    if(erreur == true){
  
          let donnee = {
              "name" : name, 
              "lien" : urlSound
          };
       
          $.post({
              url: this.lien, 
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
            
    }
    else{
          //affichage modal
          let html='<div class="modal-body">';
              html +='<p class="text-danger">Veuillez remplir tous les champs</p>';
              html+='</div><div class="modal-footer">';
              html+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>';

            $(".modal .modal-content").html(html);
            $(".modal").modal("show");

        }

  }

    /**
     * Affichage des sonneries 
     */
    getSound(){
        
      
      $.get({
        url: this.lien, 
        success:function(res){
    
                  
          let tab =[];
    
          $.each( res, function( key, val ) {
                          
            tab.push(val );
    
          });
    
          //affichage des sonneries dans un card
          let tab2 =[];
          for(let i = 0 ; i < tab.length ; i++){

    
              let html ="";
                  html +='<div id="'+ tab[i]._id+'" class="col-sm-4">';
                  html += '<hr>';
                  html +='<div class="card">';
                  html +='<div class="embed-responsive embed-responsive-16by9">'
                  html += '<iframe src="'+tab[i].lien+'" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                  html +='</div>';
                  html +='<div class="card-body">';                   
                  html +='<p class="card-text"> Nom: '+ tab[i].name +'</p>';
                  html +='<p class="card-text"> URL: <a href="'+ tab[i].lien +'" target="_blank">' + tab[i].name +'</a></p>';
                  html +='<div class="d-flex justify-content-between align-items-center text-center">';
                  html +='<p class="coeur d-flex col-sm">&#9829;<input type="hidden" value=" '+tab[i]._id  +' "></p>';
                  html +='<p class="col-sm Note">'+ tab[i].note +'</p>';
                  html +='<p class="text-success hide">&#10003;</p>'
                  html +='<p class="text-danger hide"></p>'
                  html +='</div>';
                  html +='</div>';
                  html +='</div>';
    
                  tab2.push(html);
    
                    
              }
                
          $("#sonnerie .row").html(tab2);
    
    
          //ajout d'une note
          let coeurs = document.querySelectorAll(".coeur"); 
          let cpt = []; 
          
          for(let i = 0 ; i < coeurs.length ; i++){
              cpt[i] = 0; 
              coeurs[i].addEventListener("click" , function(e){
              cpt[i] ++;
           
              let id_bell = e.currentTarget.childNodes[1].value;
              
        
                let note = {
                  'note' :  cpt[i]
                };

                let url = "http://127.0.0.1:3000/bells/"+id_bell ; 
                let newUrl = url.replace("%20" , "");
                let uri = newUrl.replace(/ /g,'');

        
                //Enregistrement de la note en base
                $.ajax({
                  url: uri,
                  type: "PUT",
                  "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: note,
                  success(res){
                
                      //affiche la nouvelle note 
                      $.ajax({
                        url: uri,
                        type: "GET",
                        success(res)
                        {
                      
                            let selecteur = "#"+id_bell; 
                            let sonnerie = selecteur.replace(/ /g,'');
                         
                            $(sonnerie + " .Note").text(res.note); 
                            $(sonnerie + " .text-success").addClass("visible");
                           
                        }

                      })

                  },error(err){
                    $(sonnerie + " .text-danger").html("&#10007;" +err);
                    $(sonnerie + " .text-danger").addClass("visible");
                 
                  } 
                          
                          
                });
                                
                     
            });
                        
            
            }

        }

      });
    
              
      
        
    };

  /**
   * Contrôle des inputs 
   */
  controlName(nom){
    if(nom != ""){
      $("#erreur_name").text("");
      $("#valider").prop("disabled" , false);
    }
    else{
      $("#erreur_name").text("Veuillez saisir le Nom");
      $("#valider").prop("disabled" , true);
  }
}
  controlLink(lien){
  
    let regex = new RegExp( '/(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/');
    let a = regex.test(lien);

    if(lien !="" && a == true){
      $("#erreur_lien").text("");
      $("#valider").prop("disabled" , false);
    }else{
      $("#erreur_lien").text("Veuillez saisir une URL valide");
      $("#valider").prop("disabled" , true);
    }
}

};



/**
 * TRAITEMENT PRINCIPAL 
 */

let addsound = new Ajax("http://127.0.0.1:3000/bell");

// Permet d'ajouter une sonnerie
$("#valider").on("click" , function(){
  var name = $("#name").val(); 
  var lien = $("#lien").val();

  
  addsound.addSound(name, lien);


//contrôle des inputs
$("#name").on("change" , function(){
  addsound.controlName($("#name").val()); 
})


//controle type url
$("#lien").on("change" , function(){
  addsound.controlLink($("#lien").val());
})
  
})


//Affiche toutes les sonneries & Permet de voter
$("#vote").on('click' , function(){
  let getsound = new Ajax("http://127.0.0.1:3000/bell");
  getsound.getSound();
}); 




// bouton  Retour
$("#btn-retour").on("click" , function(){
  window.location=('index.html');
})
