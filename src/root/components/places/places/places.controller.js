function PlacesController(PlacesService, AppStorageService, $state) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.state = {};

    if (ctrl.places.error) {
      ctrl.state.error = true;
    } else {
      ctrl.state.success = true;
    }

    ctrl.hasPlaces = ctrl.places.length > 0;

    ctrl.hasPageToken = AppStorageService.getLastPageToken() !== null;

  };

  ctrl.makeActivity = function(event) {
    var place = event.place,
        activity = {
          name: place.name,
          location: place.vicinity,
          id: place.place_id
        };

    AppStorageService.saveActivity(activity);
  };

  ctrl.nextPage = function() {
    var lastSearch = AppStorageService.getLastSearch();
    lastSearch.pageToken = AppStorageService.getLastPageToken();

    PlacesService.searchPlaces(lastSearch)
      .then(function(morePlaces) {
        ctrl.places = ctrl.places.concat(morePlaces);
      })
  }
}

module.exports = PlacesController;
