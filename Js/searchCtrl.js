/**
* @fileoverview Main application's controller
*
* @author Dennis Hernández Vargas
* @version 0.1
*/
angular.module('searchModule', ['myMovieModule', 'LocalStorageModule'])
    .controller('SearchController', [ '$scope', 'myMovieSvc', 'localStorageService', function($scope, myMovieSvc, localStorageSvc) {
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
            myMovieSvc.searchByTitle($scope.title, limit, function(data){
                $scope.movies = data.movies;
            });
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
                window.alert(movie.title + ' added to Favorites');
            } else {
                var isFavorite = false;
                angular.forEach(favorites.movies, function(m){
                    console.log(movie.id + ' ' + m.id);
                    if(m.id == movie.id){
                        isFavorite = true;
                    }
                });

                if(isFavorite){
                    window.alert(movie.title + ' already in Favorites');
                } else {
                    favorites.movies.push(movie);
                    localStorageSvc.set('favorites', favorites);
                    window.alert(movie.title + ' added to Favorites');
                }
            }
            //console.log(JSON.stringify(localStorageSvc.get('favorites')));
        }
    }]);