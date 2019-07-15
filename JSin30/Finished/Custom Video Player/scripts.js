//get elements,
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]') //need querySelectorAll as more than 1 button

const ranges = player.querySelectorAll('.player__slider');
let isChanged = false;
let isScrub = false;
//build functions   
function togglePlay(){
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚'; //if this.paused is true change icon to '►' else, keep at '❚❚'
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeChange(){
    if(!isChanged)
        return;
    console.log(this.name);
    console.log(this.value);
    video[this.name] = this.value; //on volume slider video.volume, on playback video.playbackRate
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) *100 ;
    progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e){
    if(!isScrub)
        return;
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = parseFloat(scrubTime);
    console.log("gets here");
}
//hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
//skipButtons.addEventListener('click', skip); //wont work as will only take the first skipbutton found, have to loop

ranges.forEach(range => range.addEventListener('mousedown', () => isChanged=true)); 
ranges.forEach(range => range.addEventListener('mouseup', () => isChanged=false));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeChange));

progress.addEventListener('mousedown', () => isScrub=true);
progress.addEventListener('mouseup', () => isScrub=false);
progress.addEventListener('mouseout', () => isScrub=false);
progress.addEventListener('mousemove', scrub);
//on mousePress of the sliders, change isChanged to true allowing the handleRangeChange function to run when mouse is moved.
//on mouse up change isChanged to false and handleRangeChange returns nothing.
