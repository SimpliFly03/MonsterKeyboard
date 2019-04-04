sudo apt-get install python3 nodejs npm python3-tk
sudo mkdir /opt/MonsterKeyboard
sudo cp -r ./* /opt/MonsterKeyboard
sudo cp ./.node-version /opt/MonsterKeyboard
cd /opt/MonsterKeyboard
sudo npm install
sudo mv /opt/MonsterKeyboard/MonsterKeyboard.desktop /usr/share/applications
sudo mv /opt/MonsterKeyboard/monster-kb.service /lib/systemd/system
sudo systemctl enable monster-kb
sudo systemctl daemon-reload
