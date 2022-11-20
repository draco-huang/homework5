// select DOM elements
const video = document.querySelector("#videoplayer");
const buttonPlay = document.querySelector("#play");
const buttonPause = document.querySelector("#pause");
const buttonSlow = document.querySelector("#slower");
const buttonFast = document.querySelector("#faster");
const buttonSkip = document.querySelector("#skip");
const buttonMuteOrUnmute = document.querySelector("#mute");
const volumeSlider = document.querySelector("#slider");
const volumeDisplay = document.querySelector("#volume");

// global variables
let videoSpeed;
let videoMute;
let videoVolume;

// task handlers
const onPageLoad = () => {
    videoSpeed = 1;
    videoMute = false;
    videoVolume = volumeSlider.value;

    video.autoplay = false;
    video.loop = false;
    video.playbackRate = videoSpeed;
    video.muted = videoMute;
    video.volume = videoVolume / 100.0;
    onSlideVolume();
}

const onClickPlay = () => {
    video.play();
}

const onClickPause = () => {
    video.pause();
}

const onClickSlow = () => {
    switch (videoSpeed) {
        case 2:
            videoSpeed = 1;
            break;
        case 1:
            videoSpeed = 0.5;
            break;
        case 0.5:
            alert("videoeo is at slowest speed!");
            break;
    }
    video.playbackRate = videoSpeed;
}

const onClickFast = () => {
    switch (videoSpeed) {
        case 0.5:
            videoSpeed = 1;
            break;
        case 1:
            videoSpeed = 2;
            break;
        case 2:
            alert("videoeo is at fastest speed!");
            break;
    }
    video.playbackRate = videoSpeed;
}

const onClickSkip = () => {
    if (video.currentTime + 15 > video.duration) video.currentTime = 0;
    else video.currentTime += 15;
}

const onClickMuteOrUnmute = () => {
    video.muted = !video.muted;
    buttonMuteOrUnmute.textContent = video.muted ? 'Unmute' : 'Mute';
    if (!video.muted && videoVolume <= 0) videoVolume = 50;
    volumeDisplay.textContent = video.muted ? 0 : videoVolume;
    volumeSlider.value = video.muted ? 0 : videoVolume;
    video.volume = video.muted ? 0 : videoVolume / 100.0;
}

const onSlideVolume = () => {
    videoVolume = volumeSlider.value;
    volumeDisplay.textContent = videoVolume;
    video.volume = videoVolume / 100.0;
    buttonMuteOrUnmute.textContent = videoVolume > 0 ? 'Mute' : 'Unmute';
    video.muted = videoVolume <= 0;
}

// event listeners
buttonPlay.addEventListener('click', onClickPlay);
buttonPause.addEventListener('click', onClickPause);
buttonSlow.addEventListener('click', onClickSlow);
buttonFast.addEventListener('click', onClickFast);
buttonSkip.addEventListener('click', onClickSkip);
buttonMuteOrUnmute.addEventListener('click', onClickMuteOrUnmute);
volumeSlider.addEventListener('input', onSlideVolume);

// call when page loaded
onPageLoad();