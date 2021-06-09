<!-- ![logo](https://github.com/joey66666/Leava/blob/master/docs/logo/Leava.png)

# Leava

Leave Management Wechat-MiniProgram based on Flask

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg?style=popout-square)](./LICENSE)  [![GitHub](https://img.shields.io/badge/doc-中文版-red.svg?style=popout-square)](README.md)

Leava project contains the following components:

 -->

 <p align="center">
  <a href="https://github.com/zzjoey/Leava">
    <img src="https://github.com/zzjoey/Leava/blob/master/docs/logo/Leava.png"  width="152">
  </a>
  <h1 align="center">Leava</h1>
  <p align="center">
    <a href="https://github.com/zzjoey/Leava/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Anti%20996-blue.svg?style=popout-square"></a>
    <a href="https://github.com/zzjoey/Leava/blob/master/README_cn.md"><img src="https://img.shields.io/badge/doc-中文版-red.svg?style=popout-square"></a>
    <a href="http://hits.dwyl.io/zzjoey/Leava" alt="hit count"><img src="http://hits.dwyl.io/joey66666/Leava.svg" /></a> 
  </p>
  <p align="center">
    Leave Management Wechat-MiniProgram based on Flask<br>
  </p>
</p>


- [A RESTful API based on Flask](backend/RESTful_backend.py)

- [A Wechat Miniprogram](frontend)

- [Framework Design](docs)

## Feature

Student ask for leave

Staff manage requests

Faculty receive request

## API

| URL                          | explanation                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| /login                       | post ('userId', 'userPwd'); return (flag etc) |
| /student/ask_leave           | post ('student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure'); return (True \ False)                                   |
| /student/search_leave        | post ('student_id'), return ('leave_num','student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure') |
| /student/search_leave_detail | post('student_id'), return ('student_id','class','name','room') |
| /teacher/search_leave        | post('teacher_id'), return('leave_num','student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure') |
| /teacher/update_leave        | post('leave_num','flag'); return (True / False)      |
| /teacher2/search_leave       | post('teacher_id'), return ('leave_num','student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure') |
| /teacher/search_id           | post('school'), return ('teacher_id','name','role')                       |
| /pwd                  | post('userId','userPwd') return (True / False)                         |
| /name                 | post('name'), return ('leave_num','student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure','class','school','room') |

## Start Wechat miniprogram frontend

Screenshots

![demo](docs/final_demo.jpg)

[More screen shots](docs/screenshot)

