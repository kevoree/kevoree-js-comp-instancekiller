/**
 * Created by mleduc on 13/01/16.
 */
var kevoree = require('kevoree-library'),
    _ = require('lodash'),
    Kotlin = require('kevoree-kotlin');

module.exports = function(task, callback) {
    var component = task.component;
    var kevoreeCore = component.getKevoreeCore();

    var visitor = new kevoree.modeling.api.util.ModelVisitor();

    var collected = [];

    visitor.visit = function (modelElement) {
        if(Kotlin.isType(modelElement, kevoree.Instance)) {
            collected.push(modelElement);
        }
    };

    kevoreeCore.getCurrentModel().visit(visitor, true, true, false);

    if (collected.length > 0) {
        var instance = _.sample(collected);
        var identifier;
        if (Kotlin.isType(instance, kevoree.ComponentInstance)) {
            var componentName = instance.name;
            var nodeName = instance.eContainer().name;
            identifier = nodeName + "." + componentName;
        } else {
            identifier = instance.name;
        }
        var script = "remove " + identifier;
        console.log("SCRIPT " + script)
        kevoreeCore.submitScript(script, null);
    }

    callback();
};