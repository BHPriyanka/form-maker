(function() {
    angular
        .module("NetNewsApp")
        .controller("TravelController", travelController);

    function travelController($location, $routeParams, TravelService, $rootScope) {
        var vm =this;
        vm.travel = travel;

        function init() {
            vm.location = $location;
        }

        init();

        function travel() {
            //$location.url("/travel/");
            TravelService.findTravelNews("travel")
                .then(function (response) {
                $rootScope.data = response.data;
                    console.log($rootScope.data);
                if ($rootScope.data != null) {
                    $location.url('/travel');
                }
            });
        }
    }
})();
