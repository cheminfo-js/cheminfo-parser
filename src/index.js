'use strict';

module.exports = function parse (text, options = {}) {
    var {
        autotype = false
    } = options;

    var result={
        data:{}
    };
    var lines=text.split(/[\r\n]+/);

    var data=[];
    lines.forEach(function(line) {
        var fields=line.split('\t');
        if (fields.length>1) data.push(fields);
    });
    var lines=data;

    var recordInfo=getRecordsInfo(data);
    for (var info in recordInfo) {
        if (recordInfo[info].data) {
            result.data[info]=[];
        }
    }
    result.recordInfo=recordInfo;

    var columnInfo={};
    result.columnInfo=columnInfo;
    for (var fields of lines) {
        var kind=fields[0];
        if (recordInfo[kind].data) { // a record
            result.data[kind].push(convertLine(fields, result.labels, autotype));
        } else if (kind==='label') { // extra information about a column
            result.labels=fields;
        } else { // some extra information about the column
            for (var i=1; i<result.labels.length; i++) {
                var label=result.labels[i];
                if (label) {
                    if (! columnInfo[label]) columnInfo[label]={};
                    if (fields[i]) {
                        columnInfo[label][fields[0]] = fields[i];
                    }
                }
            }
        }
    }

    result.labels=result.labels.filter(label => label)
    return result;
};

function convertLine(fields, labels, autotype) {
    var result={};
    for (var i=1; i<fields.length; i++) {
        if (labels[i]) {
            if (autotype && ! isNaN(fields[i])) {
                result[labels[i]]=parseFloat(fields[i]);
            } else {
                result[labels[i]]=fields[i];
            }

        }
    }
    return result;
}


function getRecordsInfo(lines) {
    var recordInfo={};
    lines.forEach(function(line) {
        var kind=line[0];
        if (recordInfo[kind]) {
            recordInfo[kind].numberRecords++;
            recordInfo[kind].data=true;
        } else {
            recordInfo[kind]= {
                numberRecords:1
            }
        }
    });

    if (! recordInfo.label) {
        throw new Error('One of the records must be of type "label"');
    }
    if (recordInfo.label.numberRecords>1) {
        throw new Error('Only one record may be of type "label"');
    }
    return recordInfo;
}