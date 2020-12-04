// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var listen = function () {
  return setInterval(() => {
    var nowPlaying = document.getElementsByClassName("now-playing")[0];
    if (nowPlaying && nowPlaying.innerHTML) {
      chrome.storage.sync.get("spotify-disabled", function (data) {
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

var skip = function () {
  var skipButton = document.getElementsByClassName("spoticon-skip-forward-16")[0];
  skipButton.click();
}

listen();
console.log(document.title);