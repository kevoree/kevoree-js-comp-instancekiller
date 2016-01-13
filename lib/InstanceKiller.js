/**
 * Created by mleduc on 13/01/16.
 */
var kevoree = require('kevoree-library'),
    _ = require('lodash'),
    Kotlin = require('kevoree-kotlin');



var instanceHasDictionnaryEntry = function(key, pValue, instance) {
    var dico = instance.dictionary;

    if(dico !== null) {
        var values = dico.values;
        for(var i=0; i<values.size(); i++) {
            var value = dico.values.get(i);
            if(value.name === key && value.value === pValue) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

module.exports = function(task, callback) {
    var component = task.component;
    var key = task.key;
    var value = task.value;
    var kevoreeCore = component.getKevoreeCore();

    var visitor = new kevoree.modeling.api.util.ModelVisitor();

    var collected = [];

    visitor.visit = function (modelElement) {
        if(Kotlin.isType(modelElement, kevoree.Instance) && instanceHasDictionnaryEntry(component.dictionary.getString("key"), component.dictionary.getString("value"), modelElement)) {
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
        kevoreeCore.submitScript(script, null);
    }

    callback();
};