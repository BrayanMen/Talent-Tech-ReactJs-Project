class Toast {
    constructor() {
        this.container = null;
        this.createContainer();
    }
    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(msj, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = msj;
        this.container.appendChild(toast);

        setTimeout(()=>{
            toast.classList.add("show")
        },100)

        setTimeout(() =>{
            toast.classList.remove("show");
            setTimeout(() =>{
                this.container.removeChild(toast)
            }, 300)
        }, 3100)
    }
}

const toast = new Toast();
export default toast;
