const STORAGE_KEY = 'exerciseTimerMinutes';
const defaultMinutes = {
  cycling: 30,
  jogging: 20,
  marathon: 90,
  hiking: 45,
};

function getStoredTimerMinutes() {
  const savedValue = Number(localStorage.getItem(STORAGE_KEY));
  if (!Number.isInteger(savedValue) || savedValue < 1 || savedValue > 120) {
    return null;
  }
  return savedValue;
}

const exerciseDurations = {
  cycling: (getStoredTimerMinutes() ?? defaultMinutes.cycling) * 60,
  jogging: (getStoredTimerMinutes() ?? defaultMinutes.jogging) * 60,
  marathon: (getStoredTimerMinutes() ?? defaultMinutes.marathon) * 60,
  hiking: (getStoredTimerMinutes() ?? defaultMinutes.hiking) * 60,
};

const timeDisplayMap = {
  cycling: document.querySelector('.time-block.cycle .time-value'),
  jogging: document.querySelector('.time-block.jogging .time-value'),
  marathon: document.querySelector('.time-block.marathon .time-value'),
  hiking: document.querySelector('.time-block.hiking .time-value'),
};

const badge = document.querySelector('.workout-badge');
let selectedExercise = 'cycling';
let timerId = null;
let remainingSeconds = exerciseDurations[selectedExercise];

function formatTime(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateWorkoutBadge() {
  const labels = {
    cycling: '사이클',
    jogging: '조깅',
    marathon: '마라톤',
    hiking: '등산',
  };

  badge.textContent = labels[selectedExercise];
}

function updateTimerDisplay() {
  const currentTime = formatTime(remainingSeconds);
  if (timeDisplayMap[selectedExercise]) {
    timeDisplayMap[selectedExercise].textContent = currentTime;
  }

  Object.keys(exerciseDurations).forEach((exercise) => {
    if (timeDisplayMap[exercise]) {
      timeDisplayMap[exercise].textContent = formatTime(exerciseDurations[exercise]);
    }
  });
}

function resetTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  remainingSeconds = exerciseDurations[selectedExercise];
  updateTimerDisplay();
}

function selectExercise(exercise) {
  selectedExercise = exercise;
  updateWorkoutBadge();

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  remainingSeconds = exerciseDurations[selectedExercise];
  updateTimerDisplay();
}

function startTimer() {
  if (timerId) {
    return;
  }

  timerId = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds -= 1;
      updateTimerDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      alert('운동 시간이 종료되었습니다!');
    }
  }, 1000);
}

function pauseTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function applySavedTimerSetting() {
  const savedMinutes = getStoredTimerMinutes();
  if (savedMinutes === null) {
    return;
  }

  Object.keys(exerciseDurations).forEach((exercise) => {
    exerciseDurations[exercise] = savedMinutes * 60;
  });

  remainingSeconds = exerciseDurations[selectedExercise];
}

applySavedTimerSetting();
updateWorkoutBadge();
updateTimerDisplay();
