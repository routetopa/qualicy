import {Utils} from "../../src/utils.mjs";
import {DataChecker} from "../../src/datachecker.mjs";
import {PrivacyConfigFactory} from "../../src/PrivacyConfigFactory.mjs";
import {PrivacyReportViewBuilder} from "../../src/PrivacyReportViewBuilder.mjs";

Utils.HttpGet("../datasetsprivacy/dataset02.csv").then(runTests);

function runTests(datum) {
    var reader = new csvjson();
    var jsonDataset = reader.read(datum); //Parse the CSV Content.

    QUnit.test("Read and Parse CSV - dataset2", function (assert) {
        assert.notEqual(jsonDataset, null, "Dataset correctly read.");
        assert.equal(jsonDataset.fields.length, 21, "The dataset has the expected number of columns.");
        assert.equal(jsonDataset.records.length, 99, "The dataset has the expected number of rows.");
    });

    QUnit.test("TestPrivacyOfDataset02", function (assert) {
        //Privacy Checker.

        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const fieldKeys = jsonDataset.fields;

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys);

        let viewBuilder = new PrivacyReportViewBuilder();
        let reportView = viewBuilder.build(evaLogs);

        assert.ok(reportView.DATATYPES["ADDRESS"].warnings == 92, "Checking of addresses");
        assert.ok(reportView.DATATYPES["MUNICIPALITY"].warnings == 89, "Checking of municipalities");
        assert.ok(reportView.DATATYPES["ZIPCODE"].warnings == 198, "Checking of ZIP codes"); //also codice istat are recognised as municipalities
        assert.ok(reportView.DATATYPES["PROVINCE"].warnings == 109, "Checking of provinces");
        assert.ok(reportView.DATATYPES["REGION"].warnings == 99, "Checking of regions");
        assert.ok(reportView.DATATYPES["PHONE"].warnings == 1, "Checking of provinces"); //others are wrongly written/parsed
        assert.ok(reportView.DATATYPES["URL"].warnings == 31, "Checking of websites/URL");
        assert.ok(reportView.DATATYPES["EMAIL"].warnings == 42, "Checking of emails");

    });//EndFunction.


};//EndTests.
