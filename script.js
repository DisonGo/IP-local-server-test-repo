class Krot {
    constructor(w, h) {
        // this._x = x
        // this._y = y
        this.w = w
        this.h = h
        this.mode = "W"
        this.cooldown = false
        this.krotImgs = {
            A: "imgs/krotAlive.png",
            D: "imgs/krotDead.png",
            W: "imgs/krotWaiting.png",
        }
        this.style = {
            img: this.krotImgs.W,
            className: "krot"
        }
    }
    createNode() {
        let newKrot = document.createElement("div")
        this.node = newKrot
        newKrot.classProt = this
        let cl = this
        newKrot.classList.add(this.style.className)
        // newKrot.style.top = this._y+"px"
        // newKrot.style.left = this._x+"px"
        newKrot.style.width = this.w + "px"
        newKrot.style.height = this.h + "px"
        // newKrot.style.border= "1px solid black"
        newKrot.style.backgroundImage = "url(" + this.style.img + ")"
        newKrot.addEventListener("click", function () {
            if (cl.mode == "A") {
                cl.setMode("D")
                cl.cooldown = true
                clearTimeout(cl.hideTimer)
                score++
                scor.innerHTML = score
                this.style.transform = "rotate(360deg)"
                setTimeout(() => {
                    cl.cooldown = false
                    cl.setMode("W")
                    this.style.transform = "rotate(0)"
                }, 1000)
            }
            if(cl.mode == "W"){
                score--
                scor.innerHTML = score
            }
        })
        return newKrot
    }
    setMode(x) {
        switch (x) {
            case "A":
                this.mode = x
                this.style.img = this.krotImgs.A
                break
            case "D":
                this.mode = x
                this.style.img = this.krotImgs.D
                break
            case "W":
                this.mode = x
                this.style.img = this.krotImgs.W
                break
        }
        this.node.style.backgroundImage = "url(" + this.style.img + ")"
    }
    hide(time) {
        this.hideTimer = setTimeout(() => {
            this.setMode("W")
            this.node.style.transform = "translateY(0px)"
        }, time);
    }
}
let container = document.getElementById("cont")
let scor = document.getElementById("score")
let timer = document.getElementById("timer")
let krots = []
let size = 5
let speed = 200
let score = 0
let Timeleft = 10
let w = 50,
    h = 50,
    margins = 5
let player = {
    Name:"",
    score:0
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
const baseDespawnTime = 400
let difValue = parseInt(difficulty.value)
let maxDespawnTime = baseDespawnTime + difValue
start.addEventListener("click", () => {
    console.log(Name.value)
    if(Name.value==""){
        Name.style.border = "1px solid red"
    }else{
        player.Name = Name.value
        Name.remove()
        startGame()
    }
})

function startGame() {
    start.remove()
    container.style.width = size * w + margins * (size + 1) + "px"
    container.style.height = size * h + margins * (size + 1) + "px"
    container.style.gap = margins + "px"
    for (let i = 0; i < size * size; i++) {
        krots.push(new Krot(w, h))
        container.appendChild(krots[krots.length - 1].createNode())
    }
    let time = setInterval(() => {
        let rand = Math.round(getRandom(0, size * size - 1))
        let randTime = Math.round(getRandom(baseDespawnTime, maxDespawnTime))
        if (!krots[rand].cooldown) {
            krots[rand].setMode("A")
            krots[rand].node.style.transform = "translateY(-10px)"
            // krots[rand].hitSound = new Audio("")
            // krots[rand].hitSound.src = "audio/mishka.mp3"
            // krots[rand].hitSound.play()
            krots[rand].hide(randTime)
        }
    }, speed);
    let endTimer
    timer.innerHTML = "Time left: " + Timeleft
    document.title = "Time: " + Timeleft

    function endTimerFunc() {
        Timeleft--
        timer.innerHTML = "Time left: " + Timeleft
        document.title = "Time: " + Timeleft
        if (Timeleft) {
            endTimer = setTimeout(endTimerFunc, 1000)
        } else {
            container.remove()
            timer.remove()
            inputbox.remove()
            clearInterval(time)
            player.score = score
            scor.innerHTML =  player.Name+"'s score: " + scor.innerHTML
            setScore(player.Name,player.score)
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }
    endTimer = setTimeout(endTimerFunc, 1000)
    difficulty.addEventListener("input", function () {
        difValue = parseInt(difficulty.value)
        maxDespawnTime = baseDespawnTime + difValue
    })
}

function getScore() {
    fetch("https://src.godison.ru/phps/getScore.php", {
            method: "GET",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Origin": "http://localhost"
            }
        })
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            return response.text()
        })
        .then(i => {
            res = Object.values(JSON.parse(i))
            console.log(res);
            res.sort((a,b)=>{
                return b.score - a.score
            })
            let inc = 0
            for(let el of res){
                inc++
                let pre = document.createElement("li")
                pre.innerHTML = "\t"+el.Name +": \t"+el.score+""
                mainPre.appendChild(pre)
            }
            return res
        })
        .catch((err) => console.log(err));
}

function setScore(name, score) {
    let res = ""
    let data_body = "Name=" + name + "&score=" + score;
    fetch("phps/setScore.php", {
            method: "POST",
            body: data_body,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            return response.text()
        })
        .then(i => {
            res = i
            console.log(res);
        })
        .catch(() => console.log('ошибка'));
}
getScore()