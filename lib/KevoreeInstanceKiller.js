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

    in_trigger: function() {
        this.queue.push({
            component: this
        });
    }
    
});

module.exports = KevoreeInstanceKiller;
