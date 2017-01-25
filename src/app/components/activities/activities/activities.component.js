var activities = {
  bindings: {
    activities: '<'
  },
  templateUrl: 'app/components/activities/activities/activities.html',
  controller: 'ActivitiesController'
};

angular
  .module('components.activities')
  .component('activities', activities)
  .config(function ($stateProvider) {
    $stateProvider
      .state('activities', {
        parent: 'app',
        url: '/activities',
        resolve: {
          activities: function (ActivitiesService) {
            return ActivitiesService.getActivities();
          }
        },
        views: {
          'main': {
            component: 'activities'
          }
        }
      });
  });
