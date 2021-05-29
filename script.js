let curBase = tableSel.options[tableSel.options.selectedIndex].value
tableSel.addEventListener("change", function () {
    curBase = this.options[this.options.selectedIndex].value
    let table = getTables(curBase)
    table.then(res=>{
        tables.innerHTML = ""
        columns.innerHTML = ""
        let sel =createSelect(res)
        function changeEv(){
            let curTable = sel.options[sel.options.selectedIndex].value
            // let column = getColumns(curBase,curTable)
            // column.then(res1=>{
            //     columns.innerHTML =""
            //     let sel1 = createSelect(res1)
            //     columns.appendChild(sel1)
            // })
            createTable(curTable)
        }
        sel.addEventListener("change", changeEv)
        tables.appendChild(sel) 
        changeEv()
    })
})
function createSelect(options){
    function createOption(value){
        let nOpt = document.createElement("option")
        nOpt.value = value
        nOpt.text = value
        return nOpt
    }
    let nSel = document.createElement("select")
    nSel.classList.add("form-select")
    options.forEach(row => {
        nSel.appendChild(createOption(row[0]))
    });
    return nSel
}
async function createTable(table){
    let columns = await getColumns(curBase,table).then(res => {return res})
    let data = await getAllTableData(curBase,table).then(res => {return res})
    tHead.innerHTML = ''    
    tBody.innerHTML = ''    
    let str = "<tr>"
    columns.forEach(col => {
        str+="<th scope='col'>"+col[0]+"</th>"
    });
    str += "</tr>"
    tHead.innerHTML=str
    data.forEach(row=>{
        str = "<tr>"
        row.forEach(item=>{
            str += "<td>"+item+"</td>"
        })
        str += "</tr>"
        tBody.innerHTML+=str
    })
}
async function getAllTableData(base,table){
    let data_body = "?base=" + base + "&table=" + table;
    let call = fetch("getAllTableData.php"+data_body)
    .then( res =>{
        if(res.ok)return res.json()
        else alert( "Connection error " + call.status )
    })
    return call
}
async function getTables(base) {
    let data_body = "?base=" + base ;
    let call = fetch("getTables.php"+data_body)
    .then( res =>{
        if(res.ok)return res.json()
        else alert( "Connection error " + call.status )
    })
    return call
}
async function getColumns(base,table) {
    let data_body = "?base=" + base + "&table=" + table;
    let call = fetch("getColumns.php"+data_body)
    .then( res =>{
        if(res.ok)return res.json()
        else alert( "Connection error " + call.status )
    })
    return call
}
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