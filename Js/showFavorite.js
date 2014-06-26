/**
* @fileoverview Controller where we can get the favorites movies
*
* @author Dennis Hernández Vargas
* @version 0.1
*/
angular.module ('searchModule',['LocalStorageModule'])
    .controller('FavoriteController', ['$scope', 'localStorageService' , function($scope, localStorageSvc){
        $scope.movies;
		
		/**
		* Get the favorites
		* @returns {objects} Favorites movies
		*/
        $scope.loadFavorites = function(){
            $scope.movies = localStorageSvc.get('favorites').movies;
        };
		
		/**
		* Delete the favorites
		* @param {Movie key) Title of movie to delete
		* @returns {objects} Favorites movies
		*/
        $scope.deleteMovie = function(movie){
			var favorites = localStorageSvc.get('favorites');
			
			for(var i = 0; i < favorites.movies.length; i++)
			{
				if(movie.id === favorites.movies[i].id)
				{
					$scope.movies.splice(i, 1);
					favorites.movies.splice(i, 1);
                    localStorageSvc.set('favorites', favorites);
					return;
				}
			}
        };
    }]);