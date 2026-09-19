const STORAGE_KEY = 'exerciseTimerMinutes';
const input = document.getElementById('timer-setting');
const saveButton = document.querySelector('.complete-btn');

function getStoredTimerMinutes() {
  const savedValue = Number(localStorage.getItem(STORAGE_KEY));
  if (!Number.isInteger(savedValue) || savedValue < 1 || savedValue > 120) {
    return null;
  }
  return savedValue;
}

function saveTimerSetting() {
  const value = input.value.trim();

  if (value === '') {
    alert('시간을 입력해 주세요.');
    input.focus();
    return;
  }

  const minutes = Number(value);

  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 120) {
    alert('시간은 1분 이상, 120분 이하로 설정해 주세요.');
    input.value = '';
    input.focus();
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(minutes));
  alert('타이머 시간이 저장되었습니다.');
  window.location.href = 'index.html';
}

const savedMinutes = getStoredTimerMinutes();
if (savedMinutes !== null) {
  input.value = String(savedMinutes);
}

saveButton.addEventListener('click', saveTimerSetting);
