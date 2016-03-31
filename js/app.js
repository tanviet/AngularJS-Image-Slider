(function () {
  'use strict';

  angular
    .module('image-slider', ['ngAnimate'])
    .controller('MainCtrl', [
      '$scope',
      function($scope) {
        // Init variables
        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.slides = [
          {image: 'img/image1.jpg', description: 'Image 1'},
          {image: 'img/image2.jpg', description: 'Image 2'},
          {image: 'img/image3.jpg', description: 'Image 3'},
          {image: 'img/image4.jpg', description: 'Image 4'},
          {image: 'img/image5.jpg', description: 'Image 5'}
        ];

        //////////////////

        $scope.isCurrentSlideIndex = function(index) {
          return $scope.currentIndex === index;
        };

        $scope.setCurrentSlideIndex = function(index) {
          $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
          $scope.currentIndex = index;
        };

        $scope.nextSlide = function() {
          $scope.direction = 'right';
          $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

        $scope.prevSlide = function() {
          $scope.direction = 'left';
          $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

      }])
    .animation('.slide-animation',function() {
      return {
        beforeAddClass: function (element, className, done) {
          var scope = element.scope();

          if (className == 'ng-hide') {
            var finishPoint = element.parent().width();

            if (scope.direction !== 'right') {
              finishPoint = -finishPoint;
            }

            TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done});
          } else {
            done();
          }
        },
        removeClass: function (element, className, done) {
          var scope = element.scope();

          if (className == 'ng-hide') {
            element.removeClass('ng-hide');

            var startPoint = element.parent().width();
            if (scope.direction === 'right') {
              startPoint = -startPoint;
            }

            TweenMax.fromTo(element, 0.5, {left: startPoint }, {left: 0, onComplete: done});
          } else {
            done();
          }
        }
      }
    });

})();