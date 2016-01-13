/*jslint node: true, nomen: true */

/**
 * Created by mleduc on 13/01/16.
 */
var kevoree = require('kevoree-library'),
    _ = require('lodash'),
    Kotlin = require('kevoree-kotlin');



var instanceHasDictionnaryEntry = function (key, pValue, instance) {
    "use strict";
    var dico = instance.dictionary,
        values,
        i;

    if (dico !== null) {
        values = dico.values;
        i = 0;
        for (i; i < values.size(); i += 1) {
            var value = dico.values.get(i);
            if (value.name === key && value.value === pValue) {
                return true;
            }
        }
        return false;
    }
    return false;
};

module.exports = function (task, callback) {
    "use strict";
    var component = task.component,
        kevoreeCore = component.getKevoreeCore(),
        visitor = new kevoree.modeling.api.util.ModelVisitor(),
        collected = [],
        instance,
        identifier,
        script,
        componentName,
        nodeName;

    visitor.visit = function (modelElement) {
        if (Kotlin.isType(modelElement, kevoree.Instance) && instanceHasDictionnaryEntry(component.dictionary.getString("key"), component.dictionary.getString("value"), modelElement)) {
            collected.push(modelElement);
        }
    };

    kevoreeCore.getCurrentModel().visit(visitor, true, true, false);

    if (collected.length > 0) {
        instance = _.sample(collected);
        if (Kotlin.isType(instance, kevoree.ComponentInstance)) {
            componentName = instance.name;
            nodeName = instance.eContainer().name;
            identifier = nodeName + "." + componentName;
        } else {
            identifier = instance.name;
        }
        script = "remove " + identifier;
        kevoreeCore.submitScript(script, null);
    }

    callback();
};