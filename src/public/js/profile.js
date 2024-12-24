const timer = document.getElementById("token-time");
const warning = document.getElementById("warning");
const expireAt = parseInt(timer.innerText) * 1000;

// set timer
let isWarningShown = false;
let x = setInterval(() => {
    const remainTime = expireAt - Date.now()
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;

    // calculate minutes and seconds
    const minutes = Math.floor(((remainTime % oneHour) / oneMinute));
    const seconds = Math.floor(((remainTime % oneMinute) / oneSecond));
    // display the result
    timer.innerHTML = `${minutes}m ${String(seconds).padStart(2, '0')}s`;
    // If the count down is over, write some text
    // if (remainTime <= oneMinute) {
    if (remainTime <= 5 * oneMinute && !isWarningShown) {
        warning.innerHTML = "Your session is about to expire. Logout and re-login to avoid losing your progress.";
        isWarningShown = true;
        warning.style.display = "block";
    }
    // If the count down is over, write some text
    if (remainTime <= 0) {
        alert("Your session has expired.");
        clearInterval(x);
        window.location.href = '/login';
    }
}, 1000);



// function to get cookies value by name
function getCookiesByName(name) {
    const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}