angular.module ('favorite',['LocalStorageModule'])
    .controller('FavoriteController', ['$scope', 'localStorageService' , function($scope, localStorageSvc){

        $scope.movies;


        $scope.loadFavorites = function(){
            $scope.movies = localStorageSvc.get('favorites').movies;
        };

    }]);




