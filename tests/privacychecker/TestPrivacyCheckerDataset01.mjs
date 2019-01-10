import {Utils} from "../../src/utils.mjs";
import {DataChecker} from "../../src/datachecker.mjs";
import {PrivacyConfigFactory} from "../../src/PrivacyConfigFactory.mjs";
import {PrivacyReportViewBuilder} from "../../src/PrivacyReportViewBuilder.mjs";

Utils.HttpGet("../datasetsprivacy/dataset01.csv").then(runTests);

function runTests(datum) {
    var reader = new csvjson();
    var jsonDataset = reader.read(datum); //Parse the CSV Content.

    QUnit.test("Read and Parse CSV", function (assert) {
        assert.notEqual(jsonDataset, null, "Dataset correctly read.");
        assert.equal(jsonDataset.fields.length, 14, "The dataset has the expected number of columns.");
        assert.equal(jsonDataset.records.length, 57, "The dataset has the expected number of rows.");
    });

    QUnit.test("TestPrivacyOfDataset01", function (assert) {
        //Privacy Checker.
        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const records = jsonDataset.records;
        const fieldKeys = jsonDataset.fields;

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys);

        let viewBuilder = new PrivacyReportViewBuilder();
        let reportView = viewBuilder.build(evaLogs);
        debugger
        assert.ok(reportView.DATATYPES["EMAIL"].warnings == 145, "Checking of emails");
        assert.ok(reportView.DATATYPES["ZIPCODE"].warnings == 57, "Checking of ZIP codes");
        assert.ok(reportView.DATATYPES["MOBILE_PHONE"].warnings == 45, "Checking of mobile phones");
        //assert.ok(reportView.DATATYPES["PHONE"].warnings == 16, "Checking of phone numbers");
        assert.ok(reportView.DATATYPES["ADDRESS"].warnings == 56, "Checking of addresses");
        //assert.ok(reportView.DATATYPES["SURNAME"].warnings < 57, "Checking of surnames"); //max_valuae = # of changes; max_value=1->10 surnames, max_value=2->90
        assert.ok(reportView.DATATYPES["PROVINCE"].warnings == 70, "Checking of provinces");
        assert.ok(reportView.DATATYPES["MUNICIPALITY"].warnings == 41, "Checking of municipalities"); //also one surname

        var surnames = [];
        var names = [];
        var other = [];
        for (var index in evaLogs){
            var elem = evaLogs[index];
            if(elem.datatype.name=="SURNAME")
                surnames.push(elem);
            else if(elem.datatype.name=="NAME")
                names.push(elem);
            else if(elem.datatype.name=="MUNICIPALITY")
                other.push(elem);
        }
        console.log("surnames : " + reportView.DATATYPES["SURNAME"].warnings);
        console.log(surnames);
        console.log("names : " + reportView.DATATYPES["NAME"].warnings);
        console.log(names);
        console.log(other);
    });//EndFunction.

    QUnit.test("Test Report View Group by Row", function(assert) {
        //Privacy Checker.
        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const records = jsonDataset.records;
        const fieldKeys = jsonDataset.fields;

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys);

        let viewBuilder = new PrivacyReportViewBuilder();
        let reportView = viewBuilder.build(evaLogs);

        assert.ok("Indirizzo", reportView.DATASET[0][4].key, "Check the grouping.");
    });

    QUnit.test("Test Privacy Annotate dataset", function (assert) {
        //Checking phase.
        let prConfigFactory = new PrivacyConfigFactory();
        let datachecker = new DataChecker(prConfigFactory);

        const records = jsonDataset.records;
        const fieldKeys = jsonDataset.fields;

        let evaLogs = datachecker.evaluate(jsonDataset.records, fieldKeys, { annotateInputDataset: true });

        assert.ok(records[0].hasOwnProperty("__qualicy"), "The first cell has signalled with a privacy issue");
        assert.ok(true, "Tutto ok" );
    });//EndFunction.*/

};//EndTests.
