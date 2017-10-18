/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","210a456e03b0c3e5ce08a1c8505d54eb"],["bower_components/app-layout/app-drawer/app-drawer.html","1f11919cbf30e9fe26d9f7e24231345e"],["bower_components/app-layout/app-header-layout/app-header-layout.html","2e1420167894d2204cf28034d1fc8e1f"],["bower_components/app-layout/app-header/app-header.html","226a00d18d5b0ade85a885b13c64dee2"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","5a0fde1596a025d4de184b03523e770b"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","da58edccf58bc50f141297db7b0fd531"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","0c131b4889cf4d977e73d0075104d174"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","2c733f35b9ed41123f4e87b1d8c7e27c"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","66f9f958646fdbd8f917559e639bb888"],["bower_components/app-layout/app-scroll-effects/effects/material.html","ceed8c3b9de9ebc6c91b2c6ab968e167"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","96c27a6a44962350b2357d6747a50296"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","0782f5c5d290791e81b3ee35486e8232"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","49ed93d2504718dd88a6c92851b32753"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","c835ba0ab85ac68b75fb80e6131ffe79"],["bower_components/app-layout/app-toolbar/app-toolbar.html","b30542de91038939aa4caecb99b78a2e"],["bower_components/app-layout/helpers/helpers.html","3dc215d4851f7a8f721897c99b88f37b"],["bower_components/app-route/app-location.html","068993953f72db580db0fd76b3f8870e"],["bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["bower_components/app-route/app-route.html","569f5a6df5bb92ecb8fff7ab8e3d3e3c"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","f8d446c12ace2066ba89aa470f8724db"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","6ed6bb53cc75393cf767688298493002"],["bower_components/iron-behaviors/iron-button-state.html","fd0dc476f64eda2f18769de09ceea195"],["bower_components/iron-behaviors/iron-control-state.html","42d809b5c18bf0836de691c574d726b6"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","bd18e4a22f82e1e40021c31d9db88dbb"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","8324c528a6fcc669314bc9ed526733b5"],["bower_components/iron-flex-layout/iron-flex-layout.html","90ad876f27dbd5caf7117ff56e6a6a07"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","3b41c4f2e6aa6a63a3710a7e2a973321"],["bower_components/iron-icon/iron-icon.html","79588ed6416a3d52083e827aeaaff19d"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","13905cbc70066a9291523c4f55269862"],["bower_components/iron-image/iron-image.html","2184e42fb6b09b8158ea37ff7492c6ed"],["bower_components/iron-input/iron-input.html","e6bcdfd031436bac69a57e0a04cf7b2f"],["bower_components/iron-list/iron-list.html","11bad6f77bc018393eac1466d28fb979"],["bower_components/iron-location/iron-location.html","26b0313f5b06d2e17461395e288d3a67"],["bower_components/iron-location/iron-query-params.html","99e81b262ee3b87665233ddb0c53c7ce"],["bower_components/iron-media-query/iron-media-query.html","aa8226b17b962c37e0f9ed635848669c"],["bower_components/iron-meta/iron-meta.html","42f9602ab25c9af9d55d0a598da57be0"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","8ecb8426bc954e93172a1268b6ac3811"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","2c9084fdae0e25aec76b9aed7633a4d9"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2622d9b52f0ede3d4c66982d796a2ebc"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","4c5570d040721769686a1369fc426556"],["bower_components/iron-pages/iron-pages.html","7569916607de44223d61f37cf7d9ba4d"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","d8cc33be8f578f047dad0b9a0d3e7910"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","bbfe7ac4b7b23bbfbb2795731466491c"],["bower_components/iron-selector/iron-multi-selectable.html","dfab1df2a79d1d78348df2edd616ddcf"],["bower_components/iron-selector/iron-selectable.html","493718e4fdfe33a7933337dd6fdad211"],["bower_components/iron-selector/iron-selection.html","309724a9c3f6d3ba00aee26734f53937"],["bower_components/iron-selector/iron-selector.html","086dabf7107bfdccb81d6d52d263b3bc"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","aa2b48bc4396fb8962c63bdcb37fc62b"],["bower_components/neon-animation/neon-animatable-behavior.html","d4a0631c747de2833198ab1b4cb78c25"],["bower_components/neon-animation/neon-animation-runner-behavior.html","acfa1fa444095c4d90033fe10b9d0cff"],["bower_components/paper-behaviors/paper-button-behavior.html","b447c32f81f8e012a87a99d7feb1d659"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","ba95a510a6e38743569aa2a5ba289b9b"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","7660c36814473416090183b8772fbeaf"],["bower_components/paper-behaviors/paper-ripple-behavior.html","6f3be62fd98b4b2a10724122b8f14d51"],["bower_components/paper-button/paper-button.html","a87d60833df3c4a62037888cbb6007af"],["bower_components/paper-card/paper-card.html","f6c4feecb6fea0c8aa0da382e2a63f69"],["bower_components/paper-checkbox/paper-checkbox.html","d96c2c6ae920158484530165c2596c0f"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","922f66507669340f66b516ddbac8f771"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","090a7039ad7bbb6baa56e5d4525d84a8"],["bower_components/paper-dialog/paper-dialog.html","f51f61b338441a1a892d6e91349fa52f"],["bower_components/paper-icon-button/paper-icon-button.html","b72c4faf78257f38c79d3bdfec8ddd30"],["bower_components/paper-input/paper-input-addon-behavior.html","227c94b15b7938105ffce76f15b20bfd"],["bower_components/paper-input/paper-input-behavior.html","77e687c2f5eb484d41e17169b4a245d9"],["bower_components/paper-input/paper-input-char-counter.html","0461ca7ac2c8ebb43762ca35e1670a42"],["bower_components/paper-input/paper-input-container.html","eb85b45f4ea4ba0d736826516c2b84a2"],["bower_components/paper-input/paper-input-error.html","9c89655d82b98ea6927fe874628eada7"],["bower_components/paper-input/paper-input.html","6c98fbff24e6c04a97cc4f8a2a333617"],["bower_components/paper-ripple/paper-ripple.html","046d2ea4d0c94177b6cc435e3e23fc93"],["bower_components/paper-snackbar/paper-snackbar.html","dc5341fd3910333f5bd415085707293d"],["bower_components/paper-styles/color.html","d55c0d6cb5b0f35652fb2cdfdd4261d3"],["bower_components/paper-styles/default-theme.html","6582421663d278dbc96670ebdf506879"],["bower_components/paper-styles/element-styles/paper-material-styles.html","91ca935bd4d74484a00772bb0d89a2d0"],["bower_components/paper-styles/shadow.html","bcb002323edeccbcc23a34cfd0045c72"],["bower_components/paper-styles/typography.html","7d14aec40cdcacfddf5e08ebf7208c8a"],["bower_components/polymer/lib/elements/array-selector.html","e42ac1cd3820f74b763914663d6b4a91"],["bower_components/polymer/lib/elements/custom-style.html","bcc5cab8d3951123542b9382c3a1853b"],["bower_components/polymer/lib/elements/dom-bind.html","df0b1316a374f6703296efe298ffef57"],["bower_components/polymer/lib/elements/dom-if.html","d6201b5a1ae4e67de015d07ab4a051dd"],["bower_components/polymer/lib/elements/dom-module.html","33cdf0eed03206c333502d2f3827875e"],["bower_components/polymer/lib/elements/dom-repeat.html","5e7be0a7c11e64528a11c47a8e30df3e"],["bower_components/polymer/lib/legacy/class.html","7d431fe71128fc4ceee1bb6f04a4306f"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","2794fe407f423350bd2c97a556e1f418"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","3dbc42725ac74cc5617a031e5d07f0e2"],["bower_components/polymer/lib/legacy/polymer-fn.html","2f93dcf3c716394240d5555a21a5e57c"],["bower_components/polymer/lib/legacy/polymer.dom.html","4719aee461b47282f2b1d37569f2c566"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","da88e0b5e63c89a4f02ded07862898ce"],["bower_components/polymer/lib/mixins/element-mixin.html","a849bd3df5ef2d37628a9e7f16369705"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","24e10801478553aec5410d64ef7495d8"],["bower_components/polymer/lib/mixins/mutable-data.html","fa68bd266c05d038127f011dbff1a0cd"],["bower_components/polymer/lib/mixins/property-accessors.html","827bd71cd06043a8519455b7191ddbaf"],["bower_components/polymer/lib/mixins/property-effects.html","16afe78817b1514aa1ecb598a0af0541"],["bower_components/polymer/lib/mixins/template-stamp.html","339b90527d33debe5fad4d2dff14ac25"],["bower_components/polymer/lib/utils/array-splice.html","e888c571cd701473c7c0918c72962f61"],["bower_components/polymer/lib/utils/async.html","29b2820f0492de17d7afdec266c0bcac"],["bower_components/polymer/lib/utils/boot.html","41a55c1a810faf298d9124606f7e797c"],["bower_components/polymer/lib/utils/case-map.html","401de7ce577768373fe6a7150dd43a9e"],["bower_components/polymer/lib/utils/debounce.html","51bcda070179a5e38177828465fd9636"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","2a29fcabf28a0e044b383efecf707c04"],["bower_components/polymer/lib/utils/flush.html","c4b6509fbb2d38db24ac90d0c6c0e37e"],["bower_components/polymer/lib/utils/gestures.html","03e6960ef7eed8fadde6237513e27c63"],["bower_components/polymer/lib/utils/import-href.html","5dcdf73cb3b4b0aec86dfca90de8baeb"],["bower_components/polymer/lib/utils/mixin.html","da71f16c3fbb13b6129aa1ebf31fc333"],["bower_components/polymer/lib/utils/path.html","3d3235f99f643378df5f2f0ddfa26e08"],["bower_components/polymer/lib/utils/render-status.html","f04da4700fc3a9cb97fe08b6f723c996"],["bower_components/polymer/lib/utils/resolve-url.html","2e45052a300d65c6b73f4dec39f14d28"],["bower_components/polymer/lib/utils/settings.html","aa9e3b0d2884c09853fc5f0a5fe1ea39"],["bower_components/polymer/lib/utils/style-gather.html","af4c146c23f4fe80053267dd63ff8ce8"],["bower_components/polymer/lib/utils/templatize.html","92885bab60f4cda277e52e2a726b6186"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","1b943a96063cd196d4a83260e669bd43"],["bower_components/polymer/polymer.html","1e5902dc68dbc38cfcabb4acccb34691"],["bower_components/shadycss/apply-shim.html","e77c26755ebd590793dfd33295c90f4d"],["bower_components/shadycss/apply-shim.min.js","058df1a64fc2a4db3a1bceca054be299"],["bower_components/shadycss/custom-style-interface.html","5bfbeb127a043a9adba50edd885945ee"],["bower_components/shadycss/custom-style-interface.min.js","021cb6e169bd7c5ecc405c048894e043"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["bower_components/webcomponentsjs/gulpfile.js","0366da1f0f7858c9af2daa3ef7d950ea"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","bbf0111331ec4db7704caea0f6fcd3d9"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","a39a1b47d79e9775f6498d7e4a143936"],["bower_components/webcomponentsjs/webcomponents-hi.js","ff02acd4dd990583b797b3691fa032a2"],["bower_components/webcomponentsjs/webcomponents-lite.js","5515ef9284a196519c149cd12334a8b5"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","f4a43f3a971080853ecbeb06cf3f61b0"],["index.html","f90ea2989f4430c81ff49651def31884"],["manifest.json","061e643fdd8d29ac7715423809c41a28"],["src/my-app.html","11e7ae250170f14b53467fd6e26a0316"],["src/scart-404.html","04b8ccc54abaa0c532acc00d527f733e"],["src/scart-about.html","cc95b0419e7e4a112ada3ad4d7521329"],["src/scart-config-dialog.html","015662c25b3c7107a68e22b7adc8a6c0"],["src/scart-howto-card.html","9a52730239b5233347f0be6165395982"],["src/scart-icons.html","f1667a44ed8da72bb6951f3b641a7edc"],["src/scart-list.html","5176dfaaad3bc5fca021bbc94369276c"],["src/scart-overview-card.html","a1cc24cc2c13d2908c032451f78cd3e1"],["src/scart-overview.html","684f78c3e06f264bdfbf163a847e8d48"],["src/shared-styles.html","da2abd2473e25dff2f8fc6581bcf0d91"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







