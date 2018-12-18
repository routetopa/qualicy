/*
** This file is part of JSDataChecker.
**
** JSDataChecker is free software: you can redistribute it and/or modify
** it under the terms of the GNU General Public License as published by
** the Free Software Foundation, either version 3 of the License, or
** (at your option) any later version.
**
** JSDataChecker is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
** GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License
** along with JSDataChecker. If not, see <http://www.gnu.org/licenses/>.
**
** Copyright (C) 2018 JSDataChecker - Donato Pirozzi (donatopirozzi@gmail.com)
** Distributed under the GNU GPL v3. For full terms see the file LICENSE.
** License: http://www.gnu.org/licenses/gpl.html GPL version 3 or higher
    **
** ----------------------------------------------------------------------------------
**
** A basic configuration for the privacy module.
**/
import '../node_modules/fast-levenshtein/levenshtein.js';
//import '../node_modules/file-system/file-system.js';

const PRDATATYPES = {
    DT_UNKNOWN: { name: "UNKNOWN" },
    DT_EMAIL:   { name: "EMAIL" },
    DT_CF:      { name: "CF" },
    DT_ZIPCODE : { name: "ZIPCODE"},
    DT_MOBILEPHONE : { name: "MOBILE_PHONE"},
    DT_PHONE : { name: "PHONE"},
    DT_ADDRESS : {name: "ADDRESS"},
    DT_IBAN : {name:"IBAN"},

    DT_SURNAME : {name:"SURNAME"},
    DT_NAME : {name:"NAME"}
};

const PRDATATYPES_LANGS = {
    "key_descr_email": {
        "EN": "According to the GDPR the e-mail is a sensitive data."
    }
};

