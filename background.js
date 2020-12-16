// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ "spotify-disabled": ["Andy Williams", "Ariana Grande", "Christmas", "Tree", "Jingle", "Mistletoe", "BTS", "Dean Martin", "Navidad", "The Ronettes", "Let It Snow"] }, function () {
    console.log(`Updated spotify block list`);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'open.spotify.com' },
      })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
});


var listen = function () {
  return setInterval(() => {
    var nowPlaying = document.getElementsByClassName("now-playing")[0];
    if (nowPlaying && nowPlaying.innerHTML) {
      chrome.storage.sync.get("spotify-disabled", function (data) {
        console.log(data);
        if (!data || !data["spotify-disabled"]) {
          return;
        }

        for (let elm of data["spotify-disabled"]) {
          if (nowPlaying.innerHTML.indexOf(elm) !== -1) {
            skip();
          }
        }
      });
    }
  }, 500);
}

var stop = function () {
  if (listener) {
    clearInterval(listener);
    listener = null;
  }
}

var skip = async function () {
  var skipButton = document.getElementsByClassName("spoticon-skip-forward-16")[0];
  skipButton.click();
}

// chrome.webNavigation.onCompleted.addListener(function ({tabId}) {
//   chrome.tabs.executeScript(tabId, {
//     "file": "listen.js"
//   });
// }, { url: [{ urlMatches: 'open.spotify.com' }] });
