# import the library
from appJar import gui
import os
import subprocess
# handle button events
def f(x):
    return {
        'Off': '0',
        'Single Color': '1',
        'Fade': '2',
        'Wave': '3',#--
        'Dots': '4',#
        'Rainbow': '5',
        'Explosion': '6',#
        'Snake': '7',
        'Raindrops': '8',
        'Lines': '9',#
        'Firework': '10',#
    }[x]
def g(x):
    return {
        'Left to Right': '01',
        'Right to Left': '02',
        'Down to Up': '03',
        'Up to Down': '04',
        'Auto': '00',
        'Key Press': '01',
    }[x]
def send():
    if app.getScale("R") < 10:
        colorred = "00" + str(app.getScale("R"))
    elif 9 < app.getScale("R") < 100:
        colorred = "0" + str(app.getScale("R"))
    else:
        colorred = str(app.getScale("R"))

    if app.getScale("G") < 10:
        colorgreen = "00" + str(app.getScale("G"))
    elif 9 < app.getScale("G") < 100:
        colorgreen = "0" + str(app.getScale("G"))
    else:
        colorgreen = str(app.getScale("G"))

    if app.getScale("B") < 10:
        colorblue = "00" + str(app.getScale("B"))
    elif 9 < app.getScale("B") < 100:
        colorblue = "0" + str(app.getScale("B"))
    else:
        colorblue = str(app.getScale("B"))
    
    if app.getScale("Bright") <= 1:
        bright = "0" + str(app.getScale("Bright")*8)
    else:
        bright = str(app.getScale("Bright")*8)
    speed = str(8-app.getScale("Speed"))
    
    if int(f(app.getOptionBox("Mode"))) < 10:
        mode = '0' + f(app.getOptionBox("Mode"))
    else:
        mode = f(app.getOptionBox("Mode"))
    
    if mode == '01':
        app.setButtonState("colorpick", "normal")
    else:
        app.setButtonState("colorpick", "disabled")
    
    if mode in ['00', '01','02','05', '07', '08']:
        app.hideOptionBox("Rotation")
        app.hideOptionBox("Trigger")
        trigger = '00'
        rotation = '01'
    elif mode in ['03']:
        app.showOptionBox("Rotation")
        app.hideOptionBox("Trigger")
        rotation = g(app.getOptionBox("Rotation"))
        trigger = '00'
    else:
        app.showOptionBox("Trigger")
        app.hideOptionBox("Rotation")
        trigger = g(app.getOptionBox("Trigger"))
        rotation = '01'
    os.system("echo 'module.exports = {mode: " + mode + "};' > ./config/state.js")
    os.system("echo 'module.exports = {colorred: " + colorred + ", colorgreen: " + colorgreen + ", colorblue: " + colorblue + "};' > ./config/color.js")
    os.system("echo 'module.exports = {bright: " + bright + ", speed: " + speed + "};' > ./config/misc.js")
    os.system("echo 'module.exports = {rotation: " + rotation + ", trigger: " + trigger + "};' > ./config/rotation.js")
    os.system("sudo /usr/bin/node ./index.js")
    

def press(button):
    if button == "Exit":
        app.stop()
    elif button == "colorpick":
        app.showSubWindow("Color Picker")
    else:
        send()

# create a GUI variable called app
app = gui("Monster Keyboard", "500x305", useSettings=False)
app.setBg("white")
app.setFont(18)
app.setIcon("icon.gif")
#top bar
#app.addImage("tobBar", "topBar.png", row=0, column=0, colspan=3)
#cooldown
counter = 3
moved = False
def countdown():
    global counter
    global moved
    if counter > 0:
        counter -= 1
    else:
        if moved == True:
            moved = False
            app.thread(send)
        counter = 3

app.registerEvent(countdown)
def slide():
    global moved
    moved = True
def bypasscd():
    #app.loadSettings()
    #app.setOptionBox("Rotation", int(g(app.getSetting(f(app.getOptionBox("Mode")) + "Rotation"))))
    app.thread(send)
