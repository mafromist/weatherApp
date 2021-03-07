const convertTime = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =  hour + ':' + min ;
    return time;
  }

  module.exports = convertTime;