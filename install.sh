if apt-get -v > /dev/null; then sudo apt-get -y install python3 python-pip python3-pip python3-tk nodejs npm tk build-essential libudev-dev; fi
if pacman -V > /dev/null; then sudo pacman -Sy --noconfirm --needed python3 python-pip nodejs npm tk base-devel; fi
sudo mkdir /opt/MonsterKeyboard
npm install
sudo cp -r ./* /opt/MonsterKeyboard
sudo cp ./.node-version /opt/MonsterKeyboard
cd /opt/MonsterKeyboard
sudo pip3 install appjar
sudo mv /opt/MonsterKeyboard/MonsterKeyboard.desktop /usr/share/applications
sudo mv /opt/MonsterKeyboard/monster-kb.service /lib/systemd/system
sudo systemctl enable monster-kb
sudo systemctl daemon-reload
