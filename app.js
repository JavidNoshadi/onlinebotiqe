
class topnav extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = `<a href="/login">login</a>`
    }
}
customElements.define('top-nav',topnav)

class loginpage extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = `jkkk`
    }
}
customElements.define('login-page',loginpage)