#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:               2018/8/5 11:14
# @Author:            Joey66666
# @Software         VSCode

import json
import logging
import time
import base64

from decimal import *

from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy import create_engine, MetaData, create_engine, MetaData, Table, Column, Date, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import \
    BIGINT, BINARY, BIT, BLOB, BOOLEAN, CHAR, DATE, \
    DATETIME, DECIMAL, DECIMAL, DOUBLE, ENUM, FLOAT, INTEGER, \
    LONGBLOB, LONGTEXT, MEDIUMBLOB, MEDIUMINT, MEDIUMTEXT, NCHAR, \
    NUMERIC, NVARCHAR, REAL, SET, SMALLINT, TEXT, TIME, TIMESTAMP, \
    TINYBLOB, TINYINT, TINYTEXT, VARBINARY, VARCHAR, YEAR


app = Flask('test')

# # 配置数据库连接
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://user:passwd@IP:port/DB'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


db = SQLAlchemy(app)


@app.route('/')
def hello():
    return "LeaveMiniprogram-Api page"


@app.route("/login", methods=['GET', 'POST'])
def login():
    if (request.method == 'POST'):
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()

            rec_id = data['userId']
            rec_pwd = data['userPwd']

            if len(str(rec_id)) == 6:
                db_data = search_t(str(rec_id))
                if (db_data) is None:
                    return_data = dict()
                    return_data['flag'] = '0'
                    return jsonify(return_data)
                else:
                    db_id = str(
                        Decimal(db_data['teacher_id']).quantize(Decimal('0')))
                    db_name = db_data['name']
                    db_pwd = db_data['passwd']
                    db_role = db_data['role']
                    db_school = db_data['school']

                    if check_password_hash(str(db_pwd),str(rec_pwd)) is not True:
                        return_data = dict()
                        return_data['flag'] = '1'
                        return_data['teacher_id'] = rec_id
                        return jsonify(return_data)
                    elif check_password_hash(str(db_pwd),str(rec_pwd)) is True:
                        return_data = dict()
                        db_id = str(
                            Decimal(db_data['teacher_id']).quantize(Decimal('0')))
                        return_data['teacher_id'] = db_id
                        return_data['name'] = db_name
                        return_data['role'] = db_role
                        return_data['school'] = db_school
                        return_data['flag'] = '2'

                        return (jsonify(return_data))
            if len(str(rec_id)) == 9:
                db_data = search_s(str(rec_id))
                if (db_data) is None:
                    return_data = dict()
                    return_data['flag'] = '0'
                    return jsonify(return_data)

                else:
                    db_id = str(
                        Decimal(db_data['student_id']).quantize(Decimal('0')))
                    db_name = db_data['name']
                    db_pwd = db_data['passwd']
                    db_class = db_data['s_class']
                    db_room = db_data['room']
                    if check_password_hash(str(db_pwd),str(rec_pwd)) is not True:
                        return_data = dict()
                        return_data['flag'] = '1'
                        return_data['student_id'] = rec_id
                        return jsonify(return_data)


                    elif check_password_hash(str(db_pwd),str(rec_pwd)) is True:
                        return_data = dict()
                        db_id = str(
                            Decimal(db_data['student_id']).quantize(Decimal('0')))
                        return_data['student_id'] = db_id
                        return_data['name'] = db_name
                        return_data['s_class'] = db_data['s_class']
                        return_data['room'] = db_data['room']
                        return_data['flag'] = '2'
                        return (jsonify(return_data))

            else:

                return_data = dict()
                return_data['flag'] = '0'
                return jsonify(return_data)


    else:
        return jsonify('not POST method')



@app.route("/student/ask_leave", methods=['GET', 'POST'])
def ask_leave():
    if (request.method == 'POST'):
        if not (request.json):
            return jsonify('not json')
        else:
            try:
                data = request.get_json()

                student_id = data['student_id']
                start_time = data['start_time']
                end_time = data['end_time']
                reason = data['reason']
                flag = data['flag']
                teacher1_id = data['teacher1_id']
                teacher2_id = data['teacher2_id']
                s_type = data['type']
                ensure = data['ensure']

                insert = insert_leave(student_id, start_time, end_time, reason, flag, teacher1_id, teacher2_id, s_type,
                                      ensure)
                if (insert == True):
                    return ('True')
                else:
                    return ('False')

            except Exception:
                return("ERROR")

    else:
        return jsonify('not POST method')


