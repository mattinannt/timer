var app = angular.module('timer',[]);

app.controller('CountDownCtrl', ['$scope', '$timeout', function($scope, $timeout) {


    //-------------- Functions --------------------

    //-------------- Basic Functions --------------

    $scope.toggleCountdown = function() {
        //stop
        if ($scope.state === 1) {
            var body = document.getElementById('body');
            body.style.background= "#ff5a5a";
            $timeout.cancel(mytimeout);
            $scope.state = 0;
        }
        //start
        else {
            $scope.updateDisplay(); //important for state=2
            if($scope.state === -1){
                $scope.buildCounter();
                if($scope.counter === 0) {
                    return;
                }

            }
            var body = document.getElementById('body');
            body.style.background= "#6dd352";
            mytimeout = $timeout($scope.onTimeout,1000);
            $scope.state = 1;

        }

    };

    $scope.reset = function() {
        $scope.counter = $scope.countdown;
        $scope.updateCountdown();
        $scope.updateDisplay();
    };


    $scope.clear = function() {
        var body= document.getElementById('body');
        body.style.background= colorDarkGrey;
        $timeout.cancel(mytimeout);
        $scope.reset();
        $scope.state = -1;
    };


    $scope.switchMode = function() {
        $scope.mode = ($scope.mode + 1) % 3;
    }

    $scope.toggleSound = function() {
        $scope.sound = !$scope.sound;
        if($scope.sound) {
            $scope.bellImage = "img/icon_bell.png";
        }
        else {
            $scope.bellImage = "img/icon_bell-inactive.png";
        }
    }



    //-------------- Behaviour --------------

    $scope.onTimeout = function(){
        $scope.counter--;
        $scope.updateCountdown();
        $scope.updateDisplay();
        if ($scope.counter === 0) {
            $scope.finish();
            return;
        }
        mytimeout = $timeout($scope.onTimeout,1000);
    }

    $scope.finish = function() {
        if ($scope.sound){
            document.getElementById('bell-sound').play();
        }
        if ($scope.mode === 0) {
            $scope.flash();
            $timeout($scope.clear,1500);
        }
        if ($scope.mode === 1) {
            $scope.flash();
            $timeout($scope.continue,1500);
        }
        if ($scope.mode === 2) {
            $scope.flash();
            $timeout($scope.askContinue,1500);
        }
    }

    $scope.askContinue = function(){
        $scope.clear();
        $scope.display = "ready?";
        $scope.state = 2;
    }

    $scope.continue = function() {
        $scope.clear();
        $scope.toggleCountdown();
    }

    //-------------- Update Countdown --------------

    $scope.incrementCountdown = function (position) {
        if (position === 0) {
            $scope.minutes10 = $scope.incrementValue($scope.minutes10);
        }
        if (position === 1) {
            $scope.minutes = $scope.incrementValue($scope.minutes);
        }
        if (position === 2) {
            $scope.seconds10 = $scope.incrementValue($scope.seconds10);
        }
        if (position === 3) {
            $scope.seconds = $scope.incrementValue($scope.seconds);
        }
        $scope.updateDisplay();
    }

    $scope.decrementCountdown = function (position) {
        if (position === 0) {
            $scope.minutes10 = $scope.decrementValue($scope.minutes10);
        }
        if (position === 1) {
            $scope.minutes = $scope.decrementValue($scope.minutes);
        }
        if (position === 2) {
            $scope.seconds10 = $scope.decrementValue($scope.seconds10);
        }
        if (position === 3) {
            $scope.seconds = $scope.decrementValue($scope.seconds);
        }
        $scope.updateDisplay();
    }

    $scope.incrementValue = function(val) {
        if (val < 9) {
            val++;
            return val;
        }
        else {
            return 0;
        }
    }

    $scope.decrementValue = function(val) {
        if (val > 0) {
            val--;
            return val;
        }
        else {
            return 9;
        }
    }

    //-------------- Display --------------

    $scope.updateDisplay = function() {
        $scope.display = $scope.minutes10.toString() + $scope.minutes.toString() + ":" + $scope.seconds10.toString() + $scope.seconds.toString();
    }


    $scope.updateCountdown = function() {
        $scope.minutes10 = Math.floor(($scope.counter / 600));
        $scope.minutes = Math.floor(($scope.counter / 60)) - ($scope.minutes10 * 10);

        $scope.seconds10 = Math.floor(($scope.counter % 60) / 10);
        $scope.seconds = Math.floor(($scope.counter % 60) - ($scope.seconds10 * 10));
    }

    $scope.buildCounter = function(){
        $scope.countdown = $scope.minutes10 * 600 + $scope.minutes * 60 + $scope.seconds10 * 10 + $scope.seconds;
        $scope.counter = $scope.countdown;
    }

    $scope.flash = function() {
        $scope.updateDisplay();
        $timeout($scope.blankDisplay,250);
        $timeout($scope.updateDisplay,500);

        $timeout($scope.blankDisplay,750);
        $timeout($scope.updateDisplay,1000);
    }

    $scope.blankDisplay = function() {
        $scope.display = "";
    }



    //---------- init ------------

    var colorDarkGrey = "#404040";


    var body= document.getElementById('body');
    body.style.background= colorDarkGrey;

    $scope.modeImages = [
        'img/icon_mode-0.png',
        'img/icon_mode-1.png',
        'img/icon_mode-2.png'
    ];

    $scope.bellImage = "img/icon_bell.png";

    $scope.mode = 0; //0: single, 1: repeat, 2: repeat-stop

    $scope.state = -1; // -1: not started, 0: paused, 1: running, 2: wait for restart

    $scope.sound = true;

    $scope.minutes10 = 0;
    $scope.minutes = 0;
    $scope.seconds10 = 0;
    $scope.seconds = 0;

    $scope.buildCounter();

    var mytimeout;


    $scope.updateDisplay();


}]);