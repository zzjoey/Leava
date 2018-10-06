function leaveinfo(end_time,start_time,ensure,flag,leave_num,reason,type){
  this.end_time = Datetostring(end_time);
  this.start_time = Datetostring(start_time);
  this.ensure=ensure;
  this.flag=flag, 
  this.leave_num=leave_num, 
  this.reason=reason,
  this.type=type;
}



function Datetostring(str){
  return str.substring(0,9);
}


module.exports = {
  leaveinfo:leaveinfo
}