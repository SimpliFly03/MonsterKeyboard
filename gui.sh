cd /opt/MonsterKeyboard
nohup python3 /opt/MonsterKeyboard/gui.py "$@" > /dev/null 2>&1 & disown
sleep 1
