/*jslint node: true */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $location, $scope){
        var vm = this;
        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;
        vm.selected =null;
        vm.index =0;
        $scope.sortType = 'model.user.userName';
        $scope.sortReverse  = true;

        function init(){
            vm.users = UserService.findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function add (user){
            vm.message = null;

            if (user == null) {
                vm.message = "Please fill in the required fields";
            }
            else {
                if (vm.index !== 1) {
                    UserService.createUser(user)
                        .then(function (response) {
                            vm.selected = null;
                            vm.userForms = UserService.findAllUsers()
                                .then(handleSuccess, handleError);
                            $location.url("/admin");
                        });
                }
            }
        }

        function remove(user){
            for(var i in vm.users){
                if(vm.users[i]._id == user._id){
                    UserService.deleteUser(vm.users[i]._id)
                        .then(function (response) {
                                vm.users = response.data;
                                vm.selected = null;
                                $location.url("/admin");
                            }
                        );
                    break;
                }
            }
        }

        function update(user){
            if (vm.selected) {
                if (user) {
                    var user_without_id = {
                        userName : user.userName,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emails: user.emails,
                        phones: user.phones,
                        roles: user.roles
                    };
                    UserService.updateUser(vm.selected._id, user_without_id)
                        .then(function (response) {
                            vm.selected = null;
                            vm.users = UserService.findAllUsers()
                                .then(handleSuccess, handleError);
                            $location.url("/admin");
                        }
                        );
                }
                else {
                    vm.message = "Form Name cannot be empty";
                    vm.selected = null;
                }
            }
        }

        function select(user){
            vm.index = 1;
            for(var i in vm.users){
                if(vm.users[i]._id == user._id){
                    vm.selected =  {
                        _id: vm.users[i]._id,
                        userName: vm.users[i].userName,
                        password: vm.users[i].password,
                        firstName: vm.users[i].firstName,
                        lastName:vm.users[i].lastName,
                        roles:vm.users[i].roles
                    };
                    break;
                }
            }
        }

        function handleSuccess(response){
            vm.users = response.data;
        }

        function handleError(){
            vm.error = error;
        }

    }
})();
