/**
 * Created by Taimoor on 6/23/2015.
 */


var app = angular.module('myApp', ['firebase', 'ngMaterial']);


app.controller("myController", function($scope, $firebaseObject){

    var ref = new Firebase("https://taimoor.firebaseio.com/start");
    var binding = $firebaseObject(ref);
    binding.$bindTo($scope, 'start');


    $scope.facebook = function() {
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $scope.displayname = authData.facebook.displayName;



            }
        });
    };


    $scope.name = "";
    $scope.msg = "";

    $scope.call = function(){
        ref.push({
            name: $scope.name,
            msg: $scope.msg
        });
        $scope.msg = "";
    };



    ref.on("child_added", function (snapshot) {
        $scope.message.push(snapshot.val());

    });

});