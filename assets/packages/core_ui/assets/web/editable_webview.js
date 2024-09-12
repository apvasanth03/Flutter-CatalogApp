var contentElementId = "contentBody";
var tmpSpan;

window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
   document.getElementById(contentElementId).addEventListener('input', onContentChangedEvent);
 });


/**
* onContentChangedEvent - Gets called on content changed in ContentBody.
*/
function onContentChangedEvent(){
    var content = document.getElementById(contentElementId).innerHTML;
    console.log(content);
    window.flutter_inappwebview.callHandler('onContentChanged', content);
}

/**
 * Get Content & send it to Java.
*/
function getContent(){
    var content = document.getElementById(contentElementId).innerHTML;
    window.flutter_inappwebview.callHandler('onContentReceived', content);
}

/**
 *  1. Inserts the given content at the userSelection.
 *  2. Reference - https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
*/
function insertContentAtUserSelection(content) {
    document.getElementById(contentElementId).focus()

    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var el = document.createElement("div");
            el.innerHTML = content;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }

            window.flutter_inappwebview.callHandler('onContentChanged', content);

        }
    }
}