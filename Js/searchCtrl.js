/**
* @fileoverview Main application's controller
*
* @author Dennis Hernández Vargas
* @version 0.1
*/
angular.module('searchModule', ['myMovieModule', 'LocalStorageModule', 'GeneralService'])
    .controller('SearchController', [ '$scope', 'myMovieSvc', 'localStorageService', 'generalService', function($scope, myMovieSvc, localStorageSvc, generalService) {
        $scope.id = 0;
        $scope.title = '';
        $scope.limit = 0;
        $scope.movies;

		/**
		* Search movies by title
		* @param {integer} limit of movies to show
		* @returns {objects} Movies that match with the title
		*/
        $scope.search = function(limit) {
			if($scope.title != "")
			{
				myMovieSvc.searchByTitle($scope.title, limit, function(data){
					$scope.movies = data.movies;
				});
			}
			else
			{
				$scope.getTopMovies(limit);
			}
        }

		/**
		* Search the top tbe of this year
		* @param {integer} limit of movies to show
		* @returns {objects} Movies that match with the title
		*/
        $scope.getTopMovies = function(limit) {
			var date = new Date();
            myMovieSvc.getTopMovies(date.getFullYear(), limit, function(data){
                $scope.movies = data.movies;
            });
        }

		/**
		* Add favorites movies to localstorage
		* @param {Movie} Movie to add
		*/
        $scope.addFavorite = function(movie) {

            var favorites = localStorageSvc.get('favorites');
			
            if(!favorites){
                var JSON_STRUCT = {movies:[]};
                JSON_STRUCT.movies.push(movie);
                localStorageSvc.set('favorites', JSON_STRUCT);
				generalService.generateNoty(movie.title + ' added to Favorites', 'success');
            } else {
                var isFavorite = false;
                angular.forEach(favorites.movies, function(m){
                    if(m.id == movie.id){
                        isFavorite = true;
                    }
                });

                if(isFavorite){
					generalService.generateNoty(movie.title + ' already in Favorites', 'information');
                } else {
                    favorites.movies.push(movie);
                    localStorageSvc.set('favorites', favorites);
                    generalService.generateNoty(movie.title + ' added to Favorites', 'success');
                }
            }
        }
    }]);