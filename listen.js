// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var listener = null;

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

var start = function() {
  if (listener) {
    stop();
  }
  listener = listen();
}

var skip = function () {
  var controls = document.getElementsByClassName("player-controls__buttons")[0];
  var skipButton = controls.querySelectorAll("[title='Next']")[0];
  skipButton.click();
}

// browser.runtime.connect().onConnect.addListener(function () {
//   start();
// })

// browser.runtime.connect().onDisconnect.addListener(function () {
//   stop();
// })

start();
alert("starting");