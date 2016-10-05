'use strict';

var fs=require('fs');


var parse = require('..');

describe('test', function () {

//    var text=String(fs.readFileSync('./test/periodic-table.txt'));

    var text=String(fs.readFileSync('./test/test.txt'));

    var result=parse(text, {
        autotype: true
    });

    var index=createIndex(result.data.atom);
    var query='Li';
    var string = search(index, result.columnInfo, query);
    console.log(string);

    it('should be tested', function () {
        (42).should.equal(42);
    });
});

function createIndex(data) {
    var result={};
    data.forEach(function(data) {
        result[data.symbol.toLowerCase()]=data;
    });
    return result;
}

function search(data, info, query) {
    var element=data[query.toLowerCase()];
    if (! element) {
        return 'Element '+query+" not found';"
    }
    var result=[];
    result.push('<h1>'+element.symbol+' : '+element.name+'</h1>');
    result.push('<b>Element number: </b>'+element.Z+'<br>');
    result.push('<b>French name: </b>'+element.nameFR+'<br>');
    result.push('<b>Atomic weight: </b>'+element.atomicWeight+' '+info.atomicWeight.unit+'<br>');
    result.push('<b>Melting point: </b>'+element.melting+' '+info.melting.unit+'<br>');
    result.push('<b>Boiling point: </b>'+element.boiling+' '+info.boiling.unit+'<br>');
    result.push('<b>Electronegativity: </b>'+element.electronegativity+'<br>');
    result.push('<b>First ionisation energy: </b>'+element.firstIonisation+' '+info.firstIonisation.unit+'<br>');
    result.push('<b>Electronic configuration: </b>'+element.electronConfiguration+'<br>');
    result.push('<b>First ionisation energy: </b>'+element.firstIonisation+' '+info.firstIonisation.unit+'<br>');
    return result.join('\r\n');
}