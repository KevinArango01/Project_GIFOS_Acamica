let url_upload_gifo = "https://upload.giphy.com/v1/gifs?"+api_key;
let create_gifos_section = document.getElementsByClassName("create-gifos-section")[0];

let high_light = document.getElementById("high-light-img");
let create_gifo_start = document.getElementById("create-gifo-start");
let create_gifo_acces_cam = document.getElementById("create-gifo-acces-cam");
let cam_screen_container = document.getElementsByClassName("cam-screen-container")[0];
let cam_stream = document.getElementsByClassName("cam-stream")[0];
let video_stream;
let recorder;
let form = new FormData();
let timekeeper_item = document.getElementById("timekeeper");
let timekeeper;
let hours = ["0","0"];
let minutes = ["0","0"];
let seconds = ["0","0"];
let record_again = document.getElementById("record-again");
let uploannding_gifo_box = document.getElementById("uploannding-gifo-box");
let uploaded_gifo_box = document.getElementById("uploaded-gifo-box");
let btn_start_gifo = document.getElementById("btn-start-gifo");
let btn_record_gifo = document.getElementById("btn-record-gifo");
let btn_end_gifo = document.getElementById("btn-end-gifo");
let btn_up_gifo = document.getElementById("btn-up-gifo");
let step_item = document.getElementsByClassName("step-item");



btn_start_gifo.addEventListener("click",()=>{
    create_gifo_start.classList.toggle("show-gifo-step");
    create_gifo_acces_cam.classList.toggle("show-gifo-step");
    btn_start_gifo.classList.toggle("show-bttn");
    step_item[0].classList.toggle("step-item-selected");
    acces_user_cam();
});

let acces_user_cam = () =>{
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 320 }
        }    
    })
    .then(response_stream =>{
        show_record_elements(response_stream);
    });    
}
let show_record_elements = (stream) =>{
    cam_stream.srcObject = stream;
    cam_stream.play();
    create_gifo_acces_cam.classList.toggle("show-gifo-step");
    cam_screen_container.classList.toggle("show-gifo-step");
    btn_record_gifo.classList.toggle("show-bttn");
    step_item[0].classList.toggle("step-item-selected");
    step_item[1].classList.toggle("step-item-selected");
    video_stream = stream;
}

let functions_stream = () =>{
    recorder = RecordRTC(video_stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
            console.log('started')
        },
    });
    recorder.startRecording();
    timekeeper_item.style.display = "block";
    timekeeper =  setInterval(timekeeper_function,1000);
}
btn_record_gifo.addEventListener("click", () =>{
    btn_record_gifo.classList.toggle("show-bttn");
    btn_end_gifo.classList.toggle("show-bttn");
    functions_stream();
});
btn_end_gifo.addEventListener("click", () =>{
    recorder.stopRecording(function() {
        var blob = this.getBlob();
        form.append('file', blob, 'myGif.gif');
        clearInterval(timekeeper);
        timekeeper_item.style.display = "none";
        record_again.style.display = "block";
        btn_end_gifo.classList.toggle("show-bttn");
        btn_up_gifo.classList.toggle("show-bttn");
    });
});

record_again.addEventListener("click", ()=>{
    btn_up_gifo.classList.toggle("show-bttn");
    btn_end_gifo.classList.toggle("show-bttn");
    record_again.style.display = "none";
    timekeeper_item.innerHTML = "00:00:00";
    hours = ["0","0"];
    minutes = ["0","0"];
    seconds = ["0","0"];
    form.delete('file');
    functions_stream();
});


btn_up_gifo.addEventListener("click", ()=>{
    record_again.style.display = "none";
    btn_up_gifo.classList.toggle("show-bttn");
    step_item[1].classList.toggle("step-item-selected");
    step_item[2].classList.toggle("step-item-selected");
    uploannding_gifo_box.style.display = "block";
    upload_new_gifo();
});
let upload_new_gifo = () =>{
    fetch(url_upload_gifo,{
        method: "POST",
        body: form
    }).then(response => response.json())
    .then(data =>{
        console.log(data.data.id);
        search_gifo_byId(data.data.id);
    }).catch(mesagge_error => console.log(mesagge_error));
}
let search_gifo_byId = (gif_id)=>{
    let url_search_gifos_by_ID = "https://api.giphy.com/v1/gifs/"+gif_id+"?&"+api_key;
    fetch(url_search_gifos_by_ID)
    .then(response => response.json())
    .then(data_new_gifo => {
        let long = created_gifos_array.length;
        let gifo = new New_gifo(data_new_gifo.data, "gifo-created-"+(long+1), "fav-icon-gc-"+(long+1),"fav-icon-act-gc-"+(long+1),"dow-icon-gc-"+(long+1),"full-screen-icon-gc-"+(long+1),"trash-icon-gc-"+(long+1));
        created_gifos_array.push(gifo);
        localStorage.setItem("new_gifo",JSON.stringify(created_gifos_array));
        uploannding_gifo_box.style.display = "none";
        uploaded_gifo_box.style.display = "block";
        stopStreamedVideo(cam_stream);
        cam_stream.style.display = "none";
        let gif_stream = document.getElementsByClassName("gif-stream")[0];
        gif_stream.style.display = "block";
        gif_stream.src = data_new_gifo.data.images.original.url;
    });
}

let timekeeper_function = ()=>{
    seconds[1] = parseInt(seconds[1]) + 1; 
    if(seconds[1] == 10){
        seconds[0] = ""; 
    }else if(seconds[1] == 60){
        minutes[1]= (parseInt(minutes[1])+1).toString(); 
        seconds[0] = "0";
        seconds[1] = "0";
    }
    if(minutes[1]==10){
        minutes[0] = ""; 
    }else if(minutes[1] == 60){
        hours[1]= (parseInt(hours[1])+1).toString(); 
        minutes[0] = "0";
        minutes[1] = "0";
    }
    if(hours[1]==10){
        hours[0] = ""; 
    }else if(hours[1]==24){
        hours[0] = "0";
        hours[1] = "0";
    }
    let hs = hours[0]+hours[1];
    let mm = minutes[0] + minutes[1];
    let ss = seconds[0] + seconds[1];
    timekeeper_item.innerHTML = hs +":"+mm+":"+ss;
}