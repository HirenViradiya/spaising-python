from app import app
from model.user_model import user_model
from flask import request
from datetime import datetime
import traceback
from flask import make_response, send_from_directory

obj = user_model()

@app.route("/users")
def users_list():
    try:
        res =  obj.get_user_list()
        if len(res)>0:
            return make_response({"data": res,"message": "Data Fetched Successfully"},200)
        else:
            return make_response({"data":[],"message": "No Data Found"},200)
    except Exception as e:
            print(e)
            traceback.print_exc() 
            return make_response({"data":[],"message": "Something Went Wrong!"},500)


@app.route("/users/name")
def user_name():
    try:
        res =  obj.get_user_name()
        if len(res)>0:
            return make_response({"data": res,"message": "Data Fetched Successfully"},200)
        else:
            return make_response({"data":[],"message": "No Data Found"},200)
    except Exception as e:
        print(e)
        traceback.print_exc() 
        return make_response({"data":[],"message": "Something Went Wrong!"},500)
        
    
@app.route("/user", methods=["POST","PUT"])
def user():
    try: 

        user_id = request.form.get('id')

        if user_id:
            user_id = request.form['id']

        db_path = ''
        if(request.files):
            file = request.files['image']
            new_filename = str(datetime.now().timestamp()).replace(".", "")
            split_filename = file.filename.split(".")
            ext_pos = len(split_filename)-1
            ext = split_filename[ext_pos] 
            db_path = f"uploads/{new_filename}.{ext}"
            file.save(f"uploads/{new_filename}.{ext}")
        obj.user_create(request.form,db_path)
        if user_id is not None:
            return make_response({"message": "User Updated Successfully!"},200)
        else:
            return make_response({"message": "User Created Successfully!"},200)
    except Exception as e:
        print(e)
        traceback.print_exc() 
        return make_response({"data":[],"message": "Something Went Wrong!"},500)


@app.route("/user/delete/<id>", methods=["DELETE"])
def user_delete(id):
    try:
        data = obj.delete_user(id)
        if data > 0:
            return make_response({"message": "User Deleted Successfully!"},200)
        else:
            return make_response({"message": "Nothing to Delete"},202)  
    except Exception as e:
        print(e)
        traceback.print_exc() 
        return make_response({"data":[],"message": "Something Went Wrong!"},500)


@app.route("/user/edit/<id>", methods=["GET"])
def user_edit(id):
    try:
        data = obj.get_user_by_id(id)
        if len(data)>0:
            return make_response({"data":data,"message": "User Fetched Successfully!"},200) 
        else:
            return make_response({"data":[],"message": "Nothing to Fetch!"},202) 
    except Exception as e:
            print(e)
            traceback.print_exc() 
            return make_response({"data":[],"message": "Something Went Wrong!"},500)
            

@app.route("/user/view/<id>", methods=["GET"])
def user_view(id):
    try:
        data = obj.get_user_detail(id)
        if len(data)>0:
            return make_response({"data":data,"message": "User Fetched Successfully!"},200) 
        else:
            return make_response({"data":[],"message": "Nothing to Fetch!"},202) 
    except Exception as e:
            print(e)
            traceback.print_exc() 
            return make_response({"data":[],"message": "Something Went Wrong!"},500)
    
@app.route('/uploads/<path:filename>')
def show_file(filename):
    return send_from_directory('uploads', filename)