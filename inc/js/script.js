$(document).ready(monMain);
function monMain(){
    var menu = jsonEnLocal();
    traitemJson(menu);
    cacherLaConnexion();
    console.log('imarche');
}
function  traitemJson(objJson){
    var tabCarteA = objJson.semaineA;
    var tabCarteB = objJson.semaineB;
    var tabCarteC = objJson.semaineC;
    var nbSlidePlacer = 0;
    // Placer seulement 4 slide pour les 4 prochain jour a partir de demain
    for(var cycle = 0; cycle < 3 ; cycle++){
        nbSlidePlacer = placementMenu(tabCarteA,cycle,nbSlidePlacer);
        nbSlidePlacer = placementMenu(tabCarteB,cycle,nbSlidePlacer);
        nbSlidePlacer = placementMenu(tabCarteC,cycle,nbSlidePlacer);
    }
}
function placementMenu(semaine,cycle,nbSlide){
    var placer = false;
    var bonJour = false;
    var arreterPlacer = false;
    $.each(semaine, function (index, objet) { 
        var journee = objet.jour + ' ' + objet.date[cycle].jour;
        var nbPlace = objet.date[cycle].place;
        var lienImage = objet.image;
        var menuEntrer = objet.menu.entrer;
        var menuPlat = objet.menu.plat;
        var menuDessert = objet.menu.dessert;
        var menuAcomp = objet.menu.accompagnement;
        bonJour = verifJour(objet.date[cycle].jour);
        if(nbSlide >= 4){
            arreterPlacer = true;
        }
        if(bonJour){
            placer = true;
        }
        if(placer && !arreterPlacer){
            slide = creationSlide(journee,nbPlace,lienImage,menuEntrer,menuPlat,menuAcomp,menuDessert);
            placementSide(slide,'#notreCarrousel');
            nbSlide++;
        }

        if(cycle == 2){
            var tabJour =  [objet.date[0],objet.date[1],objet.date[2]];
            carte = creationCarte(objet.jour,tabJour, menuEntrer, menuPlat,menuAcomp, menuDessert);
            placementCarte(carte,'#carteenbas');
        }
    });
    return nbSlide;
}
function creationSlide(jour,nbPlace,lienImage,menuEntrer,menuPlat,menuAcomp,menuDessert){
    var couleur = couleurPlace(nbPlace);
    var bouton = boutonReserv(nbPlace,couleur);
    var htm = '';
    htm += '<div class="carousel-item ">';
    htm += '<img class="d-block w-100 mh-100" src="'+lienImage+'" alt="" style="height: 40em"/>';
    htm +=' <div class="carousel-caption text-left">';
    htm+= ' <h1>'+jour;
    htm += '<span class="rounded-circle btn '+couleur+'" alt="aa">'+nbPlace+'  </span>';
    htm += '</h1>';
    htm +=  '<p>Il reste '+nbPlace+' place(s)</p> ';
    htm += '<p>Entrées : '+menuEntrer+'</p> ';
    htm+= '<p>Plats : '+menuPlat+'</p> ';
    htm+= '<p>Accompagnement de légumes : '+menuAcomp+'</p> ';
    htm+= '<p>Desserts : '+menuDessert+'</p> ';
    htm+= bouton;
    htm += '</div>';
    htm += '</div>';
    return htm;
}
function creationCarte(journee,tabJour, menuEntrer, menuPlat,menuAcomp, menuDessert){
    var jour = null;
    var bonJour =  false;
    var thm = '';
    var couleur = null;
    thm += '<div class="col-lg-3 ">';
    
    $.each(tabJour, function(index,objet){
        bonJour = verifJour(objet.jour);
        couleur = couleurCarte(bonJour,objet.place);
        jour = convFormatDate(objet.jour);
        thm += '<div class="btn '+couleur+'" > '+jour+' </div>';
    });
    thm += '<h3>'+journee+'</h3>';
    thm += '<p>Entrées :<br>'+menuEntrer+'</p>';
    thm += '<p>Plats :<br>'+menuPlat+'</p>';
    thm += '<p>Accompagnement de légumes :<br>'+menuAcomp+'</p>';
    thm += '<p>Desserts :<br>'+menuDessert+'</p>';
    thm += '</div>';
    return thm; 
}
function placementSide(slide,selectCarousel){
    $(selectCarousel).append(slide);
    $('div.carousel-item:nth-child(1)').addClass('active');
}
function placementCarte(menu,selectmenu){
    $(selectmenu).append(menu);
}
function verifJour(prochainService){ 
    var bon = false;
    var maintenant = new Date();
    var annee   = maintenant.getFullYear();
    var mois    = maintenant.getMonth() + 1;
    var jour    = maintenant.getDate();
    if(prochainService.charAt(1) == ' '){
        var jourService = prochainService.charAt(0);
        var moisSevice =  prochainService.substring(2);
    }else{
        var jourService = prochainService.charAt(0) + prochainService.charAt(1);
        var moisSevice =  prochainService.substring(3);
    }
    var moisNum = conversionMois(moisSevice);
    var aujourdui = '' + annee +'-' + mois + '-' + jour;
    
    var dateprochainService = '' + 2019 +'-' + moisNum + '-' + jourService;
    if(Date.parse(aujourdui) < Date.parse( dateprochainService)){
        bon = true;
    }
    return bon;
}
function conversionMois(moisLit){
    switch(moisLit){
        case 'janvier':
           var moisNumr = '01';
        break;
        case 'fevrier':
            var moisNumr = '02';
        break;
        case 'mars':
            var moisNumr = '03';
        break;
        case 'avril':
            var moisNumr = '04';
        break;
        case 'mai':
            var moisNumr = '05';
        break;
        case 'juin':
            var moisNumr = '06';
        break;
        case 'juillet':
            var moisNumr = '07';
        break;
        case 'aout':
            var moisNumr = '08';
        break;
        case 'septembre':
            var moisNumr = '09';
        break;
        case 'octobre':
            var moisNumr = '10';
        break;
        case 'novembre':
            var moisNumr = '11';
        break;
        case 'decembre':
            var moisNumr = '12';
        break;   
    }
    return moisNumr;
}
function couleurPlace(nbPlace){
    var couleur = null;
    if (nbPlace == 0){
        couleur = 'btn-danger';
    }else if(nbPlace <= 5 && nbPlace > 0){
        couleur = 'btn-warning';
    }else{
        couleur = 'btn-success';
    }
    return couleur;
}
function boutonReserv(nbPlace,couleur){
    var bouton = null;
    if (nbPlace == 0){
        bouton = '<p><a class="btn btn-lg '+couleur+'" href="#" role="button">Complet</a></p>';
    }else{
        bouton = '<p><a class="btn btn-lg '+couleur+'" href="" role="button">Réserver</a></p>';
    }
    return bouton;
}
function convFormatDate(jourMois){
    var dateConv = null;
    if(jourMois.charAt(1) == ' '){
        var jour = jourMois.charAt(0);
        var mois =  jourMois.substring(2);
    }else{
        var jour = jourMois.charAt(0) + jourMois.charAt(1);
        var mois =  jourMois.substring(3);
    }
    var moisNum = conversionMois(mois);
    dateConv = '' + jour + '/' + moisNum;
    return dateConv;
}
function couleurCarte(bon,nbPlace){
    var couleur = null;
    if (!bon){
        couleur = 'btn-secondary';
    }else{
        if(nbPlace == 0){
            couleur = 'btn-danger';
        }else{
            couleur = 'btn-success';
        } 
    }
    return couleur;
}
function jsonEnLocal(){
    var jsonMenu = {
        "semaineA" : [
            {
                "jour" : "Lundi",
                "menu" : {
                    "entrer" : "CRUDITÉS VARIÉES Ou ŒUF COCOTTE A LA CRÈME,  LARDONS ET CHAMPIGNONS SAUTES",
                    "plat" : "ESCALOPE DE VEAU VIENNOISE Ou POULET RÔTI",
                    "accompagnement" : "JARDINIÈRE DE LÉGUMES ET NOUILLES FRAÎCHES",
                    "dessert" : "CRÈME RENVERSÉE Ou ÉCLAIRS AU CAFÉ"
                },
                "date" :[
                    {"jour" : "8 juillet", "place" : 23},
                    {"jour" : "29 juillet", "place" : 0},
                    {"jour" : "19 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://static.cuisineaz.com/610x610/i107308-escalopes-de-veau-champignons.jpg"
            },
            {
                "jour" : "Mardi",
                "menu" : {
                    "entrer" : "QUICHE LORRAINE ou POTAGE MINESTRONE ",
                    "plat" : "MERLAN SAUCE BONNE FEMME Ou ENTRECOTE  BEARNAISE ",
                    "accompagnement" : "TOMATES PORTUGAISE ET POMMES CROQUETTES " ,
                    "dessert" : "MOUSSE AU CHOCOLAT Ou TARTE AUX POMMES "
                },
                "date" :[
                    {"jour" : "9 juillet", "place" : 23},
                    {"jour" : "30 juillet", "place" : 23},
                    {"jour" : "20 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://res.cloudinary.com/hh7ya2nn2/image/upload/c_fill,dpr_3.0/iwhzcp3ydaybf9raehkl"
            },
            {
                "jour" : "Mercredi",
                "menu" : {
                    "entrer" : "TOMATE ANTIBOISE Ou ŒUFS POCHÉS FLORENTINE ",
                    "plat" : "CÔTE DE PORC CHARCUTIÈRE Ou DARNE DE COLIN GRILLÉE GRENOBLOISE ",
                    "accompagnement" : "RATATOUILLE ET POMMES GAUFRETTES " ,
                    "dessert" : "BEIGNETS AUX POMMES Ou FRAISIER "
                },
                "date" :[
                    {"jour" : "10 juillet", "place" : 23},
                    {"jour" : "31 juillet", "place" : 23},
                    {"jour" : "21 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://static.pratique.fr/images/unsized/da/darnes-colin-grille-endives.jpg"
            },
            {
                "jour" : "Jeudi",
                "menu" : {
                    "entrer" : "GOUGERE ET SALADE Ou MOULES MARINIÈRE ",
                    "plat" : "BLANQUETTE DE DINDE Ou CARRE D'AGNEAU ROTI ",
                    "accompagnement" : "GRATIN PROVENÇAL ET FLAGEOLETS  " ,
                    "dessert" : "MILLEFEUILLE Ou GENOISE CHOCOLAT ET CREME ANGLAISE "
                },
                "date" :[
                    {"jour" : "11 juillet", "place" : 23},
                    {"jour" : "1 aout", "place" : 23},
                    {"jour" : "22 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2018.2F07.2F30.2F804e700a-b580-41a9-b780-efa0e251c727.2Ejpeg/748x372/quality/80/crop-from/center/blanquette-de-dinde.jpeg"
            }
        ],
        "semaineB" : [
            {
                "jour" : "Lundi",
                "menu" : {
                    "entrer" : "ASPERGES SAUCE MOUSSELINE Ou ŒUF FARCI CHIMAY ",
                    "plat" : "NAVARIN D’AGNEAU Ou CANETTE RÔTIE ",
                    "accompagnement" : "HARICOTS VERTS ET TAGLIATELLES AU BEURRE " ,
                    "dessert" : "CHARLOTTE AUX POIRES Ou CHOUX CHANTILLY "
                },
                "date" :[
                    {"jour" : "15 juillet", "place" : 23},
                    {"jour" : "5 aout", "place" : 23},
                    {"jour" : "26 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2Ff9bbfc92-b6d1-4386-bd6c-c66a7f92a118.2Ejpeg/748x372/quality/80/crop-from/center/navarin-d-agneau-printanier.jpeg"
            },
            {
                "jour" : "Mardi",
                "menu" : {
                    "entrer" : "SALADE PIÉMONTAISE Ou ALLUMETTES AU FROMAGE ET JAMBON ",
                    "plat" : "ESCALOPE DE VOLAILLE A LA CREME Ou DAURADES GRILLÉS BEURRE MAITRE D’HOTEL ",
                    "accompagnement" : "TOMATES PROVENÇALE ET RIZ CRÉOLE " ,
                    "dessert" : "DARTOIS AUX AMANDES Ou MOKA "
                },
                "date" :[
                    {"jour" : "16 juillet", "place" : 23},
                    {"jour" : "6 aout", "place" : 23},
                    {"jour" : "27 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://media-cdn.tripadvisor.com/media/photo-s/0f/4f/8f/8c/daurade-grillee-et-ses.jpg"
            },
            {
                "jour" : "Mercredi",
                "menu" : {
                    "entrer" : "PETIT PATE PARISIEN Ou SALADE AUX LARDONS ET CROUTONS ",
                    "plat" : "FILET DE SOLE DIEPPOISE Ou MIGNONS DE PORC A LA MOUTARDE ",
                    "accompagnement" : "GARNITURE DUBARRY ET POMMES BOULANGÈRE " ,
                    "dessert" : "TARTE MARGUERITE AUX FRUITS Ou PARIS-BREST "
                },
                "date" :[
                    {"jour" : "17 juillet", "place" : 23},
                    {"jour" : "7 aout", "place" : 23},
                    {"jour" : "28 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F59f82d64-d4b0-46ec-b017-1d43cca85b52.2Ejpeg/748x372/quality/80/crop-from/center/filets-de-sole-a-la-biere.jpeg"
            },
            {
                "jour" : "Jeudi",
                "menu" : {
                    "entrer" : "ŒUFS BROUILLÉS PORTUGAISE Ou CHAMPIGNONS A LA GRECQUE ",
                    "plat" : "LAPIN A LA MOUTARDE Ou COQUELET GRILLÉ A L'AMÉRICAINE ",
                    "accompagnement" : "LEGUME BRAISÉ  ET POMMES ALLUMETTES " ,
                    "dessert" : "TARTE ALSACIENNE Ou CHARLOTTE RUSSE AUX FRAISES "
                },
                "date" :[
                    {"jour" : "18 juillet", "place" : 23},
                    {"jour" : "8 aout", "place" : 23},
                    {"jour" : "29 aout", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2Fd68a205d-7489-432c-b038-fe1b8dd99b0b.2Ejpeg/750x562/quality/80/crop-from/center/blanquette-de-lapin-a-la-moutarde.jpeg"
            }
        ],
        "semaineC" : [
            {
                "jour" : "Lundi",
                "menu" : {
                    "entrer" : "CRÈME DUBARRY  Ou QUICHE THON RATATOUILLE ",
                    "plat" : "POULET  CHASSEUR Ou CÔTE DE VEAU GRILLE SAUCE PALOISE ",
                    "accompagnement" : "PETITS POIS A LA FRANÇAISE ET GRATIN DAUPHINOIS " ,
                    "dessert" : "TARTE TATIN Ou RIZ IMPÉRATRICE "
                },
                "date" :[
                    {"jour" : "22 juillet", "place" : 23},
                    {"jour" : "12 aout", "place" : 23},
                    {"jour" : "2 septembre", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2Fbd1a218c-070b-48c5-8c78-fd05c08b145a.2Ejpeg/748x372/quality/80/crop-from/center/roti-de-veau-basse-temperature.jpeg"
            },
            {
                "jour" : "Mardi",
                "menu" : {
                    "entrer" : "MOUSSELINE DE POISSON SAUCE NANTUA  Ou CREPES JAMBON CHAMPIGNONS ",
                    "plat" : "ESTOUFFADE BOURGUIGNONNE Ou DARNE DE SAUMON BEURRE D'ANCHOIS ",
                    "accompagnement" : "ÉPINARDS SAUTÉS  ET RIZ PILAF " ,
                    "dessert" : "SAVARIN CHANTILLY Ou FORÊT NOIRE "
                },
                "date" :[
                    {"jour" : "23 juillet", "place" : 23},
                    {"jour" : "13 aout", "place" : 23},
                    {"jour" : "3 septembre", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://www.academiedugout.fr/images/5657/501-307/3361-anchois-a-scapece.jpg?poix=50&poiy=50"
            },
            {
                "jour" : "Mercredi",
                "menu" : {
                    "entrer" : "ŒUFS MOLLETS MACÉDOINE Ou QUICHE AUX OIGNONS ",
                    "plat" : "BLANQUETTE D'AGNEAU Ou TRAVERS DE PORC AU MIEL ",
                    "accompagnement" : "TIAN D'AUBERGINE ET POMMES FONDANTES " ,
                    "dessert" : "BAVAROIS RUBANNÉ Ou TARTE BOURDALOUE "
                },
                "date" :[
                    {"jour" : "24 juillet", "place" : 23},
                    {"jour" : "14 aout", "place" : 23},
                    {"jour" : "4 septembre", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F9c7bb1c1-3f2a-4c6a-bf60-3f572a11b709.2Ejpeg/748x372/quality/80/crop-from/center/daube-de-boeuf-au-vin-rouge.jpeg"
            },
            {
                "jour" : "Jeudi",
                "menu" : {
                    "entrer" : "ŒUF POCHE BOURGUIGNONE Ou SALADE NIÇOISE ",
                    "plat" : "FILET DE PERCHE BEURRE BLANC  Ou CUISSE  DE POULET FARCIE ",
                    "accompagnement" : "PRINTANIÈRE DE LÉGUMES  ET PURÉE MOUSSELINE " ,
                    "dessert" : "ÉCLAIRS VANILLE Ou POTS DE CRÈME VANILLE "
                },
                "date" :[
                    {"jour" : "25 juillet", "place" : 23},
                    {"jour" : "15 aout", "place" : 23},
                    {"jour" : "5 septembre", "place" : 23}
                ],
                "place" : "30",
                "image" : "https://www.arts-et-gastronomie.com/wp-content/uploads/2017/12/43-Chailly-1_CMJNF-Copy.jpg"
            }
        ]
    };
    return jsonMenu;
}
function cacherLaConnexion(){
    if(!$('a').hasClass('rppBtnIns')){
        $('.aCacher').hide();
    }
}