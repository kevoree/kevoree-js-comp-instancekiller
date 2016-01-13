/*jslint node: true, nomen: true */

var AbstractComponent = require('kevoree-entities').AbstractComponent,
    async = require('async'),
    consumer = require('./InstanceKiller');

/**
 * Kevoree component
 * @type {KevoreeInstanceKiller}
 */
var KevoreeInstanceKiller = AbstractComponent.extend({
    toString: 'KevoreeInstanceKiller',

    queue: async.queue(consumer, 1),

    dic_key: { datatype: 'string', optional: false },
    dic_value: { datatype: 'string', optional: false },

    in_trigger: function () {
        "use strict";
        this.queue.push({ "component": this });
    }
});

module.exports = KevoreeInstanceKiller;
