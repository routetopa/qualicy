import {Utils} from "../../src/utils.mjs";
import {DataChecker} from "../../src/datachecker.mjs";
import {PrivacyConfigFactory} from "../../src/PrivacyConfigFactory.mjs";
import {PrivacyReportViewBuilder} from "../../src/PrivacyReportViewBuilder.mjs";

Utils.HttpGet("../datasetsprivacy/dataset03.csv").then(runTests);

function runTests(datum) {
    var reader = new csvjson();
    var jsonDataset = reader.read(datum); //Parse the CSV Content.

    QUnit.test("Read and Parse CSV - dataset3", function (assert) {
        assert.notEqual(jsonDataset, null, "Dataset correctly read.");
        assert.equal(jsonDataset.fields.length, 8, "The dataset has the expected number of columns.");
        assert.equal(jsonDataset.records.length, 150, "The dataset has the expected number of rows.");
    });

    QUnit.test("TestPrivacyOfDataset03", function (assert) {
        //Privacy Checker.

        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const fieldKeys = jsonDataset.fields;

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys);

        let viewBuilder = new PrivacyReportViewBuilder();
        let reportView = viewBuilder.build(evaLogs);

        assert.ok(reportView.DATATYPES["ADDRESS"].warnings == 80, "Checking of addresses");
        assert.ok(reportView.DATATYPES["ZIPCODE"].warnings == 128, "Checking of ZIP codes");
        assert.ok(reportView.DATATYPES["MUNICIPALITY"].warnings == 89, "Checking of municipalities"); 
        assert.ok(reportView.DATATYPES["PROVINCE"].warnings == 105, "Checking of provinces");



    });//EndFunction.


};//EndTests.
