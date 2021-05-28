let curBase = tableSel.options[tableSel.options.selectedIndex].value
tableSel.addEventListener("change", function () {
    curBase = this.options[this.options.selectedIndex].value
    let test = connectToBase(curBase)
    test.then(i=>{console.log(test)})
    // console.log(test);
})

async function connectToBase(base) {
    let json
    let data_body = "?base=" + base ;
    json = await fetch("get.php"+data_body, {
            method: "GET",
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
        .then(res => {
            json = JSON.parse(res);
        })
    return json
}
// function getScore() {
//     fetch("https://src.godison.ru/phps/getScore.php", {
//             method: "GET",
//             headers: {
//                 "content-type": "application/x-www-form-urlencoded",
//                 "Origin": "http://localhost"
//             }
//         })
//         .then(response => {
//             if (response.status !== 200) {
//                 return Promise.reject();
//             }
//             return response.text()
//         })
//         .then(i => {
//             res = Object.values(JSON.parse(i))
//             console.log(res);
//             res.sort((a,b)=>{
//                 return b.score - a.score
//             })
//             let inc = 0
//             for(let el of res){
//                 inc++
//                 let pre = document.createElement("li")
//                 pre.innerHTML = "\t"+el.Name +": \t"+el.score+""
//                 mainPre.appendChild(pre)
//             }
//             return res
//         })
//         .catch((err) => console.log(err));
// }

// function setScore(name, score) {
//     let res = ""
//     let data_body = "Name=" + name + "&score=" + score;
//     fetch("phps/setScore.php", {
//             method: "POST",
//             body: data_body,
//             headers: {
//                 "content-type": "application/x-www-form-urlencoded",
//             }
//         })
//         .then(response => {
//             if (response.status !== 200) {
//                 return Promise.reject();
//             }
//             return response.text()
//         })
//         .then(i => {
//             res = i
//             console.log(res);
//         })
//         .catch(() => console.log('ошибка'));
// }
// getScore()