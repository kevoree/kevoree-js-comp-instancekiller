/**
 * Created by mleduc on 13/01/16.
 */
var kevoree = require('kevoree-library');

module.exports = function(task, callback) {
    var component = task.component;
    var kevoreeCore = component.getKevoreeCore();

    var visitor = new kevoree.modeling.api.util.ModelVisitor();

    visitor.visit = function () {
        component.log.error(arguments);
    };

    kevoreeCore.getCurrentModel().visit(visitor, true, true, false);

    callback();
};