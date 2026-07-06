export function showToast(texto){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.textContent=texto;

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>toast.remove(),300);

    },2000);

}