@app.route("/student/search_leave", methods=['GET', 'POST'])
def search_s_leave():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            student_id = data['student_id']
            result = search_stu_leave(student_id)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/student/search_leave_detail", methods=['GET', 'POST'])
def search_s_leave_detail():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            student_id = data['student_id']
            result = search_stu_leave_detail(student_id)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/teacher/search_leave", methods=['GET', 'POST'])
def search_t_leave():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            teacher_id = data['teacher_id']
            result = search_tea_leave(teacher_id)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/teacher2/search_leave", methods=['GET', 'POST'])
def search_t2_leave():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            teacher_id = data['teacher_id']
            result = search_tea2_leave(teacher_id)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/teacher/update_leave", methods=['GET', 'POST'])
def update_leave():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            leave_num = data['leave_num']
            flag = data['flag']
            result = update_leave(leave_num, flag)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/teacher/search_id", methods=['GET', 'POST'])
def search_t_id():
    if request.method == 'POST':
        if not (request.json):
            return jsonify('not json')
        else:
            data = request.get_json()
            school = data['school']
            result = search_t_id(school)
            return (result)

    else:
        return jsonify("not POST")



@app.route("/change_pwd", methods=['GET', 'POST'])
def change_pwd():
    if (request.method == 'POST'):
        if not (request.json):
            return jsonify('not json')
        else:
            try:
                data = request.get_json()
                rec_id = data['userId']
                rec_pwd = data['userPwd']
                change_passwd(rec_id, rec_pwd)
                return jsonify("True")

            except:
                return jsonify("False")

    else:
        return jsonify('not POST method')


@app.route("/search_name",methods=['GET','POST'])
def search_name():
    if (request.method == 'POST'):
        if not (request.json):
            return jsonify('not json')
        else:
            # try:
                data = request.get_json()
                rec_name = data['name']
                try:
                    return_data=search_name(rec_name)
                except:
                    return jsonify("name is not exist")
                else:
                    return jsonify(return_data)

    else:
        return jsonify('not POST method')


class student(db.Model):
    __tablename__ = 'student'
    student_id = db.Column(db.DECIMAL(65), primary_key=True)
    name = db.Column(db.VARCHAR(255))
    s_class = db.Column(db.VARCHAR(255))
    passwd = db.Column(db.VARCHAR(255))
    room = db.Column(db.VARCHAR(255))
    school = db.Column(db.VARCHAR(255))

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


class teacher(db.Model):
    __tablename__ = 'teacher'
    teacher_id = db.Column(db.DECIMAL(65), primary_key=True)
    name = db.Column(db.VARCHAR(255))
    passwd = db.Column(db.VARCHAR(255))
    role = db.Column(db.VARCHAR(2))
    school = db.Column(db.VARCHAR(255))

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


class leave(db.Model):
    __tablename__ = 'leave'
    leave_num = db.Column(db.DECIMAL(65), primary_key=True)
    student_id = db.Column(db.DECIMAL(65))
    start_time = db.Column(db.DATETIME)
    end_time = db.Column(db.DATETIME)
    reason = db.Column(db.VARCHAR(255))
    flag = db.Column(db.VARCHAR(2))
    teacher1_id = db.Column(db.DECIMAL(65))
    teacher2_id = db.Column(db.DECIMAL(65))
    type = db.Column(db.VARCHAR(2))
    ensure = db.Column(db.VARCHAR(255))

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

# 字符串转二进制
def b_encode(s):
    return(''.join([bin(ord(c)).replace('0b', '')for c in s]))

# 二进制转字符串
def b_decode(s):
    return(''.join([chr(i)for i in [int(b, 2)for b in s.split('')]]))


def search_t(id):
    result = teacher.query.filter_by(teacher_id=id).first()
    if result is None:
        return (None)
    else:
        return (result.to_dict())


def search_s(id):
    result = student.query.filter_by(student_id=id).first()
    if result is None:
        return (None)
    else:
        return (result.to_dict())


