![logo](https://github.com/joey66666/Leava/blob/master/docs/logo/Leava.png)

# Leava

Leave Management Wechat-MiniProgram based on Flask

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg?style=popout-square)](./LICENSE)  [![GitHub](https://img.shields.io/badge/doc-中文版-red.svg?style=popout-square)](README.md)

Leava project contains the following components:

- [A RESTful API based on Flask](backend/RESTful_backend.py)

- [A Wechat Miniprogram](frontend)

- [Framework Design](docs)

## Feature

Student ask for leave

Staff manage requests

Faculty receive request

## Preparation

1. Create local database
   
    MySQL design

    > Three tables

    |  Name   |    explanation    |
    | :-----: | :--------: |
    | student | student information |
    | teacher | teacher information |
    |  leave  |   leave history   |

    > Table - student

    |       name        |   explanation   | type-length |
    | :---------------: | :------: | :-----------: |
    | student_id(pri key) | id |  decimal-65   |
    |       name        | name |  varchar-255  |
    |      s_class      | class |  varchar-255  |
    |      passwd       | password |  varchar-255  |
    |       room        | dormitory |  varchar-255  |

    > Table - teacher

    |       name        |               explanation               | type-length |
    | :---------------: | :------------------------------: | :-----------: |
    | teacher_id(pri key) |             id             |  decimal-65   |
    |       name        |             name             |  varchar-255  |
    |      passwd       |             password             |  varchar-255  |
    |       role        | 0 is staff, 1 is faculty |     int-2     |

    > Table - leave

    |       name        |               explanation               | type-length |
    | :--------------: | :-----------------------------------------: | :-----------: |
    | leave_num(pri key) |                  unique index                   |  decimal-65   |
    |    student_id    |     reference on student(student_id)      |  decimal-65   |
    |    start_time    |                start time                 |  datetime-0   |
    |     end_time     |                end time                 |  datetime-0   |
    |      reason      |                  reason                   |  varchar-255  |
    |       flag       | status (0 is decline, 1 is waiting, 2 is approved) |     int-2     |
    |       type       |       type（1 is absence, 2 is sickness,3 is others）       |  int-2   |
    |   teacher1_id    |                 stuff's id                  |  decimal-65   |
    |   teacher2_id    |                faculty's id                 |     decimal-26     |
    |      ensure      |             route of picture              |  varchar-255  |

2. Install dependencies

- [flask](https://github.com/pallets/flask)

- [sqlalchemy](https://github.com/zzzeek/sqlalchemy)

- [flask_sqlalchemy](https://github.com/pallets/flask-sqlalchemy)

- [werkzeug.security](https://github.com/pallets/werkzeug)

## Start backend server

**config mysqlconnector before start in RESTful_backend.py line 32 & 368**

To start the server, run 

```python 
python RESTful_backend.py
```

API

| URL                          | explanation                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| /login                       | post ('userId', 'userPwd'); return (flag etc) |
| /student/ask_leave           | post ('leave_num','student_id','start_time','end_time','reason','flag','teacher1_id','teacher2_id','type','ensure'); return (True \ False)                                   |
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

