/*jslint node: true */
"use strict";

module.exports = function(app, userModel, fieldModel, formModel){
    app.get("/api/assignment/form/:formId/field", findFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", removeFieldByFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);

    function findFields(req, res) {
        if (req.params.formId) {
            if (req.params.fieldId) {
                var fieldID = req.params.fieldId;
                var formId = req.params.formId;
                var field = fieldModel.findFieldByFieldIdFormId(fieldId)
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }
            else {
                var formId = req.params.formId;
                var form = fieldModel.findFieldsByFormId()
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            }
        }
    }

    function removeFieldByFieldIdFormId(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var fields = fieldModel.removeFieldByFieldIdFormId(fieldId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createFieldByFormId(req, res){
        var formId = req.params.formId;
        var forms = fieldModel.createFieldByFormId(req.body)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormIdFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = fieldModel.updateFieldByFormIdFieldId(fieldId, req.body)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}