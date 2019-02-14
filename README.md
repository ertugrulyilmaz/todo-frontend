docker run --name=mysql8 -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:8.0.13 --default_authentication_plugin=mysql_native_password
