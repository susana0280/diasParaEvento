let events=[]
let arr=[]

const eventName=document.querySelector("#eventName")
const eventDate=document.querySelector("#eventDate")
const bAdd=document.querySelector("#bAdd")
const eventContainer=document.querySelector(".eventContainer")

const json=load()

try{
    arr=JSON.parse(json)

}
catch(err){
    arr=[]
}

events=arr ? [...arr] : []
renderEvents()

document.addEventListener("submit",e=>{
    e.preventDefault()
    addEvent()
    
})

function addEvent(){
    
    if(eventName.value==="" || eventDate.value===""){
    return
    }

    if(dateDiff()<0){
        return
    }
 
    let newEvent={
        id:(Math.random()*100).toString(36).slice(3),
        name:eventName.value,
        date:eventDate.value
    }
      events.unshift(newEvent)
      save(JSON.stringify(events))
      eventName.value=""
      renderEvents()
}

function dateDiff(date){
  
    
    let eventDay=new Date(date).getTime()
    let now=new Date().getTime()
    let milicondsDay=86400000
    difference=Math.ceil((eventDay-now)/milicondsDay)   
    return difference 
}

function renderEvents(){
    
   const eventHtml= events.map(event=>{
        return `<div class="evento">
         <div class="days">
            <span class="days-number">${dateDiff(event.date)}</span>
            <span class="days-text">Dias</span>
         </div>   
            <div class="event-name">${event.name} </div>  
            <div class="event-date">${event.date}</div>   
            <div class="action" > <button class="bDelete" data-id="${event.id}">Eliminar</button> </div>
       </div>`
    })
    eventContainer.innerHTML=eventHtml.join("")
   
   
    btns=document.querySelectorAll(".bDelete")
     btns.forEach(btn => {
       btn.addEventListener("click",e=>{
           events=events.filter(event=>event.id!==btn.getAttribute("data-id"))
           save(JSON.stringify(events))
           renderEvents()
            })
        
     });
     
}

function save(data){
    localStorage.setItem("item",data)

}

function load(){
    return localStorage.getItem("item")
}

