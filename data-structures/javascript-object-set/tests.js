var assert = require("assert");
var ObjectSet = require("./objectset").ObjectSet;

describe("ObjectSet", function () {

    it("should work", function () {
        var s = new ObjectSet();
        var a = {};
        var b = {"hello": "hello"};
        var c = {};
        var d = {"a": {}};

        var _assertContains = function (bool_a, bool_b, bool_c, bool_d) {
            assert.equal(s.contains(a), bool_a);
            assert.equal(s.contains(b), bool_b);
            assert.equal(s.contains(c), bool_c);
            assert.equal(s.contains(d), bool_d);
        };

        _assertContains(false, false, false, false);
        s.insert(a);
        _assertContains(true, false, false, false);
        s.insert(b);
        _assertContains(true, true, false, false);
        s.insert(c);
        _assertContains(true, true, true, false);
        s.insert(d);
        _assertContains(true, true, true, true);

        s.remove(a);
        _assertContains(false, true, true, true);
        s.remove(b);
        _assertContains(false, false, true, true);
        s.remove(c);
        _assertContains(false, false, false, true);
        s.remove(d);
        _assertContains(false, false, false, false);

    });

    it("should error on nonobjects", function () {
        var s = new ObjectSet();
        assert.throws(function () {
            s.insert("lol");
        }, Error);

        assert.throws(function () {
            s.remove(1);
        }, Error);

        assert.throws(function () {
            s.insert(null);
        }, Error);

        assert.throws(function () {
            s.insert(undefined);
        }, Error);
    });
});