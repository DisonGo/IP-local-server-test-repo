
let curBase = baseSel.options[baseSel.options.selectedIndex].value
let curTable = ""
let tableContainer = document.getElementById('tablesCont')
let elementArr = []
function loadUserPage(){
    
}
function loadAdminPage(){

}
function baseChange(){
    curBase = baseSel.options[baseSel.options.selectedIndex].value
    let table = getTables(curBase)
    table.then(res => {
        tables.innerHTML = ""
        columns.innerHTML = ""
        let sel = createSelect(res)
        sel.id = "tableSel"

        function changeEv() {
            curTable = sel.options[sel.options.selectedIndex].value
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
    refreshBut.disabled = false
}
baseSel.addEventListener("change", baseChange)
baseChange()
refreshBut.onclick = () => {
    if (curTable != "") {
        columns.innerHTML = ""
        createTable(curTable)
    }
}
function hideModule(){
    enter.velocity({
        opacity: 0
    }, {
        duration: 200
    }).velocity({
        display: "none"
    })
}
guestBut.addEventListener("click",function(){
    userBlock.classList.remove("hidden")
    hideModule()
})
adminBut.addEventListener("click",function(){
    enterPage1.velocity({
        opacity: 0
    }, {
        duration: 200
    }).velocity({
        display: "none",
    },
    {
        complete: function() { 
            enterPage2.velocity({
                display: "block"
            }).velocity({
                opacity: [1, 0],
        
            }, {
                duration: 200
            })
        }
    })
    if(false){
        enter.velocity({
            opacity: 0
        }, {
            duration: 300
        }).velocity({
            display: "none"
        })
    }
})
const adminPass = "12345"
function adminEnter(){
    let pass = password.value
    if(pass == adminPass)
    {
        adminBlock.classList.remove("hidden")
        hideModule()
    }
}
function createSelect(options) {
    let nSel = document.createElement("select")
    nSel.classList.add("form-select")
    options.forEach(row => {
        nSel.appendChild(createOption(row[0]))
    });
    return nSel
}
async function createForm(){
    let type = document.getElementById('type')
    let marks = document.getElementById('marks')
    let technical = document.getElementById('technical')
    
    let typeCols = await getColumns(curBase,`Типы клапанов (вентелей)`)
    let marksCols = await getColumns(curBase,`Марки`)
    let technicalCols = await getColumns(curBase,`Технические характеристики`)

    let typeData = getAllTableData(curBase,`Типы клапанов (вентелей)`)
    let marksData = getAllTableData(curBase,`Марки`)
    let technicalData = getAllTableData(curBase,`Технические характеристики`)

    await Promise.all([typeData,marksData,technicalData]).then(results =>{
        typeData = doColumnArr(results[0],typeCols)
        marksData = doColumnArr(results[1],marksCols)
        technicalData = doColumnArr(results[2],technicalCols)
        console.log("typeData",typeData);
        console.log("marksData",marksData);
        console.log("technicalData",technicalData);
        createFormSelect(type,{text:'Тип клапана',for:'tipKlapana'},typeData, typeData[0][0])
        createFormSelect(marks,{text:'Марка',for:'marka'},marksData, marksData[1][0])
        createFormSelect(technical,{text:'Давление номинальное',for:'techCharP'},technicalData, technicalData[1][0])
        createFormSelect(technical,{text:'Диаметр номинальный',for:'techCharD'},technicalData, technicalData[2][0])
        createFormSelect(technical,{text:'Присоединение к трубопроводу',for:'techCharC'},technicalData, technicalData[3][0])
        createFormSelect(technical,{text:'Тип привода',for:'techCharT'},technicalData, technicalData[4][0])
    })
}
createForm()
function createLabel(text,forId){
    let nLbl = document.createElement("label")
    nLbl.for = forId
    nLbl.innerHTML = text
    return nLbl
}
function createOption(value) {
    let nOpt = document.createElement("option")
    nOpt.value = value
    nOpt.text = value
    return nOpt
}
function createFormSelect(parent,label,options,column) {
    let nSel = document.createElement("select")
    nSel.classList.add("form-select")
    nSel.id = label.for
    nSel.appendChild(createOption("Нет"))
    options.forEach(row => {
        row = [...new Set(row)]
        if(row[0]==column){
            for(let i = 1;i<row.length;i++){
                nSel.appendChild(createOption(row[i]))
            }
        }
    });
    parent.appendChild(createLabel(label.text,label.for))
    parent.appendChild(nSel)
}
function doColumnArr(Arr, ColNames) {
    let newArr = []
    ColNames.forEach(ell => {
        newArr.push(new Array(ell[0]))
    })
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j < Arr[i].length; j++) {
            newArr[j].push(Arr[i][j])
        }
    }
    return newArr
}
async function getKeys(table) {
    let data_body = "?base=" + curBase + "&table=" + table;
    let call = fetch("getForeignKeys.php" + data_body)
        .then(res => {
            if (res.ok) return res.json()
            else alert("Connection error " + call.status)
        })
    return call
}
async function doKeys(table) {
    return await getKeys(table)
}
async function getRow(table, key, value) {
    let data_body = "?base=" + curBase + "&table=" + table + "&key=" + key + "&value=" + value;
    let call = fetch("getRow.php" + data_body)
        .then(res => {
            if (res.ok) return res.json()
            else alert("Connection error " + call.status)
        })
    return call
}

function cloneArr(arr) {
    let semiArr = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            semiArr[i] = cloneArr(arr[i])
        } else {
            semiArr[i] = arr[i]
        }
    }
    return semiArr
}
async function createTable(table) {
    let columns = await getColumns(curBase, table).then(res => {
        return res
    })
    // columns.shift() 
    columns.forEach(col => {
        col.splice(1)
    })
    let data = await getAllTableData(curBase, table).then(res => {
        return res
    })
    let showData = cloneArr(data)
    let keys = await doKeys(table).then(res => {
        return res
    })
    if (typeof (keys[0]) != 'undefined') {
        let newKeys = []
        keys.forEach(ell => {
            newKeys.push({
                table: ell[0],
                col: ell[1],
                refTable: ell[2],
                refCol: ell[3]
            })
        })
        keys = newKeys
    }
    let colData = doColumnArr(showData, columns)
    console.log(showData);
    console.log();
    for (const key of keys) {
        let refTableColumns = await getColumns(curBase, key.refTable).then(res => {
            return res
        })
        if(refTableColumns[0][0]=='ID')refTableColumns.shift()
        refTableColumns.forEach(col => {
            col.splice(1)
        })
        for (const [colInd, col] of colData.entries()) {
            if (key.col == col[0]) {
                let rows = []
                for (let i = 1; i < col.length; i++) {
                    rows.push(getRow(key.refTable, key.refCol, col[i]))
                }
                await Promise.all(rows).then(values => {
                    values.forEach(value => {
                        if(typeof value[0] != 'undefined'&& /^\d+$/.test(value[0][0]))
                        {
                            value[0].shift()
                        }
                        console.log(value);
                    })
                    let buf = col.shift()
                    for (let i = 0; i < col.length; i++) {
                        if(typeof values[i][0] != 'undefined')
                        {
                            showData[i][colInd] = values[i]
                            showData[i][colInd].unshift(refTableColumns)
                        }else{
                            showData[i][colInd] = 'null'
                        }
                    }
                    col.unshift(buf)
                })
            }
        }
    }
    showData.unshift(columns)
    createElementTable(tableContainer, showData)
}

