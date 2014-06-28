/**
* @fileoverview Controller where we can get the favorites movies
*
* @author Dennis Hernández Vargas
* @version 0.1
*/
angular.module ('searchModule',['LocalStorageModule', 'GeneralService'])
    .controller('FavoriteController', ['$scope', 'localStorageService', 'generalService' , function($scope, localStorageSvc, generalService){
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
					generalService.generateNoty(movie.title + ' was deleted', 'success');
					$scope.movies.splice(i, 1);
					favorites.movies.splice(i, 1);
                    localStorageSvc.set('favorites', favorites);
					return;
				}
			}
        };
    }]);