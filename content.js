(function () {
  if (!location.pathname.startsWith("/shorts/")) return;

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(135, 206, 235, 0.5)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.pointerEvents = "none";

  const timerText = document.createElement("span");
  timerText.style.color = "white";
  timerText.style.fontWeight = "bold";
  timerText.style.fontSize = "24px";
  timerText.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.7)";
  overlay.appendChild(timerText);
  document.body.appendChild(overlay);

  let startTime = Date.now();
  let intervalId = null;

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `현재 ${hours}시간 ${minutes}분 ${seconds}초 시청 중입니다.`;
    if (minutes > 0) return `현재 ${minutes}분 ${seconds}초 시청 중입니다.`;
    return `현재 ${seconds}초 시청 중입니다.`;
  }

  function updateTimer() {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timerText.textContent = formatTime(elapsedSeconds);
  }

  updateTimer();
  intervalId = setInterval(updateTimer, 1000);

  const observer = new MutationObserver(() => {
    if (!location.pathname.startsWith("/shorts/")) {
      clearInterval(intervalId);
      overlay.remove();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("beforeunload", () => {
    clearInterval(intervalId);
    overlay.remove();
    observer.disconnect();
  });
})();
