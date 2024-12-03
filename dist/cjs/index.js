"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Stats;
    }
});
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Stats = /*#__PURE__*/ function() {
    "use strict";
    function Stats() {
        _class_call_check(this, Stats);
        this.n = 0;
        this.min = Number.MAX_VALUE;
        this.max = -Number.MAX_VALUE;
        this.sum = 0;
        this.mean = 0;
        this.q = 0;
    }
    var _proto = Stats.prototype;
    _proto.update = function update(value) {
        var num = parseFloat(value);
        if (Number.isNaN(num)) return;
        this.n++;
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);
        this.sum += num;
        var prevMean = this.mean;
        this.mean = this.mean + (num - this.mean) / this.n;
        this.q = this.q + (num - prevMean) * (num - this.mean);
    };
    _proto.variance = function variance() {
        return this.q / this.n;
    };
    _proto.stddev = function stddev() {
        return Math.sqrt(this.q / this.n);
    };
    _proto.toJSON = function toJSON() {
        if (this.n === 0) return null;
        return {
            n: this.n,
            min: this.min,
            max: this.max,
            sum: this.sum,
            mean: this.mean,
            variance: this.variance(),
            stddev: this.stddev()
        };
    };
    return Stats;
}();
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }