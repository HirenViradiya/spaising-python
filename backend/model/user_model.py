import mysql.connector
from flask import make_response
import os
from datetime import datetime
import traceback

class user_model():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(
                host=os.getenv('DB_HOST'),
                user=os.getenv('DB_USERNAME'),
                password=os.getenv('DB_PASSWORD'),
                database=os.getenv('DB_NAME')
            )
            self.con.autocommit = True
            self.cursor = self.con.cursor(dictionary=True, buffered=True)
            print("Connection Successful")
        except Exception as e:
            print("Some error occurred!")
            print(e)
            traceback.print_exc() 


    def get_user_list(self):
        try:
            query =f"""SELECT 
                    u1.id, 
                    u1.first_name,
                    u1.last_name, 
                    u1.email, 
                    u1.phone, 
                    u1.image, 
                    u1.parent_id, 
                    p.first_name AS parent_name, 
                    p.email AS parent_email 
                FROM 
                    users AS u1 
                LEFT JOIN users AS p ON u1.parent_id = p.id"""
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            return result
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False 


    def get_user_name(self):
        try:
            query = f"SELECT id,first_name,last_name FROM users"
            self.cursor.execute(query)
            result = self.cursor.fetchall()
            return result
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False 


    def user_create(self,data,path=""):
        try: 
            value_query = ''
            print(path)
            if 'id' not in data:
                base_query = "INSERT INTO users(first_name, last_name, email, dob, phone"
                value_query = f" VALUES('{data['first_name']}', '{data['last_name']}', '{data['email']}', '{data['dob']}', '{data['phone']}'"

                if path:
                    base_query += ", image"
                    value_query += f", '{path}'"

                if 'parent_id' in data:
                    base_query += ", parent_id)"
                    value_query += f", '{data['parent_id']}'"
                else:
                    base_query += ")"

                value_query += ")"


            else:

                base_query = f"UPDATE users SET first_name='{data['first_name']}', last_name='{data['last_name']}', email='{data['email']}', dob='{data['dob']}', phone='{data['phone']}'"

                if path:
                    self.cursor.execute(f"SELECT image FROM users WHERE id={data['id']}")
                    image_path = self.cursor.fetchone()
                    if image_path['image'] is not None and os.path.exists(image_path['image']):
                        os.remove(image_path['image'])

                    base_query += f", image='{path}'"

                if 'parent_id' in data and data['parent_id'] is not None:
                    base_query += f", parent_id={data['parent_id']}"

                base_query += f" WHERE id={data['id']}"

            query = base_query + value_query
            print(query)
            result = self.cursor.execute(query)
            return result
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False


    def delete_user(self,id):
        try:

            self.cursor.execute(f"SELECT image FROM users WHERE id={id}")
            image_path = self.cursor.fetchone()
            if image_path['image'] is not None and os.path.exists(image_path['image']):
                os.remove(image_path['image'])
            self.cursor.execute(f"DELETE FROM users WHERE id={id}")
            return self.cursor.rowcount
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False


    def get_user_by_id(self,id):
        try:
            self.cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            data = self.cursor.fetchone()

            if data and 'dob' in data and data['dob']:
                data['dob'] = data['dob'].strftime("%Y-%m-%d")

            query = "SELECT id, first_name, last_name FROM users WHERE id != %s"
            self.cursor.execute(query, (id,))
            result = self.cursor.fetchall()

            data['users'] = result
            return data
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False


    def get_user_detail(self,id):
        try:

            query =f"""SELECT 
                u1.id,
                u1.first_name,
                u1.last_name, 
                u1.email, 
                u1.image, 
                u1.phone, 
                u1.parent_id, 
                p.first_name 
                AS parent_name,
                p.email AS parent_email
            FROM 
                users AS u1 
            LEFT JOIN users AS p ON u1.parent_id = p.id 
                WHERE u1.id={id}"""
            self.cursor.execute(query)
            result = self.cursor.fetchone()
            return result 
        except Exception as e:
            print(e)
            traceback.print_exc() 
            return False