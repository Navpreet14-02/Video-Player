// Get Our Elements

const player = document.querySelector(".player");
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');



// Build our functions


function togglePlay() {
    // const method = video.paused?'play':'pause';
    // video[method]();
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }

}

function updateBtn() {

    toggle.textContent = video.paused ? '►' : '❚ ❚';
    // console.log("Update the Button");

}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;

}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function updateProgressBar(e) {
    const scrubTime = (e.offsetX) / (progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}
// Hook up the event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);



toggle.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', updateProgressBar);
progress.addEventListener('mousemove', (e) => {
    if (mousedown) {
        updateProgressBar(e);
    }
});
// Above function can be written as:
// progress.addEventListener('mousemove'(e)=> mousedown && updateProgressBar(e));


progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
