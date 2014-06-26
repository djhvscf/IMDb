/**
* @fileoverview Movie's service 
*
* @author Dennis Hernández Vargas
* @version 0.1
*/
angular.module('myMovieModule', [])
    .factory('myMovieSvc', ['$http', function($http) {

        var API_KEY = "6xbxza6dw37gt25ue9s6ttjg";
        var URL_BASE = "http://api.rottentomatoes.com/api/public/v1.0";

        return {
            searchByTitle: searchByTitle,
            searchById: searchById,
            getTopMovies: getTopMovies
        };

        function searchByTitle(title, limit, callback){
            var urlRequest = URL_BASE+'/movies.json?apikey='+API_KEY+'&q='+title+'&page_limit='+limit;
            getMovieData(urlRequest, callback);
        }

        function searchById(id, callback){
            var urlRequest = URL_BASE+'/movies/'+id+'.json?apikey='+API_KEY;
            getMovieData(urlRequest, callback);
        }

        function getTopMovies(title, limit, callback){
            var urlRequest = URL_BASE+'/lists/dvds/top_rentals.json?apikey='+API_KEY+'&q='+title+'&page_limit='+limit;
            getMovieData(urlRequest, callback);
        }

        function getMovieData(urlRequest, callback){
            $http({
                method: 'JSONP',
                url: encodeURI(urlRequest+'&callback=JSON_CALLBACK')
            }).success(callback)
              .error(function(data) {
                    console.log('error in getMovieData');
                });
            }
    }]);