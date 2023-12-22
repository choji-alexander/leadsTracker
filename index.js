// chrome://extensions
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById('input-btn')
const tabBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')
const ulEl = document.querySelector('#ul-el')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

deleteBtn.addEventListener('click', function(){
    console.log("double kicked delete")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

function render(leads){
    let listItems = ''
    for (let lead = 0; lead <= leads.length; lead++){
        // listItems += '<li><a target="_blank" href="' + myLeads[lead] + '">' + myLeads[lead] + '</a></li>'
        listItems += `
        <li>
            <a target="_blank" href="${leads[lead]}"> 
                ${leads[lead]} 
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

