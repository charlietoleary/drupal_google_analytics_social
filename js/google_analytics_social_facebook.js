(function ($) {

  $(document).ready(function() {

    // Check that the Facebook Object isnt already available
    if (!typeof FB === 'undefined') {
      // If the Facebook object is available - create our event subscription
      facebookListeners();
    }
    // If the Facebook Object doesnt yet Exist
    else {
      // Preserve any pre-assinged facebook functionality
      // We shouldn't have to do this, and an initialization event should be provided by the Facebook javascript sdk
      // I filed a bug report here: http://developers.facebook.com/bugs/222967441147347 - But facebook declined the feature request :(
      var oldFbAsyncInit = function(){};
      if (window.fbAsyncInit) {
        oldFbAsyncInit = window.fbAsyncInit;
      }

      // Use the Facebook SDK asyncInit feature to wait until the Facebook Object is Initialized
      window.fbAsyncInit = function() {
        oldFbAsyncInit();
        facebookListeners();
      };
    }

    // Create a local function that assigns our Facebook event Listeners
    var facebookListeners = function() {
      // This code is written following the guidelines by google here: https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial

      // Create an object for all actions we wish to subscribe to
      var actions = {
        like: 'edge.create',
        unlike: 'edge.remove',
        share: 'message.send'
      };

      // Loop through each action
      $.each(actions, function(action, namespace) {
        // and create a subscription to each event
        FB.Event.subscribe(namespace, function(targetUrl) {
          // When the subscription event is fired, push the event tracking code to the google analytics queue
          _gaq.push(['_trackSocial', 'Facebook', action, targetUrl]);
        });

      });

    };

  });

})(jQuery);