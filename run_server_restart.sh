sudo kill -9 `cat pid.log`
PORT=4000 nohup node server >> app.log 2>&1 &
echo $! > pid.log
