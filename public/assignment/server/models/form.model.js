/*jslint node: true */
"use strict";

//var mock = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose){
    var formSchema = require("./form.schema.server.js")(mongoose);

    var formModel = mongoose.model('Form', formSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    //take instance object, add to collection and return the collection
    function createForm(form){
        var deferred = q.defer();
        formModel.create(
            form, function(err, doc){
            if(err){
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //return the corresponding collection
    function findAllForms(userID){
        var deferred = q.defer();
        formModel.find(
            {
                userId: userID
            },
            function (err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
        return deferred.promise;
    }

    //take ID as an argument, find the instance object whose ID matches the given id, return the instance otherwise return null
    function findFormById(formId){
        var deferred = q.defer();
        formModel.findById(formId, function(err,doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //take ID and object instance,find object instance in collection wwith ID match, update the object instance values
    function updateForm(formId, newForm){
        var deferred = q.defer();
        formModel.findByIdAndUpdate(formId, newForm, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //accept ID, and remove based on ID
    function deleteForm(formId){
        var deferred = q.defer();
        formModel.findByIdAndRemove(formId, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //returns a single form whose title matches, null otherwise
    function findFormByTitle(formTitle){
        var deferred = q.defer();
        formModel.findOne(
            {
                title: formTitle
            },
            function(err,doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

}