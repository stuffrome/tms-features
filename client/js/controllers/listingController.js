angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(function(response) {
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }, function(error) {
        console.log('Unable to save listing:', error);
      });
    };

    $scope.deleteListing = function(listing) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete(listing._id).then(function(response) {
        var location = $scope.listings.indexOf(listing);
        $scope.listings.splice(location, 1);
      }, function(error) {
        console.log('Unable to save listing:', error);
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);