var AbstractComponent = require('kevoree-entities').AbstractComponent,
    async = require('async'),
    consumer = require('./InstanceKiller');

/**
 * Kevoree component
 * @type {KevoreeInstanceKiller}
 */
var KevoreeInstanceKiller = AbstractComponent.extend({
    toString: 'KevoreeInstanceKiller',

    queue: async.queue(consumer, concurrency=1),

    dic_key: { datatype: 'string', optional: false },
    dic_value: { datatype: 'string', optional: false },

    in_trigger: function() {
        this.queue.push({
            "component": this,
            "key": this.dic_key,
            "value": this.dic_value
        });
    }
    
});

module.exports = KevoreeInstanceKiller;