# store config per mode
#def rot():
    #app.setSetting(f(app.getOptionBox("Mode")) + "Rotation", app.getOptionBox("Rotation"))
    #os.system("sudo /usr/bin/node /home/*/MonsterKeyboard/index.js")


# get current color
processcolor = subprocess.check_output(["cat", "./config/color.js"])
getcolorred = int(str(processcolor)[30:33])
getcolorgreen = int(str(processcolor)[47:50])
getcolorblue = int(str(processcolor)[63:66])

#get misc
processmisc = subprocess.check_output(["cat", "./config/misc.js"])
getbright = int(str(processmisc)[28:30])
getspeed = int(str(processmisc)[39])



# add & configure widgets - widgets get a name, to help referencing them later
#app.addLabel("title", "Monster Keyboard")
#app.setLabelBg("title", "green")
#app.setLabelFg("title", "black")


app.addLabelOptionBox("Mode", ["Off", "Single Color", "Fade", "Wave", "Dots", "Rainbow", "Explosion", "Snake", "Raindrops", "Lines", "Firework"], row=1, column=0, colspan=2)
app.setOptionBoxChangeFunction("Mode", bypasscd)
app.addIconButton("colorpick", press, "color-picker", row=1, column=2)
app.setButtonSticky("colorpick", "both")
with app.subWindow("Color Picker", modal=True, transient=True):
    app.setSize(300, 200)
    app.setStretch("both")
    app.setSticky("nesw")
    app.setBg("white")
    app.addLabelScale("R", row=0)
    app.addLabelScale("G", row=1)
    app.addLabelScale("B", row=2)
    app.setScaleRange("R", 0, 255, curr=getcolorred)
    app.showScaleValue("R", show=True)
    app.setScaleRange("G", 0, 255, curr=getcolorgreen)
    app.showScaleValue("G", show=True)
    app.setScaleRange("B", 0, 255, curr=getcolorblue)
    app.showScaleValue("B", show=True)
    app.setScaleBg("R", "white")
    app.setScaleBg("G", "white")
    app.setScaleBg("B", "white")
    app.setScaleChangeFunction("R", slide)
    app.setScaleChangeFunction("G", slide)
    app.setScaleChangeFunction("B", slide)

app.addLabel("Brightlabel", "Brightness", row=2, column=0)
app.setLabelSticky("Brightlabel", "left")
app.addScale("Bright", row=3, column=0, colspan=3)
app.addLabel("Speedlabel", "Speed", row=4, column=0)
app.setLabelSticky("Speedlabel", "left")
app.addScale("Speed", row=5, column=0, colspan=3)

app.setScaleRange("Bright", 0, 4, curr=getbright/8)
app.showScaleValue("Bright", show=True)
app.setScaleBg("Bright", "white")
app.setScaleChangeFunction("Bright", bypasscd)

app.setScaleRange("Speed", 1, 7, curr=8-getspeed)
app.showScaleValue("Speed", show=True)
app.setScaleBg("Speed", "white")
app.setScaleChangeFunction("Speed", bypasscd)
# some other settings
app.addLabelOptionBox("Rotation", ["Left to Right", "Right to Left", "Down to Up", "Up to Down"], row=6, column=0, colspan=2)
app.addLabelOptionBox("Trigger", ["Auto", "Key Press"], row=6, column=0, colspan=2)
app.setOptionBoxChangeFunction("Rotation", bypasscd)
app.setOptionBoxChangeFunction("Trigger", bypasscd)
# link the buttons to the function called press
app.addButtons(["Apply", "Exit"], press, row=7, column=0, colspan=3)
# get current mode
processmode = subprocess.check_output(["cat", "./config/state.js"])
getmode = int(str(processmode)[26:28])
app.setOptionBox("Mode", getmode, callFunction=False)
# get current rottrig
processrot = subprocess.check_output(["cat", "./config/rotation.js"])
getrot = int(str(processrot)[30:32])
gettrig = int(str(processrot)[43:45])
app.setOptionBox("Rotation", getrot-1, callFunction=False)
app.setOptionBox("Trigger", gettrig, callFunction=False)

# start the GUI
app.go()
# echo "module.exports = {mode: 1};" > ./config/state.js
#app.setScaleChangeFunction(title, func)