(function (exports) {
    "use strict";

    /**
    * Return true if the given parameter is an object, false otherwise.
    * @param {*} obj: parameter to check
    * @return {boolean} whether the given param was an object or not
    */
    var checkForObjectness = function (obj) {
        if (obj !== null && typeof(obj) === "object") {
            return true;
        }
        return false;
    };

    /**
    * Raise an error if the given param is not an object.
    * @param {*} obj the param to check
    * @throws {Error} if the given parameter is not an object.
    */
    var errorIfNotObject = function (obj) {
        if (!checkForObjectness(obj)) {
            throw new Error("Object argument in ObjectSet was not an object.");
        }
    };

    /**
    * A set contains objects. Since objects are not hashable in javascript, we
    * have to do a bit of work to store them in a set in which operations are
    * efficient. When we insert an object into the set, we add an attribute to
    * it which is different for every object that has ever been in the set. This
    * allows us to test for membership on an "is" basis rather than on a "deepEquals"
    * basis.
    */
    var ObjectSet = function () {
        this.cache = {};
        this.count = 0;
    };

    /**
    * Return true if the set contains the given object.
    * @param {object} obj: the object to check membership on
    * @return {boolean} true if the object is in the set, false otherwise
    */
    ObjectSet.prototype.contains = function (obj) {
        errorIfNotObject(obj);
        if (!obj.hasOwnProperty("__objectset_id")) {
            return false;
        } else {
            return this.cache[obj["__objectset_id"]] === true;
        }
    };

    /**
    * Insert the given object into the set. Do nothing if the object is already
    * in the set.
    * @param {object} obj: the object to insert
    */
    ObjectSet.prototype.insert = function (obj) {
        errorIfNotObject(obj);
        if (!this.contains(obj)) {
            obj["__objectset_id"] = this.count;
            this.count++;
            this.cache[obj["__objectset_id"]] = true;
        }
    };

    /**
    * Remove the given object from the set. If the given object is not in the set,
    * do nothing.
    * @param {object} obj: the object to remove
    */
    ObjectSet.prototype.remove = function (obj) {
        errorIfNotObject(obj);
        if (this.contains(obj)) {
            this.cache[obj["__objectset_id"]] = false;
        }
    };

    exports.ObjectSet = ObjectSet;
})(module.exports);
