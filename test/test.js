'use strict';

var fs=require('fs');


var parse = require('..');

describe('test', function () {

    var text=String(fs.readFileSync('./test/periodic-table.txt'));

    var result=parse(text);

    it('should be tested', function () {
        (42).should.equal(42);
    });
});
