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


    for (var line of lines) {
        var kind=fields[0];
        if (recordInfo[info].data) { // a record
            result.data[kind].push(convertLine(line, result.info));
        } else { // extra information about a column

        }
    }

    return result;
};

function convertLine(line, info) {
    var result={};
    for (var i=1; i<line.length; i++) {
        var value=line[i];
        result[info.label[i]]=value;
    }
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