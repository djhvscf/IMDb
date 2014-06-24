
angular.module('myMovieModule', [])
    .factory('myMovieSvc', ['$http', function($http) {

        var API_KEY = "6xbxza6dw37gt25ue9s6ttjg";
        var URL_BASE = "http://api.rottentomatoes.com/api/public/v1.0";

        return {
            fetchByTitle: fetchByTitle,
            fetchById: fetchById,
            fetchTop: fetchTop
        };

        function fetchByTitle(title, limit, callback){
            var urlRequest = URL_BASE+'/movies.json?apikey='+API_KEY+'&q='+title+'&page_limit='+limit;
            fetchData(urlRequest, callback);
        }

        function fetchById(id, callback){
            var urlRequest = URL_BASE+'/movies/'+id+'.json?apikey='+API_KEY;
            fetchData(urlRequest, callback);
        }

        function fetchTop(title, limit, callback){
            var urlRequest = URL_BASE+'/lists/dvds/top_rentals.json?apikey='+API_KEY+'&q='+title+'&page_limit='+limit;
            fetchData(urlRequest, callback);
        }

        function fetchData(urlRequest, callback){
            $http({
                method: 'JSONP',
                url: encodeURI(urlRequest+'&callback=JSON_CALLBACK')
            }).success(callback)
              .error(function(data) {
                    console.log('error in fetchData');
                });
            }
    }]);
