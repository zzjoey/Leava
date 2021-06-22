CREATE DATABASE IF NOT EXISTS leava;
USE leava;

# 学生表
DROP TABLE IF EXISTS student;
CREATE TABLE student
(
    student_id INT PRIMARY KEY NOT NULL, # 学生id
    name       VARCHAR(255)    NOT NULL, # 学生姓名
    s_class    VARCHAR(255)    NOT NULL, # 学生班级
    passwd     VARCHAR(255)    NOT NULL, # 密码
    room       VARCHAR(255)    NOT NULL, # 学生宿舍
    school     VARCHAR(255)    NOT NULL  # 所属学院
);


# 教师表
DROP TABLE IF EXISTS teacher;
CREATE TABLE teacher
(
    teacher_id INT PRIMARY KEY NOT NULL, # 教师id
    name       VARCHAR(255)    NOT NULL, # 教师姓名
    passwd     VARCHAR(255)    NOT NULL, # 密码
    role       INT             NOT NULL, # 教师身份(0辅导员，1任课老师)
    school     VARCHAR(255)    NOT NULL  # 所属学院
);

# 请假表
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`
(
    leave_num   INT PRIMARY KEY NOT NULL AUTO_INCREMENT, # 假条id
    student_id  INT             NOT NULL,                # 学生id
    start_time  DATETIME,                                # 开始时间
    end_time    DATETIME,                                # 结束时间
    reason      VARCHAR(255),                            # 理由
    flag        INT,                                     # 是否批准状态(0不通过，1待批准，2已批准)
    type        INT,                                     # 类型(1事假，2病假，3其他)
    teacher1_id INT,                                     # 辅导员id
    teacher2_id INT,                                     # 任课教师id
    ensure      varchar(255)                             # 凭证
);


USE leava;
INSERT INTO student (student_id, name, s_class, passwd, room, school)
VALUES (100000001, '张三', '打杂1班',
        'pbkdf2:sha256:150000$cDvA93x3$79773c9e9448c22cb75f94423a698d335dbcbbeab139adcbca6c9783d10f7c84', '宿舍001',
        '计算机学院'),
       (100000002, '李四', '打杂1班',
        'pbkdf2:sha256:150000$L3X9l8hU$0dcf420c65e20825934df40049eeab437042086dd6c8eadcb3358b446aef915a', '宿舍001',
        '计算机学院'),
       (100000003, '王五', '打杂2班',
        'pbkdf2:sha256:150000$rMbZns4M$28fa6f1f3ddd3059b085395b2075dd991c294d01c3d0f207eea16ba857c2e224', '宿舍002',
        '计算机学院');

INSERT INTO teacher (teacher_id, name, passwd, role, school)
VALUES (100001, '刘老师', 'pbkdf2:sha256:150000$3LVaRjN9$05c5c1dad89799b22cff93c7137591cc06fb591d2d417ae46481383b8171cbe6',
        0, '计算机学院'),
       (100002, '王老师', 'pbkdf2:sha256:150000$pX2zIo3P$b5a6e73cc415bf15f33904a25fbe9d8f096ff71e4da1221a57e505d5b8d76590',
        1, '计算机学院');