def insert_leave(student_id, start_time, end_time, reason, flag, teacher1_id, teacher2_id, s_type, ensure):
    engine = create_engine(
        'mysql+mysqlconnector://user:passwd@IP:port/DB')
    metadata = MetaData(engine)
    # 连接数据表
    leave_table = Table('leave', metadata, autoload=True)
    try:  # 创建 insert 对象
        ins = leave_table.insert()
        # 绑定要插入的数据
        ins = ins.values(student_id=student_id, start_time=start_time, end_time=end_time, reason=reason, flag=flag,
                         teacher1_id=teacher1_id, teacher2_id=teacher2_id, type=s_type, ensure=ensure)
        # 连接引擎
        conn = engine.connect()
        # 执行语句
        result = conn.execute(ins)
        return (True)
    except:
        print(result)
        return (False)


def search_stu_leave(id):
    result = leave.query.filter_by(student_id=id).all()
    if result is None:
        return (None)
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            leave_num = result[i].to_dict()['leave_num']
            start_time = str(result[i].to_dict()['start_time'])
            end_time = str(result[i].to_dict()['end_time'])
            reason = result[i].to_dict()['reason']
            flag = result[i].to_dict()['flag']
            teacher1_id = str(Decimal(result[i].to_dict()[
                              'teacher1_id']).quantize(Decimal('0')))
            teacher2_id = str(Decimal(result[i].to_dict()[
                              'teacher2_id']).quantize(Decimal('0')))
            data_type = result[i].to_dict()['type']
            ensure = result[i].to_dict()['ensure']

            temp_data['leave_num'] = leave_num
            temp_data['start_time'] = start_time
            temp_data['end_time'] = end_time
            temp_data['reason'] = reason
            temp_data['flag'] = flag
            temp_data['teacher1_id'] = teacher1_id
            temp_data['teacher2_id'] = teacher2_id
            temp_data['type'] = data_type
            temp_data['ensure'] = ensure

            return_data[i] = temp_data
            i += 1
        return (jsonify(return_data))


def search_stu_leave_detail(id):
    result = student.query.filter_by(student_id=id).all()
    if result is None:
        return (None)
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            student_id = str(Decimal(result[i].to_dict()[
                             'student_id']).quantize(Decimal('0')))
            name = result[i].to_dict()['name']
            s_class = result[i].to_dict()['s_class']
            room = result[i].to_dict()['room']

            temp_data['student_id'] = student_id
            temp_data['name'] = name
            temp_data['class'] = s_class
            temp_data['room'] = room
            return_data[i] = temp_data
            i += 1
        return (jsonify(return_data))


def search_tea_leave(id):
    result = leave.query.filter_by(teacher1_id=id).all()
    if result is None:
        return (None)
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            leave_num = result[i].to_dict()['leave_num']
            student_id = str(Decimal(result[i].to_dict()[
                             'student_id']).quantize(Decimal('0')))
            start_time = str(result[i].to_dict()['start_time'])
            end_time = str(result[i].to_dict()['end_time'])
            reason = result[i].to_dict()['reason']
            flag = result[i].to_dict()['flag']
            teacher1_id = str(Decimal(result[i].to_dict()[
                              'teacher1_id']).quantize(Decimal('0')))
            teacher2_id = str(Decimal(result[i].to_dict()[
                              'teacher2_id']).quantize(Decimal('0')))
            data_type = result[i].to_dict()['type']
            ensure = result[i].to_dict()['ensure']

            print(leave_num, start_time, end_time, reason, flag,
                  teacher1_id, teacher2_id, data_type, ensure)

            temp_data['leave_num'] = leave_num
            temp_data['student_id'] = student_id
            temp_data['start_time'] = start_time
            temp_data['end_time'] = end_time
            temp_data['reason'] = reason
            temp_data['flag'] = flag
            temp_data['teacher1_id'] = teacher1_id
            temp_data['teacher2_id'] = teacher2_id
            temp_data['type'] = data_type
            temp_data['ensure'] = ensure

            return_data[i] = temp_data
            i += 1
        return (jsonify(return_data))


