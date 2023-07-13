var pass= document.getElementById("pass");
var olho= document.getElementById("olho");
var cancelar= document.getElementById("canc");


cancelar.addEventListener("click", ()=>{
    
    window.location.href= '../_texto/opcoes.html';
});

// Códigos para ver e ocultar senha
olho.addEventListener("click", () =>{
    var passType= pass.type=="password";

    if(passType){
        mostrarPass();
    }else{
        ocultarPass();
    }
});

function mostrarPass(){
    pass.setAttribute("type","text");
    olho.setAttribute("src","../_imagens/icons8_invisible_32.png");
}

function ocultarPass(){
    pass.setAttribute("type","password");
    olho.setAttribute("src","../_imagens/icons8_eye_32.png");
}