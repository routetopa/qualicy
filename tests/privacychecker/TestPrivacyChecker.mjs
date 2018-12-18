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

    value = "amato";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
    value = "barbiero";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
    value = "bartolucci";
    inferredType = datachecker.inferDataTypeOfValue(value);
    assert.ok(inferredType.datatype === prConfigFactory.DATATYPES.DT_SURNAME, "Recognizing the value " + value);
});