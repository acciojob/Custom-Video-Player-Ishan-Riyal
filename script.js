// Select Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const errorMessage = player.querySelector(".error-message");

// Toggle Play/Pause
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// Update Button Icon
function updateButton() {
  const icon = video.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

// Skip Forward/Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume and Playback Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub (Seek) Through Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Handle Video Load Error
function handleError() {
  errorMessage.style.display = "block";
}

// Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("error", handleError);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));
sliders.forEach((slider) => {
  slider.addEventListener("input", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
