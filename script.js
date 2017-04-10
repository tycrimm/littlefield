function setMapLinks(frame) {
    Array.from(frame.contentWindow.document.querySelectorAll('area')).forEach(e => {
       var url = e.href.split("'")[1];
       e.href = "javascript:parent.loadDetailsFrame('" + url + "');";  
    });
}

function setButtonLinks(frame) {
    Array.from(frame.contentWindow.document.querySelectorAll('input[type="button"]')).forEach(e => {
       
       var url = (e.getAttribute("onclick") || "").split("'")[1];
       if(!url) { return; }

       e.onclick = function() {
                       parent.loadDetailsFrame(url);
                    };  
    });
}

function checkQueueRedirect(frame) {
    var isQueue = frame.contentWindow.document.body.innerText.includes(" QUEUE MENU");

    if(isQueue) {
        frame.contentWindow.document.querySelector('input[type="button"]').click();
    }
}

function loadDetailsFrame(url) {
    parent.document.querySelector('frame[name="details"]').src = url;
}

function createNewFrames() {
    var frameset = document.querySelector("frameset");
    var shopFloor = frameset.querySelector('frame[name="shopFloor"]');

    var newFrameset = document.createElement("frameset");
    newFrameset.border = "0";
    newFrameset.frameborder = "0";
    newFrameset.framespacing= "0";
    newFrameset.cols = "50%,50%";
    newFrameset.innerHTML = '<frame border="0" frameborder="0" framespacing="0" name="shopFloor" src="/lt/shopFloor.html">' + 
                            '<frame border="0" frameborder="0" framespacing="0" name="details">';

    frameset.replaceChild(newFrameset, shopFloor);
}

function setFrameLoadingTriggers() {
    var frame = document.querySelector('frame[name="details"]');
    frame.onload = function(d) {
        setButtonLinks(frame);
        checkQueueRedirect(frame);
    };
}

createNewFrames();
setFrameLoadingTriggers();
//Wait for the new frames to load since we're explcitly replacing the existing ones
setTimeout(function() {
    setMapLinks(document.querySelector('frame[name="shopFloor"]'));
}, 1000);
