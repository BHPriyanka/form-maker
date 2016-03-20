/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByTitle: findFormByTitle,
            findFormbyId: findFormById
        };

        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form");
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }


        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId);
        }

        function findFormByTitle(formTitle) {
            return $http.get("/api/assignment/form?" + formTitle);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/" + formId);
        }
    }
})();