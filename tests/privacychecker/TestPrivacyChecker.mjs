import {DataChecker} from "../../src/datachecker.mjs";
import {PrivacyConfigFactory} from "../../src/PrivacyConfigFactory.mjs";

QUnit.test("Test Privacy Checker", function(assert) {

    let prConfigFactory = new PrivacyConfigFactory();
    let datachecker = new DataChecker(prConfigFactory);

    let value = "mariorossi@gmail.com";
    let inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_EMAIL, "Recognizing the value " + value);

    value = "PPPPLT80R10M082K";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_CF, "Recognizing the value " + value);

    value = "81024";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ZIPCODE, "Recognizing the value " + value);

    value = "3491234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "349-1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "349-1234 567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "349 1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "+39 349 1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "0039 349 1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "(+39) 349 1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "(0039) 349 1234567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "349 12 34 567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing the value " + value);
    value = "Associazione UNEC - Unione Nazionale Enti Culturali";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.notOk(inferredType.datatype === prConfigFactory.DATATYPES.DT_MOBILEPHONE, "Recognizing error with the value " + value);

	value = "089 233600";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "0825 594101";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "089 948 2802";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "02 722 2281";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "(+39)02 722 2281";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "+39-02 722 2281";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "0039 02 722 2281";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "+39-02- 722- 2281";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);
    value = "349 12 34 567";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.notOk(inferredType.datatype === prConfigFactory.DATATYPES.DT_PHONE, "Recognizing the value " + value);

	
    value = "CorSO Emanuele";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ADDRESS, "Recognizing the value " + value);
    value = "Piazza Vittorio Emanuele, 3";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ADDRESS, "Recognizing the value " + value);
    value = "PiazzETTA Italia n° 2";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ADDRESS, "Recognizing the value " + value);
    value = "Viale Emanuele n 3";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ADDRESS, "Recognizing the value " + value);
    value = "Via Roma n 424 Interno 2";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ADDRESS, "Recognizing the value " + value);

    /*
    value = "amato";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
    value = "barbiero";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
    value = "bartolucci";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
    */

    value = "salerno";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PROVINCE, "Recognizing the value " + value);
    value = "SALErno";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PROVINCE, "Recognizing the value " + value);
    value = "NA";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PROVINCE, "Recognizing the value " + value);
    value = "na";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_PROVINCE, "Recognizing the value " + value);
    value = "np";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.notOk(inferredType.datatype === prConfigFactory.DATATYPES.DT_PROVINCE, "Recognizing the value " + value);

    value = "maddaloni";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "valle di maDDAlonI";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "cava de' tirreni";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "Montecorvino pugliano";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "Ischia";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "Montecorvino pugliano ";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);
    value = "Marano di napoli ";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_MUNICIPALITY, "Recognizing the value " + value);

    //tests from https://www.istat.it/it/files/2011/03/TABELLA_DI_RACCORDO_ATECOFIN2004_ATECO2007.pdf
    value = "84.13.30";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ATECO_CODE, "Recognizing the value " + value);
    value = "09.10.00";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ATECO_CODE, "Recognizing the value " + value);
    value = "18.24.3p";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ATECO_CODE, "Recognizing the value " + value);
    value = "18.24.A";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ATECO_CODE, "Recognizing the value " + value);
    value = "18.30.1";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_ATECO_CODE, "Recognizing the value " + value);

    value = "Salerno";
    var corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Salero";
    var corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Saleron";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Salernoo";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Salervo";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);

    value = "Giuliano in Campania";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Succivo";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Giffoni Valle Piana";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Orta di Atella";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "San Martino Valle caudina";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);
    value = "Torrecuso";
    corrections = datachecker.detectTyposErrorsCorrections(value);
    console.log(corrections);

    value = "Il mio CF è PPPPLT80R10M082K";
    var contentPrivacyBreaches = datachecker.testContentPrivacyBreaches(value);
    console.log(contentPrivacyBreaches);
    value = "Sono nato in via Genova n° 47, Salerno. Il mio IBAN è IT66C010050338 2000000218020 (349 12 34 567 per dettagli)";
    contentPrivacyBreaches = datachecker.testContentPrivacyBreaches(value);
    console.log(contentPrivacyBreaches);
});