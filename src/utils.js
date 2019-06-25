export function calculateRatio(width, height) {
  const ratio = ((Math.round(height) / Math.round(width)) * 100).toFixed(2);
  if (ratio > 0) {
    return ratio;
  } else {
    return false;
  }
}

export function copyToClipboard(text) {
  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function() {
        console.log('Async: Copying to clipboard was successful!');
      },
      function(err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  }
  copyTextToClipboard(text);
}

export function openFile(file, callback) {
  const img = new Image();
  img.src = file;
  img.onload = function() {
    var w = img.width;
    var h = img.height;
    const dimensions = {
      src: img.src,
      width: w,
      height: h
    };
    callback(dimensions);
    return dimensions;
  };
}
