// Copyright 2011, Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @author api.anash@gmail.com (Anash P. Oommen)
 */

/**
 * @fileoverview Defines DeleteSiteLinks, a code example that shows how to
 *     delete site links from an existing campaign.
 */

goog.provide('google.ads.adwords.examples.v201008.DeleteSiteLinks');

goog.require('google.ads.adwords.AdWordsService.v201008');
goog.require('google.ads.adwords.examples.ExampleBase');
goog.require('google.ads.adwords.v201008.AdExtension');
goog.require('google.ads.adwords.v201008.CampaignAdExtension');
goog.require('google.ads.adwords.v201008.CampaignAdExtensionOperation');
goog.require('google.ads.adwords.v201008.CampaignAdExtensionSelector');
goog.require('google.ads.adwords.v201008.CampaignAdExtensionService');
goog.require('google.ads.adwords.v201008.Operator');
goog.require('google.ads.adwords.v201008.Sitelink');
goog.require('google.ads.adwords.v201008.SitelinksExtension');

/**
 * This code example shows how to delete site links from an existing
 * campaign. To add site links to an existing campaign, run AddSiteLinks.js.
 * To get existing campaigns, run GetAllCampaigns.js.
 *
 * Tags: CampaignAdExtensionService.mutate
 *
 * @extends google.ads.adwords.examples.ExampleBase
 * @constructor
 */

google.ads.adwords.examples.v201008.DeleteSiteLinks = function() {
  google.ads.adwords.examples.ExampleBase.call(this);
  /**
  * Example description.
  * @type {string}
  */
  this.description = 'This code example shows how to delete site links from ' +
      'an existing campaign. To add site links to an existing campaign, ' +
      'run AddSiteLinks.js. To get existing campaigns, run GetAllCampaigns.js.';
};
goog.inherits(google.ads.adwords.examples.v201008.DeleteSiteLinks,
    google.ads.adwords.examples.ExampleBase);

/**
 * Runs the code example.
 *
 * @param {google.ads.adwords.AdWordsUser} user AdWords user running the code
 *     example.
 * @param {function} callback the callback method to be called once this example
 *     is complete.
 */
google.ads.adwords.examples.v201008.DeleteSiteLinks.prototype.run = function(
    user, callback) {
  // Get the CampaignAdExtensionService.
  var campaignAdExtensionService = user.getService(
      google.ads.adwords.AdWordsService.v201008.CampaignAdExtensionService);

  var campaignId = this._T('INSERT_CAMPAIGN_ID_HERE');
  var siteLinkExtensionId = -1;

  // Get the campaign ad extension containing sitelinks.
  var selector = new google.ads.adwords.v201008.CampaignAdExtensionSelector();
  selector.campaignIds = [campaignId];
  selector.statuses = [google.ads.adwords.v201008.CampaignAdExtensionStatus.
      ACTIVE];

  try {
    campaignAdExtensionService.get(selector,
      goog.bind(function(page) {
        if (page && page.entries) {
          for (var i = 0, len = page.entries.length; i < len; i++) {
            var extension = page.entries[i];
            if (extension.adExtension instanceof
                google.ads.adwords.v201008.SitelinksExtension) {
              siteLinkExtensionId = extension.adExtension.id;
              break;
            }
          }
        }

        if (siteLinkExtensionId == -1) {
          this.writeOutput('No sitelinks extension for the specified ' +
              'campaignId');
          callback();
          return;
        }

        var campaignAdExtension =
            new google.ads.adwords.v201008.CampaignAdExtension();
        campaignAdExtension.campaignId = campaignId;
        campaignAdExtension.adExtension =
            new google.ads.adwords.v201008.AdExtension();
        campaignAdExtension.adExtension.id = siteLinkExtensionId;

        var operation = new google.ads.adwords.v201008.
            CampaignAdExtensionOperation();
        operation.operator = google.ads.adwords.v201008.Operator.REMOVE;
        operation.operand = campaignAdExtension;

        campaignAdExtensionService.mutate([operation],
          goog.bind(function(retval) {
            if (retval && retval.value && retval.value.length > 0) {
              for (var i = 0, len = retval.value.length; i < len; i++) {
                var campaignExtension = retval.value[i];
                this.writeOutput('Deleted a campaign ad extension with id = ' +
                    '"%d" and status = "%s"', campaignExtension.adExtension.id,
                    campaignExtension.status);
                for (var j = 0, len1 = campaignExtension.adExtension.sitelinks.
                    length; j < len1; j++) {
                  var siteLink = campaignExtension.adExtension.sitelinks[j];
                  this.writeOutput('-- Site link text is "%s" and destination' +
                      ' url is %s', siteLink.displayText,
                      siteLink.destinationUrl);
                }
              }
            }
            callback();
          }, this),
          goog.bind(function(soapException) {
            this.writeOutput('Failed to delete site links. Soap Fault says' +
                ' "%s"', soapException.getInnerException().getFaultString());
            callback();
          }, this)
        );
      }, this),
      goog.bind(function(soapException) {
        this.writeOutput('Failed to delete experiment. Soap Fault says "%s"',
            soapException.getInnerException().getFaultString());
        callback();
      }, this)
    );
  } catch (ex) {
    this.writeOutput('An exception occurred while running the code example.');
    callback();
  }
};
