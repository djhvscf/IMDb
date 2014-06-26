/**
 * Created by Dennis on 21/04/14.
 */
var app = angular.module('searchModule', ['myMovieModule', 'LocalStorageModule']);

app.config(function ($routeProvider, $provide, $httpProvider){

    $routeProvider.when('file:///C:/Users/Dennis%20Hernandez/Documents/GitHub/IMDb/Home.html', {
        templateUrl: 'file:///C:/Users/Dennis%20Hernandez/Documents/GitHub/IMDb/Home.html',
        controller: 'SearchController'
    });
});