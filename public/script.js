const hambtn = document.querySelector('.ham-toggle')
hambtn.addEventListener('click',(e)=>{
    let ham_panel = document.querySelector('.ham-panel')
    console.log('toggle');
    ham_panel.classList.toggle('open')
    hambtn.classList.toggle('fa-times')
})