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

//NOTE: do not use import here otherwise it will be difficult to pack
//the libary in one single file to be used in SPOD.
//TODO: to be solved how to manage external libraries and dependencies in SPOD cocreation.
//

const PRDATATYPES = {
    DT_UNKNOWN: { name: "UNKNOWN" },

    DT_EMAIL:   { name: "EMAIL" },
    DT_URL : {name:"URL"},
    DT_CF:      { name: "CF" },
    DT_IBAN : {name:"IBAN"},

    DT_ZIPCODE : { name: "ZIPCODE"},

    DT_MOBILEPHONE : { name: "MOBILE_PHONE"},
    DT_PHONE : { name: "PHONE"},

    DT_LONGITUDE : {name:"LONGITUDE"},
    DT_LATITUDE : {name:"LATITUDE"},
    DT_LAT_LONG : {name:"LAT_LONG"},

    DT_ADDRESS : {name: "ADDRESS"},
    DT_PROVINCE : {name:"PROVINCE"},
    DT_MUNICIPALITY : {name:"MUNICIPALITY"},
    DT_REGION : {name:"REGION"},

    DT_ATECO_CODE : {name:"ATECO"},

    DT_SURNAME : {name:"SURNAME"},
    DT_NAME : {name:"NAME"},

    DT_RELIGION : {name:"RELIGION"},
    DT_GENDER : {name:"GENDER"},
    DT_MONEY : {name:"MONEY"},
    DT_PERCENTAGE : {name:"PERCENTAGE"},
    DT_DEGREE : {name:"DEGREE"}
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

    value = value.replace(/\s/g,'');
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
    var regex = /^(via|viale|vico|v[.]|corso|c[.]so|piazza|piazzetta|p[.]|p[.]zza|parco|largo|traversa|contrada)\s([a-z]+\s?)+(([,°]?\s?\d*)?|(s.n.c.)?)/i;

    value = value.toLowerCase();

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ADDRESS, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_LATITUDE.evaluate = function(value){
    var regex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_LATITUDE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_LONGITUDE.evaluate = function(value){
    var regex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_LONGITUDE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_IBAN.evaluate = function (value) {
    var regex = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/i;

    value = value.replace(/\s/g,'');

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_IBAN, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_URL.evaluate = function(value){
    value = value.replace(/\s/g,'');
    var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    value = value.toLowerCase();

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_URL, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_ATECO_CODE.evaluate = function(value){
    value = value.replace(/\s/g,'');
    //Regular Expression to match Italian Istat Ateco Code (formally Codice Istat) updated to Ateco-Istat 2004.
    var regex = /^\d{2}[.]{1}\d{2}[.]{1}[0-9A-Za-z]{1}[p]?$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ATECO_CODE, value: value };

    //Regular Expression to match Italian Istat Ateco Code (formally Codice Istat) updated to Ateco-Istat 2007.
    var regex = /^\d{2}[.]{1}\d{2}[.]{1}[0-9]{2}$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_ATECO_CODE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
}

PRDATATYPES.DT_MONEY.evaluate = function(value){
    value = value.replace(/\s/g,'');

    //currency symbol at the end
    var regex = /^-?((\d{1,3}(\.(\d){3})*)|\d*)(,\d{1,2})?((\u20AC)|(\$)|(£))$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_MONEY, value: value };

    //currency symbol at the beginning
    var regex = /^((\u20AC)|(\$)|(£))-?((\d{1,3}(\.(\d){3})*)|\d*)(,\d{1,2})?$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_MONEY, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_PERCENTAGE.evaluate = function(value){
    value = value.replace(/\s/g,'');

    var regex = /^(100|[0-9]{1,2}$|^[0-9]{1,2}\,[0-9]{1,3})%$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_PERCENTAGE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_DEGREE.evaluate = function(value){
    value = value.replace(/\s/g,'');

    //Celsius degree
    var regex = /^(100|[0-9]{1,2}|-[0-9]|-[1-2][0-9]|-30)°C?$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_DEGREE, value: value };

    //Fahrenheit  degree
    var regex = /^(^[0-9]{1,2}|220|2[1-2][0-9]|-[0-9]|-[1-2][0-9])°F$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_DEGREE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_LAT_LONG.evaluate = function(value){
    value = value.replace(/\s/g,'');

    var regex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

    if (regex.test(value))
        return { datatype: PRDATATYPES.DT_LAT_LONG, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_UNKNOWN.evaluate = function (value) {
    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

//dictionaries
PRDATATYPES.DT_SURNAME.evaluate = function (value) {

    //value = value.toLowerCase();
    value = value.trim();

    if (value in most_popular_italian_surnames)
        return { datatype: PRDATATYPES.DT_SURNAME, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_NAME.evaluate = function (value) {

    //value = value.toLowerCase();
    value = value.trim();

    if (value in most_popular_italian_names)
        return { datatype: PRDATATYPES.DT_NAME, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_PROVINCE.evaluate = function (value){
    value = value.replace(/\s+/g, ' ').trim();
    value = value.toLowerCase();

    if(value in province)
        return { datatype: PRDATATYPES.DT_PROVINCE, value: value };

    if(value in province_abbreviation)
        return { datatype: PRDATATYPES.DT_PROVINCE, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_MUNICIPALITY.evaluate = function (value){
    value = value.replace(/\s+/g, ' ').trim();
    value = value.toLowerCase();

    var town_list = municipality["Campania"];
    if(town_list.indexOf(value)>=0)
        return { datatype: PRDATATYPES.DT_MUNICIPALITY, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_REGION.evaluate = function (value){
    value = value.replace(/\s+/g, ' ').trim();
    value = value.toLowerCase();

    if(regions.indexOf(value)>=0)
        return { datatype: PRDATATYPES.DT_REGION, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_RELIGION.evaluate = function (value){
    value = value.toLowerCase();

    if(value in religions)
        return { datatype: PRDATATYPES.DT_RELIGION, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

PRDATATYPES.DT_GENDER.evaluate = function (value){
    value = value.toLowerCase();

    if(genders.indexOf(value)>=0)
        return { datatype: PRDATATYPES.DT_GENDER, value: value };

    return { datatype: PRDATATYPES.DT_UNKNOWN, value: value };
};

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

const province = {
    "avellino" : "Campania",
    "benevento" : "Campania",
    "caserta" : "Campania",
    "napoli" : "Campania",
    "salerno" : "Campania"
};
const province_abbreviation = {
    "av" : "Campania",
    "bn" : "Campania",
    "ce" : "Campania",
    "na" : "Campania",
    "sa" : "Campania"
};

const municipality = {
    "Campania":["acerno",
        "acerra",
        "afragola",
        "agerola",
        "agropoli",
        "aiello del sabato",
        "ailano",
        "airola",
        "albanella",
        "alfano",
        "alife",
        "altavilla irpina",
        "altavilla silentina",
        "alvignano",
        "amalfi",
        "amorosi",
        "anacapri",
        "andretta",
        "angri",
        "apice",
        "apollosa",
        "aquara",
        "aquilonia",
        "ariano irpino",
        "arienzo",
        "arpaia",
        "arpaise",
        "arzano",
        "ascea",
        "atena lucana",
        "atrani",
        "atripalda",
        "auletta",
        "avella",
        //"avellino",
        "aversa",
        "bacoli",
        "bagnoli irpino",
        "baia e latina",
        "baiano",
        "barano d'ischia",
        "baronissi",
        "baselice",
        "battipaglia",
        "bellizzi",
        "bellona",
        "bellosguardo",
        //"benevento",
        "bisaccia",
        "bonea",
        "bonito",
        "boscoreale",
        "boscotrecase",
        "bracigliano",
        "brusciano",
        "bucciano",
        "buccino",
        "buonabitacolo",
        "buonalbergo",
        "caggiano",
        "caianello",
        "caiazzo",
        "cairano",
        "caivano",
        "calabritto",
        "calitri",
        "calvanico",
        "calvi",
        "calvi risorta",
        "calvizzano",
        "camerota",
        "camigliano",
        "campagna",
        "campolattaro",
        "campoli del monte taburno",
        "campora",
        "camposano",
        "cancello ed arnone",
        "candida",
        "cannalonga",
        "capaccio paestum",
        "capodrise",
        "caposele",
        "capri",
        "capriati a volturno",
        "capriglia irpina",
        "capua",
        "carbonara di nola",
        "cardito",
        "carife",
        "carinaro",
        "carinola",
        "casagiove",
        "casal di principe",
        "casal velino",
        "casalbore",
        "casalbuono",
        "casalduni",
        "casaletto spartano",
        "casalnuovo di napoli",
        "casaluce",
        "casamarciano",
        "casamicciola terme",
        "casandrino",
        "casapesenna",
        "casapulla",
        "casavatore",
        "caselle in pittari",
        //"caserta",
        "casola di napoli",
        "casoria",
        "cassano irpino",
        "castel baronia",
        "castel campagnano",
        "castel di sasso",
        "castel morrone",
        "castel san giorgio",
        "castel san lorenzo",
        "castel volturno",
        "castelcivita",
        "castelfranci",
        "castelfranco in miscano",
        "castellabate",
        "castellammare di stabia",
        "castello del matese",
        "castello di cisterna",
        "castelnuovo cilento",
        "castelnuovo di conza",
        "castelpagano",
        "castelpoto",
        "castelvenere",
        "castelvetere in val fortore",
        "castelvetere sul calore",
        "castiglione del genovesi",
        "cautano",
        "cava de' tirreni",
        "celle di bulgheria",
        "cellole",
        "centola",
        "ceppaloni",
        "ceraso",
        "cercola",
        "cerreto sannita",
        "cervinara",
        "cervino",
        "cesa",
        "cesinali",
        "cetara",
        "chianche",
        "chiusano di san domenico",
        "cicciano",
        "cicerale",
        "cimitile",
        "ciorlano",
        "circello",
        "colle sannita",
        "colliano",
        "comiziano",
        "conca dei marini",
        "conca della campania",
        "contrada",
        "controne",
        "contursi terme",
        "conza della campania",
        "corbara",
        "corleto monforte",
        "crispano",
        "cuccaro vetere",
        "curti",
        "cusano mutri",
        "domicella",
        "dragoni",
        "dugenta",
        "durazzano",
        "eboli",
        "ercolano",
        "faicchio",
        "falciano del massico",
        "felitto",
        "fisciano",
        "flumeri",
        "foglianise",
        "foiano di val fortore",
        "fontanarosa",
        "fontegreca",
        "forchia",
        "forino",
        "forio",
        "formicola",
        "fragneto l'abate",
        "fragneto monforte",
        "francolise",
        "frasso telesino",
        "frattamaggiore",
        "frattaminore",
        "frigento",
        "frignano",
        "furore",
        "futani",
        "gallo matese",
        "galluccio",
        "gesualdo",
        "giano vetusto",
        "giffoni sei casali",
        "giffoni valle piana",
        "ginestra degli schiavoni",
        "gioi",
        "gioia sannitica",
        "giugliano in campania",
        "giungano",
        "gragnano",
        "grazzanise",
        "greci",
        "gricignano di aversa",
        "grottaminarda",
        "grottolella",
        "grumo nevano",
        "guardia lombardi",
        "guardia sanframondi",
        "ischia",
        "ispani",
        "lacco ameno",
        "lacedonia",
        "lapio",
        "laureana cilento",
        "laurino",
        "laurito",
        "lauro",
        "laviano",
        "letino",
        "lettere",
        "liberi",
        "limatola",
        "lioni",
        "liveri",
        "luogosano",
        "lusciano",
        "lustra",
        "macerata campania",
        "maddaloni",
        "magliano vetere",
        "maiori",
        "manocalzati",
        "marano di napoli",
        "marcianise",
        "mariglianella",
        "marigliano",
        "marzano appio",
        "marzano di nola",
        "massa di somma",
        "massa lubrense",
        "melito di napoli",
        "melito irpino",
        "melizzano",
        "mercato san severino",
        "mercogliano",
        "meta",
        "mignano monte lungo",
        "minori",
        "mirabella eclano",
        "moiano",
        "moio della civitella",
        "molinara",
        "mondragone",
        "montaguto",
        "montano antilia",
        "monte di procida",
        "monte san giacomo",
        "montecalvo irpino",
        "montecorice",
        "montecorvino pugliano",
        "montecorvino rovella",
        "montefalcione",
        "montefalcone di val fortore",
        "monteforte cilento",
        "monteforte irpino",
        "montefredane",
        "montefusco",
        "montella",
        "montemarano",
        "montemiletto",
        "montesano sulla marcellana",
        "montesarchio",
        "monteverde",
        "montoro",
        "morcone",
        "morigerati",
        "morra de sanctis",
        "moschiano",
        "mugnano del cardinale",
        "mugnano di napoli",
        //"napoli",
        "nocera inferiore",
        "nocera superiore",
        "nola",
        "novi velia",
        "nusco",
        "ogliastro cilento",
        "olevano sul tusciano",
        "oliveto citra",
        "omignano",
        "orria",
        "orta di atella",
        "ospedaletto d'alpinolo",
        "ottati",
        "ottaviano",
        "padula",
        "paduli",
        "pagani",
        "pago del vallo di lauro",
        "pago veiano",
        "palma campania",
        "palomonte",
        "pannarano",
        "paolisi",
        "parete",
        "parolise",
        "pastorano",
        "paternopoli",
        "paupisi",
        "pellezzano",
        "perdifumo",
        "perito",
        "pertosa",
        "pesco sannita",
        "petina",
        "petruro irpino",
        "piaggine",
        "piana di monte verna",
        "piano di sorrento",
        "piedimonte matese",
        "pietradefusi",
        "pietramelara",
        "pietraroja",
        "pietrastornina",
        "pietravairano",
        "pietrelcina",
        "pignataro maggiore",
        "pimonte",
        "pisciotta",
        "poggiomarino",
        "polla",
        "pollena trocchia",
        "pollica",
        "pomigliano d'arco",
        "pompei",
        "ponte",
        "pontecagnano faiano",
        "pontelandolfo",
        "pontelatone",
        "portici",
        "portico di caserta",
        "positano",
        "postiglione",
        "pozzuoli",
        "praiano",
        "prata di principato ultra",
        "prata sannita",
        "pratella",
        "pratola serra",
        "presenzano",
        "prignano cilento",
        "procida",
        "puglianello",
        "quadrelle",
        "qualiano",
        "quarto",
        "quindici",
        "ravello",
        "raviscanina",
        "recale",
        "reino",
        "riardo",
        "ricigliano",
        "rocca d'evandro",
        "rocca san felice",
        "roccabascerana",
        "roccadaspide",
        "roccagloriosa",
        "roccamonfina",
        "roccapiemonte",
        "roccarainola",
        "roccaromana",
        "rocchetta e croce",
        "rofrano",
        "romagnano al monte",
        "roscigno",
        "rotondi",
        "rutino",
        "ruviano",
        "sacco",
        "sala consilina",
        "salento",
        //"salerno",
        "salvitelle",
        "salza irpina",
        "san bartolomeo in galdo",
        "san cipriano d'aversa",
        "san cipriano picentino",
        "san felice a cancello",
        "san gennaro vesuviano",
        "san giorgio a cremano",
        "san giorgio del sannio",
        "san giorgio la molara",
        "san giovanni a piro",
        "san giuseppe vesuviano",
        "san gregorio magno",
        "san gregorio matese",
        "san leucio del sannio",
        "san lorenzello",
        "san lorenzo maggiore",
        "san lupo",
        "san mango piemonte",
        "san mango sul calore",
        "san marcellino",
        "san marco dei cavoti",
        "san marco evangelista",
        "san martino sannita",
        "san martino valle caudina",
        "san marzano sul sarno",
        "san mauro cilento",
        "san mauro la bruca",
        "san michele di serino",
        "san nazzaro",
        "san nicola baronia",
        "san nicola la strada",
        "san nicola manfredi",
        "san paolo bel sito",
        "san pietro al tanagro",
        "san pietro infine",
        "san potito sannitico",
        "san potito ultra",
        "san prisco",
        "san rufo",
        "san salvatore telesino",
        "san sebastiano al vesuvio",
        "san sossio baronia",
        "san tammaro",
        "san valentino torio",
        "san vitaliano",
        "santa croce del sannio",
        "santa lucia di serino",
        "santa maria a vico",
        "santa maria capua vetere",
        "santa maria la carità",
        "santa maria la fossa",
        "santa marina",
        "santa paolina",
        "sant'agata de' goti",
        "sant'agnello",
        "sant'anastasia",
        "sant'andrea di conza",
        "sant'angelo a cupolo",
        "sant'angelo a fasanella",
        "sant'angelo a scala",
        "sant'angelo all'esca",
        "sant'angelo d'alife",
        "sant'angelo dei lombardi",
        "sant'antimo",
        "sant'antonio abate",
        "sant'arcangelo trimonte",
        "sant'arpino",
        "sant'arsenio",
        "sant'egidio del monte albino",
        "santo stefano del sole",
        "santomenna",
        "sanza",
        "sapri",
        "sarno",
        "sassano",
        "sassinoro",
        "saviano",
        "savignano irpino",
        "scafati",
        "scala",
        "scampitella",
        "scisciano",
        "senerchia",
        "serino",
        "serramezzana",
        "serrara fontana",
        "serre",
        "sessa aurunca",
        "sessa cilento",
        "siano",
        "sicignano degli alburni",
        "sirignano",
        "solofra",
        "solopaca",
        "somma vesuviana",
        "sorbo serpico",
        "sorrento",
        "sparanise",
        "sperone",
        "stella cilento",
        "stio",
        "striano",
        "sturno",
        "succivo",
        "summonte",
        "taurano",
        "taurasi",
        "teano",
        "teggiano",
        "telese terme",
        "teora",
        "terzigno",
        "teverola",
        "tocco caudio",
        "tora e piccilli",
        "torchiara",
        "torella dei lombardi",
        "torraca",
        "torre annunziata",
        "torre del greco",
        "torre le nocelle",
        "torre orsaia",
        "torrecuso",
        "torrioni",
        "tortorella",
        "tramonti",
        "trecase",
        "trentinara",
        "trentola-ducenta",
        "trevico",
        "tufino",
        "tufo",
        "vairano patenora",
        "vallata",
        "valle agricola",
        "valle dell'angelo",
        "valle di maddaloni",
        "vallesaccarda",
        "vallo della lucania",
        "valva",
        "venticano",
        "vibonati",
        "vico equense",
        "vietri sul mare",
        "villa di briano",
        "villa literno",
        "villamaina",
        "villanova del battista",
        "villaricca",
        "visciano",
        "vitulano",
        "vitulazio",
        "volla",
        "volturara irpina",
        "zungoli"],
};
const regions = [
    "abruzzo",
    "basilicata",
    "calabria",
    "campania",
    "emilia romagna",
    "friuli venezia giulia",
    "Lazio",
    "liguria",
    "lombardia",
    "marche",
    "molise",
    "piemonte",
    "puglia",
    "sardegna",
    "sicilia",
    "toscana",
    "trentino alto adige",
    "umbria",
    "valle d'aosta",
    "veneto",
];

const religions = {
    "cristianità" : "",
    "islam" : "",

    "induismo" : "",
    "buddhismo" : "",
    "sikhismo" : "",
    "ebraismo" : "",
    "bahaismo" : "",
    "confucianesimo" : "",
    "giainismo" : "",
    "shintoismo" : "",
    "cristianesimo" : "",
    "taoismo" : "",
    "zoroastrismo" : "",

    "cristiana" : "",
    "islamica" : "",
    "induista" : "",
    "buddhista" : "",
    "sikista" : "",
    "ebraica" : "",
    "behaista" : "",
    "gianista" : "",
    "shitoista" : "",
    "taoista" : "",
    "zoroastrica" : "",

    "cristiano" : "",
    "islamista" : "",
    "ebreo" : "",

    "religione cristiana" : "",
    "religione islamica" : "",
    "religione buddhista" : "",
    "religione ebraica" : "",
};

const genders = ["maschio", "femmina", "uomo", "donna", "f", "m"];
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


PRDATATYPES.DT_PROVINCE.correct = function (words, value) {
    var corrections = [];

    for(var key in words){
        var current_datatype = PRDATATYPES.DT_PROVINCE.evaluate(key);
        if(current_datatype.datatype!=PRDATATYPES.DT_UNKNOWN) {
            corrections.push({
                datatype: PRDATATYPES.DT_PROVINCE,
                value: value,
                num_of_modifications: words[key],
                correction: key
            });
        }
    }
    return corrections;
};

PRDATATYPES.DT_MUNICIPALITY.correct = function (words, value) {
    var corrections = [];

    for(var key in words){
        var current_datatype = PRDATATYPES.DT_MUNICIPALITY.evaluate(key);
        if(current_datatype.datatype!=PRDATATYPES.DT_UNKNOWN) {
            corrections.push({
                datatype: PRDATATYPES.DT_MUNICIPALITY,
                value: value,
                num_of_modifications: words[key],
                correction: key
            });
        }
    }

    return corrections;
};

PRDATATYPES.DT_SURNAME.correct = function (words, value) {
    var corrections = [];

    for(var key in words){
        var current_datatype = PRDATATYPES.DT_SURNAME.evaluate(key);
        if(current_datatype.datatype!=PRDATATYPES.DT_UNKNOWN) {
            corrections.push({
                datatype: PRDATATYPES.DT_SURNAME,
                value: value,
                num_of_modifications: words[key],
                correction: key
            });
        }
    }
    return corrections;
};

PRDATATYPES.DT_NAME.correct = function (words, value) {
    var corrections = [];

    for(var key in words){
        var current_datatype = PRDATATYPES.DT_NAME.evaluate(key);
        if(current_datatype.datatype!=PRDATATYPES.DT_UNKNOWN) {
            corrections.push({
                datatype: PRDATATYPES.DT_NAME,
                value: value,
                num_of_modifications: words[key],
                correction: key
            });
        }
    }
    return corrections;
};

PRDATATYPES.DT_RELIGION.correct = function (words, value) {
    var corrections = [];

    for(var key in words){
        var current_datatype = PRDATATYPES.DT_RELIGION.evaluate(key);
        if(current_datatype.datatype!=PRDATATYPES.DT_UNKNOWN) {
            corrections.push({
                datatype: PRDATATYPES.DT_RELIGION,
                value: value,
                num_of_modifications: words[key],
                correction: key
            });
        }
    }
    return corrections;
};

function editDistance1(originalWord) {
    originalWord = originalWord.toLowerCase();
    var word = originalWord.split('');
    var results = {};
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    //Adding any one character (from the alphabet) anywhere in the word.
    for(var i = 0; i <= word.length; i++){
        for(var j = 0; j < alphabet.length; j++){
            var newWord = word.slice();
            newWord.splice(i, 0, alphabet[j]);
            newWord = newWord.join('');
            results[newWord] = 1;
        }
    }

    //Removing any one character from the word.
    if(word.length > 1){
        for(var i = 0; i < word.length; i++){
            var newWord = word.slice();
            newWord.splice(i,1);
            newWord = newWord.join('');
            results[newWord] = 1;
        }
    }

    //Transposing (switching) the order of any two adjacent characters in a word.
    if(word.length > 1){
        for(var i = 0; i < word.length - 1; i++){
            var newWord = word.slice();
            var r = newWord.splice(i,1);
            newWord.splice(i + 1, 0, r[0]);
            newWord = newWord.join('');
            results[newWord] = 1;
        }
    }

    //Substituting any character in the word with another character.
    for(var i = 0; i < word.length; i++){
        for(var j = 0; j < alphabet.length; j++){
            var newWord = word.slice();
            newWord[i] = alphabet[j];
            newWord = newWord.join('');
            results[newWord] = 1;
        }
    }
    debugger
    if(originalWord in results){
        delete results[originalWord];
    }


    return results;
}



PRDATATYPES.DT_CF.checkInText = function (value) {
    var regex = /(?:(?:[B-DF-HJ-NP-TV-Z]|[AEIOU])[AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]/ig;

    value = value.toLowerCase();
    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_CF, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_EMAIL.checkInText = function (value) {
    var regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

    value = value.toLowerCase();
    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_EMAIL, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_ZIPCODE.checkInText = function(value) {
    var regex = /([0-9]{5})/g;

    //value = value.toLowerCase();
    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_ZIPCODE, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_MOBILEPHONE.checkInText = function(value)  {
    var regex = /(\((([+]|00)39)\)|(([+]|00)39))?((313)|(32[034789])|(33[013456789])|(34[02456789])|(36[0368])|(37[037])|(38[0389])|(39[0123]))([\d]{7})/g;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    //value = value.toLowerCase();
    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_MOBILEPHONE, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_PHONE.checkInText = function(value) {
    var regex = /(\((([+]|00)39)\)|(([+]|00)39))?0([\d]{11}|[\d]{10}|[\d]{9}|[\d]{8})/g;

    value = value.replace(/-/gm, '');
    value = value.replace(/\s/g,'');

    //value = value.toLowerCase();
    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_PHONE, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_ADDRESS.checkInText = function (value) {
    var regex = /(via|viale|vico|v[.]|corso|c[.]so|piazza|piazzetta|p[.]|p[.]zza)\s([a-z]+\s?)+([,°][ ]?)?\d*/ig;

    value = value.toLowerCase();

    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_ADDRESS, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};

PRDATATYPES.DT_IBAN.checkInText = function (value) {
    var regex = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/ig;

    value = value.replace(/\s/g,'');

    var matchList = [];
    var match = regex.exec(value);
    while (match != null) {
        matchList.push({ datatype: PRDATATYPES.DT_IBAN, value: value, match:match[0]});
        match = regex.exec(value);
    }

    return matchList;
};


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
        return [PRDATATYPES.DT_EMAIL, PRDATATYPES.DT_CF, PRDATATYPES.DT_ZIPCODE, PRDATATYPES.DT_MOBILEPHONE, PRDATATYPES.DT_PHONE, PRDATATYPES.DT_ADDRESS, PRDATATYPES.DT_IBAN, PRDATATYPES.DT_URL, PRDATATYPES.DT_ATECO_CODE,
            PRDATATYPES.DT_LAT_LONG, PRDATATYPES.DT_PERCENTAGE, PRDATATYPES.DT_MONEY, PRDATATYPES.DT_DEGREE, PRDATATYPES.DT_LONGITUDE, PRDATATYPES.DT_LATITUDE,
            PRDATATYPES.DT_GENDER, PRDATATYPES.DT_RELIGION, PRDATATYPES.DT_REGION, PRDATATYPES.DT_PROVINCE, PRDATATYPES.DT_MUNICIPALITY,
            PRDATATYPES.DT_SURNAME, PRDATATYPES.DT_NAME,
            PRDATATYPES.DT_UNKNOWN];
    }

    get typosCheckingTypes() {
        return [PRDATATYPES.DT_PROVINCE, PRDATATYPES.DT_MUNICIPALITY,
            PRDATATYPES.DT_SURNAME, PRDATATYPES.DT_NAME,
            PRDATATYPES.DT_RELIGION];
    }

    get contentPrivacyBreachesTypes() {
        return [PRDATATYPES.DT_EMAIL, PRDATATYPES.DT_CF, PRDATATYPES.DT_IBAN, PRDATATYPES.DT_ZIPCODE, PRDATATYPES.DT_MOBILEPHONE, PRDATATYPES.DT_PHONE, PRDATATYPES.DT_ADDRESS];
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

    testTyposErrors(value) {
        var editDistance1Words = editDistance1(value);

        var corrections = [];
        var testCorrectionDatatypes = this.typosCheckingTypes;

        for(var index in testCorrectionDatatypes){
            corrections = corrections.concat(testCorrectionDatatypes[index].correct(editDistance1Words, value));
        }

        return corrections;
    };

    testContentPrivacyBreaches(value){
        var matchList = [];
        var contentPrivacyBreachesDatatypes = this.contentPrivacyBreachesTypes;

        for(var index in contentPrivacyBreachesDatatypes){
            matchList = matchList.concat(contentPrivacyBreachesDatatypes[index].checkInText(value));
        }

        return matchList;
    };


};//EndClass.

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

/*

PRDATATYPES.DT_SURNAME.evaluate = function (value) {

    value = value.toLowerCase();
    value = value.trim();
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
* */