function createElementTable(parent, showData) {
    parent.innerHTML = ""
    console.log("Starting creation  of table element:",showData);
    let mainTable = document.createElement('table')
    let mainHead = document.createElement('thead')
    let mainBody = document.createElement('tbody')
    let columns = showData.shift()
    mainTable.classList.add('table', 'table-bordered', 'table-striped')
    mainHead.classList.add('thead-dark')
    parent.appendChild(mainTable)
    mainTable.appendChild(mainHead)
    mainTable.appendChild(mainBody)
    elementArr = []
    let tr = document.createElement('tr')
    mainHead.appendChild(tr)
    // elementArr.push(new Array(tr))
    columns.forEach(col => {
        let th = document.createElement('th')
        th.scope = 'col'
        th.innerHTML = col[0]
        // elementArr[0].push(th)
        tr.appendChild(th)
    });
    showData.forEach((row, ind) => {
        let tr = document.createElement('tr')
        mainBody.appendChild(tr)
        // elementArr.push(new Array(tr))
        row.forEach(item => {
            let td = document.createElement('td')
            tr.appendChild(td)
            if (Array.isArray(item)) {
                td.classList.add('tdTable')
                createElementTable(td, item)
            } else {
                td.innerHTML = item
                // elementArr[1 + ind].push(td)
            }

        })
    })
}
async function getAllTableData(base, table) {
    let data_body = "?base=" + base + "&table=" + table;
    let call = fetch("getAllTableData.php" + data_body)
        .then(res => {
            if (res.ok) return res.json()
            else alert("Connection error " + call.status)
        })
    return call
}
async function getTables(base) {
    let data_body = "?base=" + base;
    let call = fetch("getTables.php" + data_body)
        .then(res => {
            if (res.ok) return res.json()
            else alert("Connection error " + call.status)
        })
    return call
}
async function getColumns(base, table) {
    let data_body = "?base=" + base + "&table=" + table;
    let call = fetch("getColumns.php" + data_body)
        .then(res => {
            if (res.ok) return res.json()
            else alert("Connection error " + call.status)
        })
    return call
}