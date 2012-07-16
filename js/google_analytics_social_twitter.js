(function ($) {

  $(document).ready(function() {
    // Check if an asynchronous twitter object has already been initialized
    if (window.twttr) {
      // Wait until the Twitter Asynchronous resources have loaded
      twttr.ready(function (twttr) {
        // create an object for all the events we want to track
        var actions = {
          // I dont think we want most of these events do we?
          // https://dev.twitter.com/docs/intents/events#waiting-for-asynchronous-resources
          // Most of them seem to be for an application that recreate's its own twitter interface
          // I would deem this to be outside the scope of this module for the moment
          // Please file a feature request if you really want any more of these.
          tweet: '',
          follow: '',
        };
        // Iterate through our actions
        $.each(actions, function(action, value) {
          // And assing a listener for each one
          twttr.events.bind(action, function(event) {
            /// By defualt, we track the URL the user has "Tweeted"
            var url = event.target.baseURI;
            // If the user registers a "Follow" event
            if (action == 'follow') {
              // Register what user they are following
              url = 'http://www.twitter.com/' + event.data.screen_name;
            }
            // Once it is fired - add the event to the Google analytics Queue
            _gaq.push(['_trackSocial', 'Twitter', event.type, url]);
          });
        });
      });
    }

  });

})(jQuery);
