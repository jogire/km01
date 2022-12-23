import 'https://cdn.jsdelivr.net/npm/browser-image-compression@1.0.0/dist/browser-image-compression.js'

var caped = { //create vue component
    name: 'caped',

    props: {
        ownconfig: Object,
    },
    template: `
            <div class="container-fluid mt-2">
                <!-- The buttons to control the stream -->
                <div class="button-group row mx-1 text-center border border-secondary p-3">
                    <div class="col" name="capImgDiv" :style="configObj.type.includes('captureImage')? 'display: inline-block': 'display: none'">
                        <button name="capImgStart" @click="sclick($event)" v-show="ownconfig.t == 'image'" type="button" class="btn btn-primary">Capture Image</button>
                        <button name="capImgCapture" @click="capclick($event)" type="button" class="btn btn-warning mr-2" style="display: none">Click</button>
                        <button name="capImgStop" @click="stclick($event)" type="button" class="btn btn-danger mr-2" style="display: none">Cancel</button>
                    </div>
                    <div class="col" name="capRecDiv" :style="configObj.type.includes('startRecording')? 'display: inline-block;': 'display: none;'">
                        <button name="capStartRec" @click="startRecord($event)" v-show="ownconfig.t == 'video'" type="button" class="btn btn-info align-middle">Start Recording</button>
                        <button name="capPauseRec" @click="pauseRecord($event)" type="button" class="btn btn-warning mr-2" style="display: none;">Pause</button>
                        <button name="capStopRec" @click="stopRecord($event)" type="button" class="btn btn-danger mr-2" style="display: none;">Stop Recording</button>
                    </div>
                    <div class="col" name="vimgDiv" :style="configObj.type.includes('uploadImage') || configObj.type.includes('uploadVideo') || configObj.type.includes('uploadFile')?'display: inline-block;':'display: none;'"> 
                        <div class="input-group">
                            <input class="form-control" v-if="configObj.type.includes('uploadImage') && configObj.type.includes('uploadVideo')" type="file" @change="imclick($event)" name="vimgFile" accept="image/*,video/*">
                            <input class="form-control" v-else-if="configObj.type.includes('uploadImage')" type="file" name="vimgFile" @change="imclick($event)" accept="image/*">
                            <input class="form-control" v-else-if="configObj.type.includes('uploadVideo')" type="file" name="vimgFile" @change="imclick($event)" accept="video/*">
                            <input class="form-control" v-else-if="configObj.type.includes('uploadFile')" type="file" name="vimgFile" @change="imclick($event)" accept="*/*">
                            <input class="form-control" v-else type="file" @change="imclick($event)" name="vimgFile">
                            <label class="input-group-text">Upload</label>
                        </div>
                    </div>    
                </div>
                
                <!-- Video Element & Canvas -->
                <div class="play-area row mx-1 text-center border border-secondary p-3">
                     <!-- {{isStreaming}} -->
                    <div v-show="isStreaming==true" class="col play-area-sub">
                        <video name="stream" width="250" height="250" muted></video>
                    </div>
                    <div v-show="isStreaming!=true" class="col play-area-sub">
                        <canvas name="capture" class="capture" width="400" height="340" style="display:none;"></canvas>
                        <div name="snapshot" class="snapshot"></div>
                    </div>
                </div>
                
                <span v-if="ownconfig.showUrl == 'true' || ownconfig.showUrl == 'yes'  ">
                  Root Url :  <input type="text" v-model="newLink.rootUrl" placeholder="https://km01.j0001.com/" > 
                  Part Url :  <input type="text" v-model="newLink.pathUrl"  placeholder="serv/3_Amma.png/"> 
                  <button @click="updateNewLink();">update url</button>
                </span>
                
            </div>
            `,
    data: function() { //type: ['captureImage', 'uploadImage', 'uploadVideo', 'startRecording']
        return {
            configObj: {
                // type: ['captureImage', 'uploadVideo', 'uploadImage', 'startRecording'  ] , 
                type: ['captureImage', 'uploadVideo', 'uploadImage', 'startRecording', 'uploadFile' ] , 
                // type: [ 'uploadVideo',  'startRecording']
                // type: [ 'uploadVideo']
                // type: [ 'startRecording']
            },
            isStreaming: false,
            cameraStream: null,
            rec: null,
            self: null,
            // file
            newLink: {
                rootUrl: '',
                pathUrl: ''
            },
            config: {},
            canvas: {},
            player: {},
            lastselected: '',
            selectedfile: {},
            selectedfilter: '',
            showcrop: '0',
            showupload: '',
            showcamera: '',
            showplayer: '',
            playerstream: '',
            cropped: null,
            uploaddirect: '',
            askfilter: '',
            img: '',
            size: 1,
            type: "jpeg",
            filters: [
                'horizontal_lines',
                'extreme_offset_blue',
                'extreme_offset_green',
                'offset_green',
                'extra_offset_blue',
                'extra_offset_red',
                'extra_offset_green',
                'extreme_offset_red',
                'specks_redscale',
                'eclectic',
                'pane',
                'diagonal_lines',
                'green_specks',
                'casino',
                'yellow_casino',
                'green_diagonal_lines',
                'offset',
                'offset_blue',
                'neue',
                'sunset',
                'specks',
                'wood',
                'lix',
                'ryo',
                'bluescale',
                'solange',
                'evening',
                'crimson',
                'teal_min_noise',
                'phase',
                'dark_purple_min_noise',
                'coral',
                'darkify',
                'incbrightness',
                'incbrightness2',
                'invert',
                'sat_adj',
                'lemon',
                'pink_min_noise',
                'frontward',
                'vintage',
                'perfume',
                'serenity',
                'pink_aura',
                'haze',
                'cool_twilight',
                'blues',
                'horizon',
                'mellow',
                'solange_dark',
                'solange_grey',
                'zapt',
                'eon',
                'aeon',
                'matrix',
                'cosmic',
                'min_noise',
                'red_min_noise',
                'matrix2',
                'purplescale',
                'radio',
                'twenties',
                'ocean',
                'a',
                'pixel_blue',
                'greyscale',
                'grime',
                'redgreyscale',
                'retroviolet',
                'greengreyscale',
                'warmth',
                'green_med_noise',
                'green_min_noise',
                'blue_min_noise',
                'rosetint',
                'purple_min_noise',
                'Vintage',
            ]

        }
    },
    mounted() {
        // https://html5.tutorials24x7.com/blog/how-to-capture-image-from-camera
        // The buttons to start & stop stream and to capture the image
        var capImgDiv = document.getElementsByName("capImgDiv"); //gets all capture Img buttons div
        var capImgStart = document.getElementsByName("capImgStart"); //gets all the capture image buttons
        var capImgStop = document.getElementsByName("capImgStop"); //gets all the cancel buttons
        var capImgCapture = document.getElementsByName("capImgCapture"); //gets all the click image buttons

        var capRecDiv = document.getElementsByName("capRecDiv"); //gets all recording buttons div
        var capStartRec = document.getElementsByName("capStartRec"); //gets all start recording buttons
        var capPauseRec = document.getElementsByName("capPauseRec"); //gets all the pause recording buttons
        var capStopRec = document.getElementsByName("capStopRec"); //gets all stop recording buttons

        var vimgDiv = document.getElementsByName("vimgDiv"); //gets all the img/video file input div
        var vimgFile = document.getElementsByName("vimgFile"); //gets all the img/video file input

        // The stream & capture
        var stream = document.getElementsByName("stream"); //gets alls the stream video element
        var capture = document.getElementsByName("capture"); //gets all the canvas element
        var snapshot = document.getElementsByName("snapshot"); //gets all the img/video view

        // The video stream 
        /*  var cameraStream = null; //assigns video stream as per stream buttons
         var rec = null; //Stores recording stream
         var self = this;
         */

        this.cameraStream = null; //assigns video stream as per stream buttons
        this.rec = null; //Stores recording stream
        this.self = this;

        // Attach listeners 
        var count = capImgStart.length;
        for (var i = 0; i < count; i++) {
            // sets id of all necessary elements 
            capImgDiv[i].setAttribute('id', 'capImgDiv' + i);
            capImgStart[i].setAttribute('id', 'capImgStart' + i);
            capImgStop[i].setAttribute('id', 'capImgStop' + i); //
            capImgCapture[i].setAttribute('id', 'capImgCapture' + i);
            capRecDiv[i].setAttribute('id', 'capRecDiv' + i);
            capStartRec[i].setAttribute('id', 'capStartRec' + i);
            capPauseRec[i].setAttribute('id', 'capPauseRec' + i);
            capStopRec[i].setAttribute('id', 'capStopRec' + i);
            vimgDiv[i].setAttribute('id', 'vimgDiv' + i);
            vimgFile[i].setAttribute('id', 'vimgFile' + i);
            stream[i].setAttribute('id', 'stream' + i);
            capture[i].setAttribute('id', 'capture' + i);
            snapshot[i].setAttribute('id', 'snapshot' + i);

            // sets onclick and onchange events for all necessary elements
            /* 
            capImgStart[i].onclick = sclick;
            capImgStop[i].onclick = stclick;
            capImgCapture[i].onclick = capclick;
            capStartRec[i].onclick = startRecord;
            capPauseRec[i].onclick = pauseRecord;
            capStopRec[i].onclick = stopRecord;
            vimgFile[i].onchange = imclick;
             */
        }

    },
    methods: {

        // Start Streaming
        sclick: function(e) {
            let _this = this;
            var id = e.target.id; //gets clicked button is
            var i = id[id.length - 1]; //gets the last character eg: btn0 get 0
            var sid = 'stream' + i;
            var stream1 = document.getElementById(sid); //get video stream element
            var capImgStop1 = document.getElementById('capImgStop' + i);
            var capImgStart1 = document.getElementById('capImgStart' + i);
            var capImgCapture1 = document.getElementById('capImgCapture' + i);
            var capRecDiv1 = document.getElementById('capRecDiv' + i);
            var vimgDiv1 = document.getElementById('vimgDiv' + i);

            var mediaSupport = 'mediaDevices' in navigator; //checks for media devices support
            if (mediaSupport && null == this.cameraStream) {
                navigator.mediaDevices.getUserMedia({
                        video: true
                    })
                    .then(function(mediaStream) {
                        _this.isStreaming = true;
                        capImgStop1.style.display = "inline-block"; //set display of cancel visible
                        capImgCapture1.style.display = "inline-block"; //set display of click visible
                        capImgStart1.style.display = "none"; //set display of capture image none
                        capRecDiv1.style.display = "none"; //set display of recording div none
                        vimgDiv1.style.display = "none"; //set display of file upload to none

                        _this.cameraStream = mediaStream;
                        stream1.srcObject = mediaStream; //sets src
                        stream1.play(); //plays stream
                    })
                    .catch(function(err) {
                        console.log("Unable to access camera: " + err);
                    });
            } else {

                alert('Your browser does not support media devices.');

                return;
            }
        },

        // Stop Streaming
        stclick: function(e) {
            this.isStreaming = false;
            var id = e.target.id;
            var i = id[id.length - 1];
            var stream1 = document.getElementById('stream' + i);
            var capImgStop1 = document.getElementById('capImgStop' + i);
            var capImgStart1 = document.getElementById('capImgStart' + i);
            var capImgCapture1 = document.getElementById('capImgCapture' + i);
            var vimgDiv1 = document.getElementById('vimgDiv' + i);
            var capRecDiv1 = document.getElementById('capRecDiv' + i);

            if (null != this.cameraStream) {
                var track = this.cameraStream.getTracks()[0];
                track.stop(); //stops streaming
                stream1.load();

                this.cameraStream = null;
                capImgStop1.style.display = "none"; //set display of stop streaming non-visible
                capImgStart1.style.display = "inline-block"; //set display of capture image visible
                if (this.self.configObj.type.includes('startRecording')) {
                    capRecDiv1.style.display = "inline-block"; //set display of start recording visible
                }
                capImgCapture1.style.display = "none"; //set display of click none
                if (this.self.configObj.type.includes('uploadImage') || this.self.configObj.type.includes('uploadVideo') || this.self.configObj.type.includes('uploadFile')) {
                    vimgDiv1.style.display = "inline-block"; //set display of file upload visible
                }
            }
        },

        //view captured image
        capclick: function(e) {
            this.isStreaming = false;
            var id = e.target.id
            var i = id[id.length - 1];
            var snapshot1 = document.getElementById('snapshot' + i);
            var capture1 = document.getElementById('capture' + i);
            var stream1 = document.getElementById('stream' + i);
            var vimgFile1 = document.getElementById('vimgFile' + i);

            if (null != this.cameraStream) {
                var ctx = capture1.getContext('2d'); //gets canvas
                var img = new Image();
                ctx.drawImage(stream1, 0, 0, capture1.width, capture1.height); //draws img to canvas
                img.src = capture1.toDataURL("image/png"); //converts to base64
                let data = capture1.toDataURL("image/jpeg"); //converts to base64
                // img.width = 400;
                img.width = 250;
                snapshot1.innerHTML = '';
                snapshot1.appendChild(img);
                vimgFile1.value = '';
                this.stclick(e);

                this.newUpload({
                    config: this.ownconfig,
                    base64: data,
                    fileName: (Math.random()*1000000)+'.jpg'
                });
            }
        },

        //https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
        //start video recording
        startRecording: function(stream) {
            let recorder = new MediaRecorder(stream);
            let data = [];

            recorder.ondataavailable = event => data.push(event.data);
            recorder.start();
            this.rec = recorder;

            let stopped = new Promise((resolve, reject) => {
                recorder.onstop = resolve;
                recorder.onerror = event => reject(event.name);
            });

            return Promise.all([
                    stopped
                ])
                .then(() => data);
        },
        //stop video recording
        stop: function(stream) {
            stream.getTracks().forEach(track => track.stop());
        },

        //called on start recording click
        startRecord: function(e) {
            let _this = this;
            var id = e.target.id;
            var i = id[id.length - 1];
            var capRecDiv1 = document.getElementById('capRecDiv' + i);
            var capStartRec1 = document.getElementById('capStartRec' + i);
            var capStopRec1 = document.getElementById('capStopRec' + i);
            var capPauseRec1 = document.getElementById('capPauseRec' + i);
            var vimgDiv1 = document.getElementById('vimgDiv' + i);
            var capImgDiv1 = document.getElementById('capImgDiv' + i);
            var stream1 = document.getElementById('stream' + i); //gets streaming video
            var snapshot1 = document.getElementById('snapshot' + i); //gets view side

            navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    _this.isStreaming = true;
                    _this.cameraStream = stream;
                    stream1.srcObject = stream;
                    stream1.play();

                    capStartRec1.style.display = "none";
                    capStopRec1.style.display = "inline-block";
                    capPauseRec1.style.display = "inline-block";
                    vimgDiv1.style.display = "none";
                    capImgDiv1.style.display = "none";
                    stream1.captureStream = stream1.captureStream || stream1.mozCaptureStream; //capture stream
                    return new Promise(resolve => stream1.onplaying = resolve);
                }).then(() => _this.startRecording(stream1.captureStream())) //start recording
                .then(recordedChunks => {
                    let recordedBlob = new Blob(recordedChunks, {
                        type: "video/webm"
                    });
                    var recording = document.createElement("video"); //creating element for video view
                    recording.src = URL.createObjectURL(recordedBlob); //assign read blob as src
                    recording.width = 250;
                    // recording.height = 340;
                    recording.controls = true;
                    snapshot1.innerHTML = '';
                    snapshot1.appendChild(recording);
                    var log = "Successfully recorded " + recordedBlob.size + " bytes of " +
                        recordedBlob.type + " media."
                    console.log(log);
                    _this.newUpload({
                        config: _this.ownconfig,
                        // base64: data,
                        blob: recordedBlob,
                        fileName: (Math.random()*1000000)+'.webm'
                    });
                })
                .catch(function(err) {
                    console.error(err);
                    // console.log( "Unable to access camera: " + err );
                });
        },

        pauseRecord: function(e) {
            var id = e.target.id;
            var i = id[id.length - 1];
            var capPauseRec1 = document.getElementById('capPauseRec' + i);
            if (this.rec != null) {
                if (this.rec.state === "recording") {
                    this.rec.pause();
                    capPauseRec1.innerHTML = "Resume";
                    // recording paused
                } else if (this.rec.state === "paused") {
                    this.rec.resume();
                    capPauseRec1.innerHTML = "Pause";
                    // resume recording
                }
            }
        },

        //called on stop recording click
        stopRecord: function(e) {
            this.isStreaming = false;
            var id = e.target.id;
            var i = id[id.length - 1];
            var stream1 = document.getElementById('stream' + i);
            var capRecDiv1 = document.getElementById('capRecDiv' + i);
            var capStartRec1 = document.getElementById('capStartRec' + i);
            var capPauseRec1 = document.getElementById('capPauseRec' + i);
            var capStopRec1 = document.getElementById('capStopRec' + i);
            var vimgFile1 = document.getElementById('vimgFile' + i);
            var vimgDiv1 = document.getElementById('vimgDiv' + i);
            var capImgDiv1 = document.getElementById('capImgDiv' + i);

            // stop(stream1.srcObject); //stop recording
            this.stop(stream1.srcObject); //stop recording
            stream1.load();
            this.cameraStream = null;
            this.rec = null;
            capStopRec1.style.display = "none";
            capPauseRec1.style.display = "none";
            capStartRec1.style.display = "inline-block";
            if (this.self.configObj.type.includes('captureImage')) {
                capImgDiv1.style.display = "inline-block";
            }
            if (this.self.configObj.type.includes('uploadImage') || this.self.configObj.type.includes('uploadVideo') || this.self.configObj.type.includes('uploadFile')) {
                vimgDiv1.style.display = "inline-block";
            }
            vimgFile1.value = '';
        },

        //view selected image/video
        imclick: function(e) {
            let _this = this;
            this.isStreaming = false;
            var id = e.target.id
            var i = id[id.length - 1];
            var vimgFile1 = document.getElementById('vimgFile' + i);
            var snapshot1 = document.getElementById('snapshot' + i);
            var file = vimgFile1.files[0];
            
            
            
            if (file != null && file != '') {
                var reader = new FileReader(); //assign file reader to read file
                reader.readAsDataURL(file); //reads file as url base 64
                reader.onload = function() { //onload of a reader
                    var fileContent = reader.result; //gets the base64 url
                    var type = file.type;
                    if (type.includes("image")) {
                        var img = new Image();
                        img.src = fileContent;
                        img.width = 250;
                        // img.height = 340;
                        snapshot1.innerHTML = '';
                        snapshot1.appendChild(img);
                        _this.newUpload({
                          config: _this.ownconfig,
                          file: file,
                          fileName: file.name
                        });
                    } 
                    else if(_this.ownconfig.t == 'file' ) {
                      
                        _this.newUpload({
                          config: _this.ownconfig,
                          file: file,
                          fileName: file.name
                        });
                      
                    }
                    else {
                        var recording = document.createElement("video");
                        recording.src = fileContent;
                        recording.width = 250;
                        // recording.height = 340;
                        recording.controls = true;
                        snapshot1.innerHTML = '';
                        snapshot1.appendChild(recording);
                        /// if mp4 
                        if( file.type=='video/mp4'){
                          if(_this.ownconfig.mode =='local' || _this.ownconfig.mode =='stream'){
                            cz.toast({text:'Mp4 will be supported soon. Pls convert to webm'});
                          }else{
                            _this.newUpload({
                              config: _this.ownconfig,
                              file: file,
                              fileName: file.name
                            });
                          } 
                        }
                        /// if webm 
                        else if(file.type=='video/webm'){
                          _this.newUpload({
                            config: _this.ownconfig,
                            file: file,
                            fileName: file.name
                          });
                        }
                        else{
                          cz.toast({text:'Pls upload webm video or record.'});
                        } 
                        
                    }
                }
            }
        },

        // new      
        newUpload: async function(z) {
            let blob = z.blob;
            let base64 = z.base64;
            let file = z.file;
            let _this = this,
                fileName, fileType, fileSize, compressedFile, compressedBlob;

            if (file) {
                fileSize = file.size / 1024;
                fileName = file.name;
                fileType = file.type;
                compressedBlob = new Blob([file], {
                    type: file.type
                });
            } else if (blob) {
                fileSize = blob.size / 1024;
                fileType = blob.type;
                fileName = z.fileName || ('' + 100000 * Math.random());
            } else {
                let res = await fetch(base64);
                /*
.then(res => res.blob())
.then(console.log)*/
                blob = await res.blob();
                // fileSize = res.size / 1024;
                fileSize = blob.size / 1024;
                fileType = blob.type;
                fileName = z.fileName || ('' + 100000 * Math.random());
            }
            

            if (_this.ownconfig.addRandomName != false) {
                fileName = Math.floor(Math.random() * 10000000) + '_' + fileName;
            }
            
            // limit
            let allow=false;
            if ( (fileType=='video/webm' || fileType=='video/mp4' ) && fileSize <= _this.ownconfig.videoSizeLimit ) {
              allow=true;
            }
            if (   fileSize <= _this.ownconfig.imageSizeLimit ||    fileSize <= _this.ownconfig.sizeLimit ||    fileSize <= 300   ) {
              allow=true;
            }
            
            
 
            // console.log('fileSize : '+fileSize)
            if (allow==true) {
              
                if (_this.ownconfig.locationType == 'was' ) {
                  
                  
                  
                  // link 
                  
                  let reqLink = {
                   toast:true,
                      "ah": {
                          "rt": {
                              "n": "test-1-so",   // 1
                              "type": "so", 
                          },
                          "rta": {
                              "a": "admission",  // 2 
                              "aa": "z",
                              "aType": "",
                              "cozA": "rot"
                          },
                          "rte": "co"
                      },
                      "ad": {
                          "op": "link",
                          opObj: {
                            "path":_this.ownconfig.path || "temp2",  // 3 
                            "as":_this.ownconfig.as || false,  // 3 
                            "bucket":_this.ownconfig.bucket || "ab2",  // 3 
                            "fileName":fileName || "t2.png",
                            "fileType":fileType || "image/png",
                          }
                      },
                  };
          
                  let res2 = await cz.hm({
                      request: reqLink
                  });
                  let fileLink = res2.data.ad && res2.data.ad.link;  
                  
                  if(_this.ownconfig.atp){
                    let fl =  fileLink.split('?')[0];
                    _this.ownconfig.atp[_this.ownconfig.at] = (res2.data.ad && res2.data.ad.fullLink)||fl;
                    if(Vue && Vue.set){
                      try{
                      Vue.set(_this.ownconfig.atp,_this.ownconfig.at,(res2.data.ad && res2.data.ad.fullLink) || fl);
                      }catch(ss){
                        console.error(ss);
                      }
                    }
                  }
                  
                  // get url 
                  // let filelink = _this.ownconfig.filelink ; 
                  // upload 
                  
        const myHeaders = new Headers(
            // { 'Content-Type': 'image/*' }
            {
                // 'x-amz-acl': 'public-read',
                'Content-Type': fileType , // file.type
            }
        );
        console.log(fileType); // file.type);
        // const myHeaders = new Headers({ 'x-amz-acl': 'public-read', 'Content-Type': 'image/png' });
        const response = await fetch(fileLink, {
            method: 'PUT',
            headers: myHeaders,
            body: compressedBlob || blob || file
        });
        
        if(response.status == 200 || response.status == '200' ){
        
            _this.uploadcallback({
              resultUrl: (res2.data.ad && res2.data.ad.fullLink)||fl,
              data:{
                ah:{
                  
                },
                ad:{
                  saveLink:fileLink && fileLink.split('?')[0],
                  putLink:fileLink
                }
              }
            });
            cz.toast({
                text: 'Upload Done!'
            });
          
        }
        
        
                  //update parent fn with url 
                  
                }else{
                  
                  let bodyFormData = new FormData();
                  let reqBody = {
                      "ah": {
                          lo: {},
                          rt: {
                              m: "filewrite",
                              v: "2",
                              "s": "s"
                          },
                          rta: {
                              "a": "file",
                              "aa": "u",
                              "cozA": "rot"
                          }
                      },
                      ad: {
                          mode: _this.ownconfig.mode,
  
                          fileServer: 'got',
                          limit: (_this.ownconfig.sizeLimit || 100),
                          fileSize: fileSize,
                          fileName: fileName,
                          fileType: fileType,
                          sameFileName: true,
                          folder: _this.ownconfig.folder,
                          gName: _this.ownconfig.gName,
                      }
                  };
                  cz.hmA({
                      request: reqBody
                  });
                  bodyFormData.append('mode', _this.ownconfig.mode);
                  bodyFormData.append('reqBody', JSON.stringify(reqBody));
                  bodyFormData.append('image', compressedBlob || blob, fileName || ('uploadedimage_' + (Math.floor(Math.random() * 1000) + 1) + '.jpg'));
  
                  let __this = _this;
                  let res = await axios.post(_this.ownconfig.linktoupload, bodyFormData);
                  if (res.data && res.data.ah && (res.data.ah.status == 200 || (res.data.ah.st && res.data.ah.st.status == 200))) {
                    // res.resultUrl = (res2.data.ad && res2.data.ad.fullLink)||fl;
                      __this.uploadcallback(res);
                      cz.toast({
                          text: 'Upload Done!'
                      });
                  } else {
                      cz.toast({
                          text: 'Upload Error!'
                      });
                  }
                  
                }
              
                
            } else {
                cz.toast({
                    text: 'Size too much.. Try uploading smaller file.'
                });
            }


        },

        uploadcallback: function(response) {
            //this.$parent.$options.methods.imgcallback(response);


            // // console.log(JSON.stringify(this.position));
            let met = this.ownconfig.parentMethod || 'imgcallback';
            if (this.$parent.$options && this.$parent.$options.methods && this.$parent.$options.methods[met]) {
                // this.$parent.$options.methods[met](JSON.stringify(event.latLng));
                this.$parent.$options.methods[met].apply(this.$parent, [response]);
            }
            else if (this.$parent.$parent && this.$parent.$parent.$options && this.$parent.$parent.$options.methods && this.$parent.$parent.$options.methods[met]) {
                // this.$parent.$options.methods[met](JSON.stringify(event.latLng));
                this.$parent.$parent.$options.methods[met].apply(this.$parent.$parent, [response]);
            }

        },
        updateNewLink: function() {
            //this.$parent.$options.methods.imgcallback(response);
            let paths = this.newLink.pathUrl.split('/');

            let response = {
                data: {
                    ad: {
                        saveLink: {
                            // this.newLink.rootUrl
                            // this.newLink.pathUrl
                            fileName: paths[paths.length - 1],
                            path: this.newLink.pathUrl,
                            size: 1,
                            rootPath: this.newLink.rootUrl,
                            fullPath: this.newLink.rootUrl + this.newLink.pathUrl,
                        }
                    }
                }
            }
            // // console.log(JSON.stringify(this.position));
            let met = this.ownconfig.parentMethod || 'imgcallback';
            if (this.$parent.$options && this.$parent.$options.methods && this.$parent.$options.methods[met]) {
                // this.$parent.$options.methods[met](JSON.stringify(event.latLng));
                this.$parent.$options.methods[met].apply(this.$parent, [response]);
            }
            else if (this.$parent.$parent && this.$parent.$parent.$options && this.$parent.$parent.$options.methods && this.$parent.$parent.$options.methods[met]) {
                // this.$parent.$options.methods[met](JSON.stringify(event.latLng));
                this.$parent.$parent.$options.methods[met].apply(this.$parent.$parent, [response]);
            }

        },

    },

}; 
export default caped; 
 
