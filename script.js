/**
 * Created by Joao on 8/28/2015.
 */


    var app = angular.module("instaSearch", ['ngAnimate']);

    app.controller('mainCtrl', function ($scope, $http, $timeout)
    {
        $scope.searchCrit = '';
        $scope.pics = [];

        //used to show pic screen with error message when there are no results
        $scope.showError = false;

        /* Calls the Instagram API to search for recent pictures of the search term*/
$scope.submitSearch = function ()
{

    if ($scope.searchCrit == "")
    {
        $scope.resultTxt = "Enter something to search.";
        $timeout(function ()
        {
            $scope.resultTxt = "";
        }, 2000, 1);
        $scope.showError = true;
        return;

    }
    $scope.pics.length = 0;
    $scope.showError = false;

    //Moves the logo and search box up after the first search
    $(".mainLogo").animate({'margin-top': '20px'}, 1000);
    $("#resultTxt").animate({'margin-top': '225px'}, 1000);

    var crit = $scope.searchCrit.replace(' ', '');
    $scope.resultTxt = "Searching Instagram for photos tagged with \"" + crit + "\":";

    var url = "https://api.instagram.com/v1/tags/" + $scope.searchCrit.replace(' ','') + "/media/recent";
    var request = {
        client_id: "d8bee415731a440895088de783d0e409",

        callback: "JSON_CALLBACK"
    };
    $http({
        method: 'JSONP',
        url: url,
        params: request
    })
        .success(function(result) {
            //Used when words are forbidden (ex. swears)
            if (!result.data && result.meta && result.meta.error_message)
            {
                $scope.resultTxt = "Error: " + result.meta.error_message;
                $scope.showError = true;
                return;
            }
            else if (result.data.length == 0)
            {
                $scope.resultTxt = "No results found for " + crit + ".";
                $scope.showError = true;
                return;
            }

            $scope.showError = false;
            $scope.pics = result.data;
            $scope.resultTxt = "Found " + result.data.length + " matches for " + crit + "."
        })
        .error(function(er) {
            $scope.resultTxt = "Error: " + er.errMessage;
        });


}

    });

