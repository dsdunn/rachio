
export const secondsToTime = (totalSeconds) => {
    let seconds = totalSeconds % 60 < 9 ? '0' + totalSeconds % 60 : totalSeconds % 60;
    let minutes = (totalSeconds - seconds) / 60;
    let hours;

    if (minutes > 59) {
      let minLeft = minutes % 60;

      hours = (minutes - minLeft) / 60;
      minutes = minLeft;
    } 
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }