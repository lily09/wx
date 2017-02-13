function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime2(AddDayCount) {
  // var year = date.getFullYear()
  // var month = date.getMonth() + 1
  // var day = date.getDate()*24*60*60*2
  var dd = new Date(); 
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear(); 
  var m = dd.getMonth()+1;//获取当前月份的日期 
  var d = dd.getDate(); 
  
  if(AddDayCount==0){
    return "今天"
  }else if(AddDayCount==1){
    return "明天"
  }else{
    return [y,m,d].map(formatNumber).join('.') + ' '
  }
  
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2
}
