var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {KevoreeInstanceKiller}
 */
var KevoreeInstanceKiller = AbstractComponent.extend({
    toString: 'KevoreeInstanceKiller',

    queue: undefined,

    in_trigger: function() {

    }
    
});

module.exports = KevoreeInstanceKiller;
