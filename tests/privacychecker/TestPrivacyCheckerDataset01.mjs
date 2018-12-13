import {Utils} from "../../src/utils.mjs";
import {DataChecker} from "../../src/datachecker.mjs";
import {PrivacyConfigFactory} from "../../src/PrivacyConfigFactory.mjs";
import {PrivacyReportViewBuilder} from "../../src/PrivacyReportViewBuilder.mjs";

Utils.HttpGet("../datasetsprivacy/dataset01.csv").then(runTests);

function runTests(datum) {

    QUnit.test("TestPrivacyOfDataset01", function (assert) {
        //Parse the CSV Content.
        var reader = new csvjson();
        var jsonDataset = reader.read(datum);
        assert.notEqual(jsonDataset, null, "Dataset correctly read.");
        assert.equal(jsonDataset.fields.length, 14, "The dataset has the expected number of columns.");
        assert.equal(jsonDataset.records.length, 57, "The dataset has the expected number of rows.");



        //Privacy Checker.
        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const records = jsonDataset.records;
        const fieldKeys = jsonDataset.fields;

        debugger

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys);

        let viewBuilder = new PrivacyReportViewBuilder();
        let reportView = viewBuilder.build(evaLogs);

        assert.ok(reportView.DATATYPES["EMAIL"].warnings == 145, "Checking of emails");
        assert.ok(reportView.DATATYPES["ZIPCODE"].warnings == 57, "Checking of ZIP codes");
        assert.ok(reportView.DATATYPES["MOBILE_PHONE"].warnings == 45, "Checking of mobile phones");
        assert.ok(reportView.DATATYPES["PHONE"].warnings == 16, "Checking of phone numbers");
        //to check
        assert.ok(reportView.DATATYPES["ADDRESS"].warnings == 57, "Checking of addresses");

    });//EndFunction.

};//EndTests.