//regular expressions
PRDATATYPES.DT_CF.evaluate = function (value) {
    var regex = /^(?:(?:[B-DF-HJ-NP-TV-Z]|[AEIOU])[AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i;

    value = value.toLowerCase();
    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_CF, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_EMAIL.evaluate = function (value) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    value = value.toLowerCase();
    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_EMAIL, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_ZIPCODE.evaluate = function(value) {
    var regex = /^([0-9]{5})$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ZIPCODE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_MOBILEPHONE.evaluate = function(value) {
    var regex = /^(\((([+]|00)39)\)|(([+]|00)39))?((313)|(32[034789])|(33[013456789])|(34[02456789])|(36[0368])|(37[037])|(38[0389])|(39[0123]))([\d]{7})$/;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_MOBILEPHONE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_PHONE.evaluate = function(value) {
    var regex = /^(\((([+]|00)39)\)|(([+]|00)39))?0([\d]{11}|[\d]{10}|[\d]{9}|[\d]{8})$/;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_PHONE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_ADDRESS.evaluate = function (value) {
    var regex = /^(via|viale|vico|v[.]|corso|c[.]so|piazza|piazzetta|p[.]|p[.]zza)\s([a-z]+\s?)+[,°]?\d*/i;

    value = value.toLowerCase();

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ADDRESS, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_IBAN.evaluate = function (value) {
    var regex = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/i;

    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_IBAN, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_UNKNOWN.evaluate = function (value) {
    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

//dictionaries
const most_popular_italian_surnames = {
    "Aiello":"",
    "Amato":"",
    "Antonini":"",
    "Arena":"",
    "Bacci":"",
    "Baldi":"",
    "Barberis":"",
    "Barbero":"",
    "Barbieri":"",
    "Bartolini":"",
    "Basso":"",
    "Bellucci":"",
    "Beltrame":"",
    "Benedetti":"",
    "Beretta":"",
    "Bernardi":"",
    "Berti":"",
    "Bianchi":"",
    "Bianco":"",
    "Bionaz":"",
    "Blancv":"",
    "Bordet":"",
    "Borghi":"",
    "Bortolin":"",
    "Bortolotti":"",
    "Brambilla":"",
    "Bruno":"",
    "Bruzzone":"",
    "Calcagno":"",
    "Canepa":"",
    "Capasso":"",
    "Capriotti":"",
    "Caputo":"",
    "Cardinali":"",
    "Carlucci":"",
    "Carta":"",
    "Caruso":"",
    "Casadei":"",
    "Castellani":"",
    "Catalano":"",
    "Cattaneo":"",
    "Ceccarelli":"",
    "Cerise":"",
    "Cerutti":"",
    "Chenal":"",
    "Cocco":"",
    "Colangelo":"",
    "Colombo":"",
    "Colussi":"",
    "Conte":"",
    "Conti":"",
    "Coppola":"",
    "Corazza":"",
    "Cossu":"",
    "Costa":"",
    "Costantini":"",
    "Coviello":"",
    "Cretier":"",
    "D`Alessandro":"",
    "D`Amico":"",
    "D`Angelo":"",
    "De Angelis":"",
    "De Luca":"",
    "De Rosa":"",
    "De Santis":"",
    "De Simone":"",
    "Degano":"",
    "Deiana":"",
    "Delfino":"",
    "Di Carlo":"",
    "Di Felice":"",
    "Di Francesco":"",
    "Di Giacomo":"",
    "Di Giovanni":"",
    "Di Iorio":"",
    "Di Marco":"",
    "Di Matteo":"",
    "Di Paolo":"",
    "Di Pietro":"",
    "Di Stefano":"",
    "Diemoz":"",
    "Donati":"",
    "Egger":"",
    "Esposito":"",
    "Fabbri":"",
    "Fabbro":"",
    "Fabris":"",
    "Fadda":"",
    "Favre":"",
    "Ferrando":"",
    "Ferrara":"",
    "Ferrari":"",
    "Ferrario":"",
    "Ferraris":"",
    "Ferraro":"",
    "Ferrero":"",
    "Ferretti":"",
    "Ferri":"",
    "Fiore":"",
    "Fiorucci":"",
    "Floris":"",
    "Fumagalli":"",
    "Furlan":"",
    "Fusco":"",
    "Galli":"",
    "Gallo":"",
    "Gamper":"",
    "Gargiulo":"",
    "Gasser":"",
    "Gatti":"",
    "Gentile":"",
    "Giannini":"",
    "Giordano":"",
    "Giovannini":"",
    "Giuliani":"",
    "Giusti":"",
    "Gori":"",
    "Grange":"",
    "Grasso":"",
    "Greco":"",
    "Grieco":"",
    "Grosso":"",
    "Gruber":"",
    "Hofer":"",
    "Iezzi":"",
    "Innocenti":"",
    "Izzo":"",
    "Joly":"",
    "Kofler":"",
    "La Rosa":"",
    "Lai":"",
    "Landi":"",
    "Leone":"",
    "Locatelli":"",
    "Loi":"",
    "Lombardi":"",
    "Lombardo":"",
    "Longo":"",
    "Lorusso":"",
    "Magnani":"",
    "Mair":"",
    "Manca":"",
    "Mancini":"",
    "Mancuso":"",
    "Mantovani":"",
    "Marchetti":"",
    "Marconi":"",
    "Mariani":"",
    "Marinelli":"",
    "Marini":"",
    "Marino":"",
    "Mariotti":"",
    "Marras":"",
    "Martin":"",
    "Martinelli":"",
    "Martini":"",
    "Martino":"",
    "Mauro":"",
    "Mecca":"",
    "Melis":"",
    "Meloni":"",
    "Messina":"",
    "Mignogna":"",
    "Minelli":"",
    "Moffa":"",
    "Montanari":"",
    "Montemurro":"",
    "Monti":"",
    "Morabito":"",
    "Moretti":"",
    "Moro":"",
    "Moser":"",
    "Mura":"",
    "Murgia":"",
    "Musso":"",
    "Napolitano":"",
    "Negro":"",
    "Neri":"",
    "Oliveri":"",
    "Ottonello":"",
    "Pace":"",
    "Pagani":"",
    "Palladino":"",
    "Palmisano":"",
    "Palumbo":"",
    "Pappalardo":"",
    "Parisi":"",
    "Parodi":"",
    "Passeri":"",
    "Pastorino":"",
    "Peaquin":"",
    "Pedrotti":"",
    "Pellegrini":"",
    "Pellissier":"",
    "Perri":"",
    "Perron":"",
    "Perrone":"",
    "Pession":"",
    "Pichler":"",
    "Pinna":"",
    "Piras":"",
    "Pircher":"",
    "Poggi":"",
    "Porcu":"",
    "Pozzi":"",
    "Proietti":"",
    "Pugliese":"",
    "Puglisi":"",
    "Repetto":"",
    "Ricci":"",
    "Righi":"",
    "Rinaldi":"",
    "Riva":"",
    "Rizzi":"",
    "Rizzo":"",
    "Romagnoli":"",
    "Romaniello":"",
    "Romano":"",
    "Romeo":"",
    "Rosati":"",
    "Rosset":"",
    "Rossi":"",
    "Rosso":"",
    "Rota":"",
    "Ruggiero":"",
    "Russo":"",
    "Sabatini":"",
    "Sabbatini":"",
    "Sabia":"",
    "Sala":"",
    "Salvatore":"",
    "Sanna":"",
    "Santarossa":"",
    "Santarsiero":"",
    "Santini":"",
    "Santoro":"",
    "Sartori":"",
    "Semeraro":"",
    "Serra":"",
    "Simone":"",
    "Sorrentino":"",
    "Spina":"",
    "Talarico":"",
    "Telesca":"",
    "Testa":"",
    "Tomasi":"",
    "Traverso":"",
    "Trevisan":"",
    "Tripodi":"",
    "Usai":"",
    "Valentini":"",
    "Vallet":"",
    "Venditti":"",
    "Venier":"",
    "Venturi":"",
    "Vierin":"",
    "Villa":"",
    "Visintin":"",
    "Vitale":"",
    "Vitali":"",
    "Vuillermoz":"",
    "Zeni":"",
    "Zuliani":"",
    "Zunino":"",
};
//const MAX_DISTANCE_SURNAME = 2;

/*
const most_popular_italian_names = [
    "Francesco",
    "Leonardo",
    "Alessandro",
    "Lorenzo",
    "Mattia",
    "Andrea",
    "Gabriele",
    "Riccardo",
    "Matteo",
    "Tommaso",
    "Edoardo",
    "Federico",
    "Giuseppe",
    "Antonio",
    "Diego",
    "Davide",
    "Christian",
    "Nicolò",
    "Giovanni",
    "Samuele",
    "Sofia",
    "Giulia",
    "Aurora",
    "Alice",
    "Ginevra",
    "Emma",
    "Giorgia",
    "Greta",
    "Martina",
    "Beatrice",
    "Anna",
    "Chiara",
    "Sara",
    "Nicole",
    "Ludovica",
    "Gaia",
    "Matilde",
    "Vittoria",
    "Noemi",
    "Francesca",
    "Mario",
    "Luigi",
    "Angelo",
    "Vincenzo",
    "Pietro",
    "Salvatore",
    "Carlo",
    "Domenico",
    "Maria",
    "Giuseppina",
    "Rosa",
    "Angela",
    "Teresa",
    "Lucia",
    "Carmela",
    "Caterina",
    "Antonietta",
    "Anna Maria",
    "Bruno",
    "Paolo",
    "Michele",
    "Giorgio",
    "Aldo",
    "Sergio",
    "Luciano",
    "Paolo",
    "Franco",
    "Franca",
    "Rita",
    "Margherita",
    "Elena",
    "Carla",
    "Concetta"

];
*/

var most_popular_italian_names = {};

/*
function(){
    var txtFile = "";
    var file = new File(["names"], txtFile);

    var names_list = [];

    var reader = new FileReader();
    debugger
    reader.onload = function(){
        var text = reader.result;

        var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks

        lines.forEach(function(line) {
            names_list.push(line);
        });

        return names_list;
    };
    reader.readAsText(file);
};
*/

PRDATATYPES.DT_SURNAME.evaluate = function (value) {

    var MAX_ACCETTABLE_DISTANCE = value.length/2;

    //perfect match
    if (value in most_popular_italian_surnames)
        return { datatype: PRDATATYPES.DT_SURNAME, value: value };
    //debugger
    if (value in most_popular_italian_names)
        return { datatype: PRDATATYPES.DT_NAME, value: value };

    //similarity distance computed by levenshtein
    var min_distance_surname = Levenshtein.get(value, most_popular_italian_surnames[Object.keys(most_popular_italian_surnames)[0]]);
    var distance;
    for (var key in most_popular_italian_surnames){
        distance  = Levenshtein.get(value, key);
        if(distance<min_distance_surname){
            min_distance_surname = distance;
        }
    }

    var min_distance_name = Levenshtein.get(value, most_popular_italian_names[Object.keys(most_popular_italian_names)[0]]);
    for (var key in most_popular_italian_names){
        distance  = Levenshtein.get(value, key);
        if(distance<min_distance_name){
            min_distance_name = distance;
        }
    }

    if(min_distance_surname <=min_distance_name){
        if(min_distance_surname <=MAX_ACCETTABLE_DISTANCE){
            return { datatype: PRDATATYPES.DT_SURNAME, value: value };
        }
    }else{
        if(min_distance_name <=MAX_ACCETTABLE_DISTANCE){
            return { datatype: PRDATATYPES.DT_NAME, value: value };
        }
    }

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_NAME.evaluate = PRDATATYPES.DT_SURNAME.evaluate;

//////////////////////////////////////////////////////////////////////////
//// The factory class for the configuration of the privacy module.
////

export class PrivacyConfigFactory {

    constructor() {
        /*
        var text = file-system.readFileSync("namesList.txt");
        var textByLine = text.split("\n");
        textByLine.forEach(function(line) {
            most_popular_italian_names.push(line);
        });
        */
        var names = "names\n" +
            "Giulia\n" +
            "Chiara\n" +
            "Sara\n" +
            "Martina\n" +
            "Francesca\n" +
            "Silvia\n" +
            "Elisa\n" +
            "Alice\n" +
            "Federica\n" +
            "Alessia\n" +
            "Laura\n" +
            "Elena\n" +
            "Giorgia\n" +
            "Valentina\n" +
            "Eleonora\n" +
            "Anna\n" +
            "Marta\n" +
            "Claudia\n" +
            "Ilaria\n" +
            "Sofia\n" +
            "Arianna\n" +
            "Beatrice\n" +
            "Irene\n" +
            "Roberta\n" +
            "Michela\n" +
            "Gaia\n" +
            "Alessandra\n" +
            "Valeria\n" +
            "Giada\n" +
            "Simona\n" +
            "Aurora\n" +
            "Cristina\n" +
            "Veronica\n" +
            "Maria\n" +
            "Rebecca\n" +
            "Serena\n" +
            "Noemi\n" +
            "Benedetta\n" +
            "Ludovica\n" +
            "Paola\n" +
            "Lisa\n" +
            "Greta\n" +
            "Camilla\n" +
            "Elisabetta\n" +
            "Miriam\n" +
            "Caterina\n" +
            "Lucrezia\n" +
            "Letizia\n" +
            "Margherita\n" +
            "Jessica\n" +
            "Carlotta\n" +
            "Annalisa\n" +
            "Daniela\n" +
            "Lucia\n" +
            "Barbara\n" +
            "Linda\n" +
            "Ginevra\n" +
            "Cecilia\n" +
            "Giovanna\n" +
            "Mary\n" +
            "Angela\n" +
            "Sabrina\n" +
            "Gloria\n" +
            "Vanessa\n" +
            "Monica\n" +
            "Sarah\n" +
            "Emma\n" +
            "Matilde\n" +
            "Viola\n" +
            "Diana\n" +
            "Nicole\n" +
            "Rachele\n" +
            "Marika\n" +
            "Emanuela\n" +
            "Stefania\n" +
            "Erika\n" +
            "Debora\n" +
            "Gabriella\n" +
            "Antonella\n" +
            "Angelica\n" +
            "Rosa\n" +
            "Luisa\n" +
            "Giusy\n" +
            "Teresa\n" +
            "Ilenia\n" +
            "Isabella\n" +
            "Bianca\n" +
            "Adele\n" +
            "Manuela\n" +
            "Julia\n" +
            "Samantha\n" +
            "Marina\n" +
            "Sonia\n" +
            "Marzia\n" +
            "Melissa\n" +
            "Nadia\n" +
            "Erica\n" +
            "Gioia\n" +
            "Anita\n" +
            "Eva\n" +
            "Andrea\n" +
            "Marco\n" +
            "Francesco\n" +
            "Luca\n" +
            "Matteo\n" +
            "Alessandro\n" +
            "Davide\n" +
            "Federico\n" +
            "Lorenzo\n" +
            "Stefano\n" +
            "Giuseppe\n" +
            "Riccardo\n" +
            "Daniele\n" +
            "Simone\n" +
            "Gabriele\n" +
            "Antonio\n" +
            "Mattia\n" +
            "Christian\n" +
            "Alberto\n" +
            "Fabio\n" +
            "Emanuele\n" +
            "Giovanni\n" +
            "Roberto\n" +
            "Filippo\n" +
            "Michele\n" +
            "Edoardo\n" +
            "Nicola\n" +
            "Alex\n" +
            "Giorgio\n" +
            "Alessio\n" +
            "Claudio\n" +
            "Raffaele\n" +
            "Giacomo\n" +
            "Leonardo\n" +
            "Domenico\n" +
            "Nicolò\n" +
            "Salvatore\n" +
            "Gianluca\n" +
            "Vincenzo\n" +
            "Luigi\n" +
            "Mario\n" +
            "Carlo\n" +
            "Pietro\n" +
            "Michael\n" +
            "Cristian\n" +
            "Samuele\n" +
            "Giulio\n" +
            "Mauro\n" +
            "Nicholas\n" +
            "Tommaso\n" +
            "Paolo\n" +
            "Ivan\n" +
            "Leo\n" +
            "Mirko\n" +
            "Vito\n" +
            "Dario\n" +
            "Manuel\n" +
            "Enrico\n" +
            "Thomas\n" +
            "Kevin\n" +
            "Cyril\n" +
            "Angelo\n" +
            "Jacopo\n" +
            "Daniel\n" +
            "Vittorio\n" +
            "Piero\n" +
            "Elia\n" +
            "Rosario\n" +
            "Carmine\n" +
            "Samuel\n" +
            "Guido\n" +
            "Fabrizio\n" +
            "Flavio\n" +
            "Diego\n" +
            "Gianmarco\n" +
            "Gabriel\n" +
            "Max\n" +
            "Emiliano\n" +
            "Ale\n" +
            "Simon\n" +
            "Maurizio\n" +
            "Elias\n" +
            "Tiziano\n" +
            "Valerio\n" +
            "Mike\n" +
            "Pier\n" +
            "Damiano\n" +
            "Massimo\n" +
            "Mark\n" +
            "Patrick\n" +
            "Cristiano\n" +
            "Enzo\n" +
            "Saverio\n" +
            "Tom\n" +
            "Luciano\n" +
            "Denis\n" +
            "Umberto\n" +
            "Sergio\n" +
            "Martin\n" +
            "John";

        var lines = names.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks

        lines.forEach(function(line) {
            most_popular_italian_names[line] = "";
        });

    }//EndConstructor.

    get DATATYPES() {
        return PRDATATYPES;
    }

    get types() {
        return [ PRDATATYPES.DT_EMAIL, PRDATATYPES.DT_CF, PRDATATYPES.DT_ZIPCODE, PRDATATYPES.DT_MOBILEPHONE, PRDATATYPES.DT_PHONE, PRDATATYPES.DT_ADDRESS, PRDATATYPES.DT_IBAN,
            PRDATATYPES.DT_SURNAME,
            PRDATATYPES.DT_UNKNOWN];
    }

    /**
     * Gives the translation for the
     * @param key
     * @param lang
     * @returns {*}
     */
    translate(key, lang) {
        if (PRDATATYPES_LANGS.hasOwnProperty(key))
            return langs[key][lang];
        return null;
    };

    /*
     * For the moment it does nothing...
     */
    build() {
        return null;
    };

};//EndClass.