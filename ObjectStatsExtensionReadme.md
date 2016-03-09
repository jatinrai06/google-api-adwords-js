# AdWords API Object Statistics Extension #

The Object Stats Extension demonstrates the use of the AdWords API
JavaScript Client Library in a Chrome extension environment.

This simple extension uses to the CampaignService, AdGroupService,
AdGroupCriterionService and AdGroupAdService services to pull and show
statistics of you account Campaigns, Ad Groups, Ads and Criteria.

## Source Code ##

The JavaScript source code is broken in three script files:
js/extension/awapiloader.js, js/extension/settingsloader.js and
js/extension/uimanager.js

_js/extension/awapiloader.js_ implements the logic to communicate with the AdWords API via the JS client library. It also implements simple caching mechanisms to avoid unnecessary round-trips to the API servers.

_js/extension/settingsloader.js_ implements the logic to retrieve and store the extension settings in Chrome local storage.

_js/extension/uimanager.js_ implements all the logic to update the extension UI.

The UI code is implemented in two files: popup.html and options.html

_popup.html_ contains all the UI widgets/templates/code used by the extension to
present your account object statistics.

_options.html_ contains all the code that gets presented in the options tab of the extension.

The manifest.json file contains the extension configuration, notice the
permissions property is asking for permissions to allow XHR post against the API end-points.

## Compilation ##

The extension build script, located in the bin folder, uses Google Closure compiler to minify the extension code. Before you can use this script you need to have Closure, which is included in zip format in the root library js folder, unpackaged.

The build script will generate a single extension.js file inside the
js/extension folder.

By default a compiled extension.js file is provided so the extension is ready to be installed.

## Installation ##

In order to install the extension you must open "Tools->Extensions", open
"Developer mode" and click "Load unpacked extension...". Then search for the folder where the extension was unpackaged (right where this README file resides).

## Where do I submit bug reports and/or feature requests? ##

Use the issue tracker [here](http://code.google.com/p/google-api-adwords-js/issues/list)

## External Dependencies: ##

[Google Closure library](http://code.google.com/closure/) - Included in the library root js folder.

## Author ##
  * api.davidtorres@gmail.com (David Torres)