def search_tea2_leave(id):
    result = leave.query.filter_by(teacher2_id=id).all()
    if result is None:
        return jsonify("None")
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            leave_num = result[i].to_dict()['leave_num']
            student_id = str(Decimal(result[i].to_dict()[
                             'student_id']).quantize(Decimal('0')))
            start_time = str(result[i].to_dict()['start_time'])
            end_time = str(result[i].to_dict()['end_time'])
            reason = result[i].to_dict()['reason']
            flag = result[i].to_dict()['flag']
            teacher1_id = str(Decimal(result[i].to_dict()[
                              'teacher1_id']).quantize(Decimal('0')))
            teacher2_id = str(Decimal(result[i].to_dict()[
                              'teacher2_id']).quantize(Decimal('0')))
            data_type = result[i].to_dict()['type']
            ensure = result[i].to_dict()['ensure']
            temp_data['leave_num'] = leave_num
            temp_data['student_id'] = student_id
            temp_data['start_time'] = start_time
            temp_data['end_time'] = end_time
            temp_data['reason'] = reason
            temp_data['flag'] = flag
            temp_data['teacher1_id'] = teacher1_id
            temp_data['teacher2_id'] = teacher2_id
            temp_data['type'] = data_type
            temp_data['ensure'] = ensure

            return_data[i] = temp_data
            i += 1
        return (jsonify(return_data))


def search_s_name(name):
    result = student.query.filter_by(name=name).first()
    if result is None:
        return (None)
    else:
        return (result.to_dict())

def search_name(name):
    student_data = search_s_name(name)
    student_id=str(Decimal(student_data['student_id']).quantize(Decimal('0')))
    student_name=student_data['name']
    student_class=student_data['s_class']
    student_room=student_data['room']
    student_school=student_data['school']
    
    result = leave.query.filter_by(student_id=student_id).all()

    if result is None:
        return jsonify("None")
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            leave_num = result[i].to_dict()['leave_num']
            start_time = str(result[i].to_dict()['start_time'])
            end_time = str(result[i].to_dict()['end_time'])
            reason = result[i].to_dict()['reason']
            flag = result[i].to_dict()['flag']
            teacher1_id = str(Decimal(result[i].to_dict()['teacher1_id']).quantize(Decimal('0')))
            teacher2_id = str(Decimal(result[i].to_dict()['teacher2_id']).quantize(Decimal('0')))
            data_type = result[i].to_dict()['type']
            ensure = result[i].to_dict()['ensure']


            temp_data['leave_num'] = leave_num
            temp_data['start_time'] = start_time
            temp_data['end_time'] = end_time
            temp_data['reason'] = reason
            temp_data['flag'] = flag
            temp_data['teacher1_id'] = teacher1_id
            temp_data['teacher2_id'] = teacher2_id
            temp_data['type'] = data_type
            temp_data['ensure'] = ensure
            temp_data['student_id']=student_id
            temp_data['class']=student_class
            temp_data['room']=student_room
            temp_data['school']=student_school
            temp_data['name']=student_name

            return_data[i] = temp_data
            i += 1
        return (return_data)



def update_leave(leave_num, flag):
    try:
        data = db.session.query(leave).filter_by(leave_num=leave_num).first()
        data.flag = flag
        db.session.commit()
        db.session.close()
        return jsonify("True")
    except:
        return jsonify("False")


def search_t_id(school):
    result = teacher.query.filter_by(school=school).all()
    if result is None:
        return jsonify("None")
    else:
        result_length = len(result)
        return_data = {}
        i = 0
        while i < result_length:
            temp_data = dict()

            teacher_id = str(Decimal(result[i].to_dict()[
                             'teacher_id']).quantize(Decimal('0')))
            name = result[i].to_dict()['name']
            role = result[i].to_dict()['role']
            temp_data['teacher_id'] = teacher_id
            temp_data['name'] = name
            temp_data['role'] = role
            return_data[i] = temp_data
            i += 1
        return (jsonify(return_data))


def change_passwd(userId, userPwd):
    if len(str(userId)) == 6:
        try:
            data = db.session.query(teacher).filter_by(
                teacher_id=userId).first()
            data.passwd = generate_password_hash(str(userPwd))
            db.session.commit()
            db.session.close()
            return jsonify("True")
        except:
            return jsonify("False")
    elif len(str(userId)) == 9:
        try:
            data = db.session.query(student).filter_by(
                student_id=userId).first()
            data.passwd = generate_password_hash(str(userPwd))
            db.session.commit()
            db.session.close()
            return jsonify("True")
        except:
            return jsonify("False")


if __name__ == '__main__':
    # db = None
    app.run(host='0.0.0.0', port=8080, debug=True)
