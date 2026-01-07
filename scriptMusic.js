const songs = [
  {
    title: "Dreams",
    artist: "Artist One",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Energy",
    artist: "Artist Two",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg"
  }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  audio.load(); // IMPORTANT
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = '⏸';
    cover.classList.add("playing");
  } else {
    audio.pause();
    playBtn.innerText = '▶';
    cover.classList.remove("playing");
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.innerText = "⏸";
  cover.classList.add("playing");
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.innerText = "⏸";
  cover.classList.add("playing");
}

/* TIME + PROGRESS FIX */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = progressPercent + "%";

  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* SEEK FIX */
progressContainer.addEventListener("click", e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

/* VOLUME FIX */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* AUTOPLAY NEXT */
audio.addEventListener("ended", nextSong);
