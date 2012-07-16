(function ($) {

  /**
   * Provide the summary information for the tracking settings vertical tabs.
   */
  Drupal.behaviors.trackingSettingsSummarySocial = {
    attach: function (context) {
      // Make sure this behavior is processed only if drupalSetSummary is defined.
      if (typeof jQuery.fn.drupalSetSummary == 'undefined') {
        return;
      }

      // Look for our social fieldset
      $('fieldset#edit-social', context).drupalSetSummary(function (context) {
        // And apply the same summary insertion seen in googleanalyticsadmin.js
        var fb = $('input[name="google_analytics_social_track_facebook"]:checked', context).length;
        var twitter = $('input[name="google_analytics_social_track_twitter"]:checked', context).length;
        // start our desciption var
        var description = 'Tracking ';
        /// Modify description based on the options chosen
        if (fb) {
          description += 'Facebook';
        }
        if (fb && twitter) {
          description += ' & ';
        }
        if (twitter) {
          description += 'Twitter';
        }
        return Drupal.t(description);
      });

    }
  };

})(jQuery);
