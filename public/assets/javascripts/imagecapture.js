var ImageCapture=( function($){

    function HTMLCapture() {
        this.imgSetInfos = [];
        this.imgSetCount = 0;
    }

    HTMLCapture.prototype.add = function ( options ) {
        this.imgSetInfos.push({ 
        target:$(options.target), 
        container:$(options.container), 
        width:options.width });
        
        ++this.imgSetCount;
    };
    HTMLCapture.prototype.multiCapture = function () {
        var that = this;
        if (that.imgSetInfos.length < 1) {return;}
        for (var i = 0, len = that.imgSetInfos.length; i < len; i++) {
            var data = that.imgSetInfos[i];
            canvasImgToResize.call(that, data.target, data.container, data.width);
        }
    };
    HTMLCapture.prototype.capture = function (options) {
        this.captureTarget = $(options.target);
        this.captureImgContainer = $(options.container);
        this.imgW = options.width;

        //canvasImgToResize.call(this,  $("#like_pp_area"), imgSetInfos[0].container,   imgSetInfos[0].width );
        canvasImgToResize.call(this, this.captureTarget, this.captureImgContainer, this.imgW);
    };


    function canvasImgToResize($captureTarget, resizeTarget, resizeWidth) {
        var that = this;

        html2canvas($captureTarget, {
            useCORS: true,
            onrendered: function (canvas) {
                //var imgData = canvas.toDataURL("image/jpeg");
                //
                var tw = resizeWidth;
                var targetContainer = resizeTarget;

                var dummyCanvas = document.createElement("canvas");
                var context = dummyCanvas.getContext("2d");
                var widthToPercent = 100 / ( canvas.width / tw);
                var percentToHeight = widthToPercent * canvas.height / 100;

                dummyCanvas.width = tw;
                dummyCanvas.height = percentToHeight;
                context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, tw, percentToHeight);
                //
                var dataURL = dummyCanvas.toDataURL("image/png");
                var img = new Image();
                img.src = dataURL;

                targetContainer.append(img);


                var blob = dataURItoBlob(dataURL);
                var objectURL = URL.createObjectURL(blob);

                var testImgViewContainer = document.createElement("div");
                testImgViewContainer.setAttribute("class", "shortcut-view");
                /*

                 var tImg=new Image();
                 testImgViewContainer.appendChild( tImg );
                 tImg.crossOrigin = "anonymous";
                 tImg.src=objectURL;
                 tImg.width=tw;
                 tImg.height=percentToHeight;
                 */

                var loc = document.createElement("a");
                testImgViewContainer.appendChild(loc);
                loc.href = objectURL;
                var copyURL = objectURL;
                var sliceNames = copyURL.split("/")
                var fileName = sliceNames[sliceNames.length - 1];
                loc.download = fileName + ".png";
                loc.click();

                URL.revokeObjectURL(objectURL); //메모리 해제하기


            }
        });//end html2canvas
    }; //end  canvasImgToResize


    function dataURItoBlob(dataURI) {
        //console.log( dataURI.replace(/^data:image\/(png|jpeg);base64,/, ""))
        var byteStr = atob(dataURI.split(',')[1]);
        var mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];

        var arrBuf = new ArrayBuffer(byteStr.length);
        var uInt8Arr = new Uint8Array(arrBuf);
        for (var i = 0; i < byteStr.length; i++) {
            uInt8Arr[i] = byteStr.charCodeAt(i);
        }
        return new Blob([uInt8Arr], {type: mimeStr});
    }

    return HTMLCapture;
}(jQuery) );