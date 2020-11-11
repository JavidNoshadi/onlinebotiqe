

const delBtn = document.querySelector('.delete-btn')
delBtn.addEventListener('click',Delete_btn)
function Delete_btn(){
    let dialogbox = document.querySelector('.delete-dialog-box')
    dialogbox.classList.toggle('open')
    console.log('toggling ')
}