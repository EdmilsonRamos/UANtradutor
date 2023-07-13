var pass1= document.getElementById("pass1");
var pass2= document.getElementById("pass2");
var versenha= document.getElementById("inputCheckbox");
var cancelar= document.getElementById("canc");


cancelar.addEventListener("click", ()=>{
    
    window.location.href= '../_texto/paginainicial.html';
});

// Códigos para ver e ocultar senha
versenha.addEventListener("click", ()=>{
    var passType= pass1.type=="password";

    if(passType){
        mostrarPass();
    }else{
        ocultarPass();
    }
});

function mostrarPass(){
    pass1.setAttribute("type","text");
    pass2.setAttribute("type","text");
}

function ocultarPass(){
    pass1.setAttribute("type","password");
    pass2.setAttribute("type","password");
}


//Cadastrar com Localstorage
var form= document.getElementById('formulario');

form.addEventListener("submit",(e)=> {
    e.preventDefault();

    var a= document.getElementById('nome');
    var b= document.getElementById('data');
    var c= document.getElementById('email');
    var d= document.getElementById('tel');
    var e= document.getElementById('pass1');
    var f= document.getElementById('pass2');

    localStorage.setItem("nome", a.value);
    a.value="";
    
    localStorage.setItem("data",b.value);
    b.value="";

    localStorage.setItem("email",c.value);
    c.value="";

    localStorage.setItem("telefone",d.value);
    d.value="";

    localStorage.setItem("passe1",e.value);
    e.value="";

    localStorage.setItem("passe2",f.value);
    f.value="";

    window.location.href=("../_texto/entrarconta.html");

});