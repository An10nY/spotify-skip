// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

var disabledSection = document.getElementById("disabled");
chrome.storage.sync.get("spotify-disabled", function (data) {
  console.log(data);
  if (!data || !data["spotify-disabled"]) {
    return;
  }

  for (let elm of data["spotify-disabled"]) {
    disabledSection.appendChild(createButton(elm));
  }
});

var createButton = function (content) {
  var button = document.createElement("button");
  setRandomBackground(button);

  var buttonTextArea = document.createElement("div");
  buttonTextArea.className = "disabled-text-area";
  button.appendChild(buttonTextArea);

  var buttonText = document.createElement("span");
  buttonText.className = "disabled-text";
  buttonTextArea.appendChild(buttonText);
  buttonText.appendChild(document.createTextNode(content));
  button.addEventListener("click", () => {
    removeBlockedContent(content);
    button.parentNode.removeChild(button);
  });
  return button;
}

var randomColor = (min = 0, max = 256) => min + Math.floor(Math.random() * (max - min));

var setRandomBackground = function(elm) {
  elm.style.backgroundColor = `rgb(${randomColor(0, 170)}, ${randomColor(85)}, ${randomColor(0, 170)})`;
}

var createNewButton = function () {
  var button = document.createElement("button");
  var input = document.createElement("input");
  input.type = "text";
  buttonText.className = "disabled-text";
  buttonText.appendChild(document.createTextNode(content));
  button.addEventListener("click", () => removeBlockedContent(content));
}

var removeBlockedContent = function (content) {
  chrome.storage.sync.get("spotify-disabled", function (data) {
    let index = -1;
    if (data && data["spotify-disabled"]) {
      index = data["spotify-disabled"].indexOf(content);
    }

    if (index !== -1) {
      data["spotify-disabled"].splice(index, 1);
      chrome.storage.sync.set({ "spotify-disabled": data["spotify-disabled"] }, function () {
        console.log(`Updated spotify block list to ${data["spotify-disabled"]}`);
      });
    }
  });
}

var addBlockedContent = function (content) {
  chrome.storage.sync.get("spotify-disabled", function (data) {
    let list = data ? data.concat([content]) : [content];
    chrome.storage.sync.set({ "spotify-disabled": list }, function () {
      console.log(`Updated spotify block list to ${list}`);
    });
  });
}