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

const PRDATATYPES = {
    DT_UNKNOWN: { name: "UNKNOWN" },
    DT_EMAIL:   { name: "EMAIL" },
    DT_CF:      { name: "CF" },
    DT_ZIPCODE : { name: "ZIPCODE"},
    DT_MOBILEPHONE : { name: "MOBILE_PHONE"},
    DT_PHONE : { name: "PHONE"},
    DT_ADDRESS : {name: "ADDRESS"},

    DT_SURNAME : {name:"SURNAME"},
    DT_NAME : {name:"NAME"}
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
    var regex = /^\((([+]|00)39)\)|(([+]|00)39)?\s?((313)|(32[034789])|(33[013456789])|(34[02456789])|(36[0368])|(37[037])|(38[0389])|(39[0123]))[\s-]?([\d]{7})$/;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_MOBILEPHONE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_PHONE.evaluate = function(value) {
    var regex = /^(\((([+]|00)39)\)|(([+]|00)39))?\s?0\d{11}|\d{10}|\d{9}|\d{8}$/;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_PHONE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_ADDRESS.evaluate = function (value) {
    var regex = /^via|viale|vico|corso|c.so|piazza|piazzetta|p.zza\s([a-z]+\s?)+[,|°]?\d*/i;

    value = value.toLowerCase();

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ADDRESS, value: value };

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

PRDATATYPES.DT_SURNAME.evaluate = function (value) {

    //perfect match
    if (value in most_popular_italian_surnames)
        return { datatype: PRDATATYPES.DT_SURNAME, value: value };

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

    var min_distance_name = Levenshtein.get(value, most_popular_italian_names[0]);
    for (var key in most_popular_italian_names){
        distance  = Levenshtein.get(value, key);
        if(distance<min_distance_name){
            min_distance_name = distance;
        }
    }

    if(min_distance_surname <=min_distance_name){
        if(min_distance_surname <=(value.length/2)){
            return { datatype: PRDATATYPES.DT_SURNAME, value: value };
        }
    }else{
        if(min_distance_name <=(value.length/2)){
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

    constructor() { }//EndConstructor.

    get DATATYPES() {
        return PRDATATYPES;
    }

    get types() {
        return [ PRDATATYPES.DT_EMAIL, PRDATATYPES.DT_CF, PRDATATYPES.DT_ZIPCODE, PRDATATYPES.DT_MOBILEPHONE, PRDATATYPES.DT_PHONE, PRDATATYPES.DT_ADDRESS,
            PRDATATYPES.DT_SURNAME,
            PRDATATYPES.DT_UNKNOWN];
    }

    /*
     * For the moment it does nothing...
     */
    build() {
        return null;
    };

};//EndClass.