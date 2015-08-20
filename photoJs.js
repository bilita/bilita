// var errorCallback = function(e) {
//             console.log('Reeeejected!', e);
//           };

//           // Not showing vendor prefixes.
//           navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
//             var video = document.querySelector('video');
//             video.src = window.URL.createObjectURL(localMediaStream);

//             // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
//             // See crbug.com/110938.
//             video.onloadedmetadata = function(e) {
//               // Ready to go. Do some stuff.
//             };
//           }, errorCallback);

// var video = document.querySelector('video');
//         var canvas = document.querySelector('canvas');
//         var ctx = canvas.getContext('2d');
//         var localMediaStream = null;

//         function snapshot() {
//           if (localMediaStream) {
//             ctx.drawImage(video, 0, 0);
//             // "image/webp" works in Chrome.
//             // Other browsers will fall back to image/png.
//               document.querySelector('img').src = canvas.toDataURL('image/webp');
//             }
//           }

//           video.addEventListener('click', snapshot, false);

//           // Not showing vendor prefixes or code that works cross-browser.
//           navigator.getUserMedia({video: true}, function(stream) {
//             video.src = window.URL.createObjectURL(stream);
//             localMediaStream = stream;
//           }, errorCallback);


//THIS IS THE JS FILE FOR THE TAKE PHOTO PAGE

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported in your browser');
}

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.querySelector('video');

if (navigator.getUserMedia) {
  navigator.getUserMedia({audio: true, video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
  }, errorCallback);
} else {
  video.src = 'somevideo.webm'; // fallback.
}

var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

navigator.getUserMedia(hdConstraints, successCallback, errorCallback);


var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 400,
      maxHeight: 100
    }
  }
};

navigator.getUserMedia(vgaConstraints, successCallback, errorCallback);

MediaStreamTrack.getSources(function(sourceInfos) {
  var audioSource = null;
  var videoSource = null;

  for (var i = 0; i != sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    if (sourceInfo.kind === 'audio') {
      console.log(sourceInfo.id, sourceInfo.label || 'microphone');

      audioSource = sourceInfo.id;
    } else if (sourceInfo.kind === 'video') {
      console.log(sourceInfo.id, sourceInfo.label || 'camera');

      videoSource = sourceInfo.id;
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }

  sourceSelected(audioSource, videoSource);
});

function sourceSelected(audioSource, videoSource) {
  var constraints = {
    audio: {
      optional: [{sourceId: audioSource}]
    },
    video: {
      optional: [{sourceId: videoSource}]
    }
  };

  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

//security
// Not showing vendor prefixes or code that works cross-browser:

function fallback(e) {
  video.src = 'fallbackvideo.webm';
}

function success(stream) {
  video.src = window.URL.createObjectURL(stream);
}

if (!navigator.getUserMedia) {
  fallback();
} else {
  navigator.getUserMedia({video: true}, success, fallback);
}