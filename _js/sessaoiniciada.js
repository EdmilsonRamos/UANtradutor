
var micro= document.getElementById("micro");
var altofala= document.getElementById("altofalante");
var caixatexto = document.getElementById("areaescrita");
var altofalan= document.getElementById("altofalante2");
var caixatext = document.getElementById("areatraducao");
var inverte = document.getElementById("inverter");
const selecione=document.querySelectorAll('.idioma');

selecione.forEach((tag, id) => {
    for(const country_code in countries){
        let selected;
        if(id == 0 && country_code == "pt-PT"){
            selected=" selected";
        }else if(id == 1 && country_code == "en-GB"){
            selected=" selected";
        }

        let opcoes= `<option value="${country_code}" ${ selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",opcoes);
    }
});

/*Inverter*/
inverte.addEventListener("click",() =>{
    var invertexto= caixatexto.value;
    var inveridioma= selecione[0].value;
    caixatexto.value=caixatext.value;
    selecione[0].value=selecione[1].value
    caixatext.value=invertexto;
    selecione[1].value=inveridioma;
});

/* Tradução em tempo real*/
var tc= document.getElementById("detecao");
caixatexto.addEventListener('input', () => {
    var selectedIndex= tc.selectedIndex;
        if(selectedIndex===0){
            //Reconhecimento automatico
            tc.selectedIndex=7;
            console.log(tc)
            funcaotraduzir();
        }else{
    funcaotraduzir();
}
 
});

//Função que permite a tradução de texto
 function funcaotraduzir(){
    var teo= caixatexto.value;
    var tranformarescrita= selecione[0].value;
    var tranformartraducao= selecione[1].value;
    var apilink=`https://api.mymemory.translated.net/get?q=${teo}&langpair=${tranformarescrita}|${tranformartraducao}`;
    fetch(apilink).then(res => res.json()).then(data => {
        console.log(data);
        caixatext.value=data.responseData.translatedText;
    });
 }



    //Traduzir  pra outros idiomas quando selecionado no select
    var opc = document.getElementById("traduzClick");

    opc.addEventListener('change', function(){

        var selectedIndex= opc.selectedIndex;
        if(selectedIndex){
            
             funcaotraduzir();
        }
    
    });

/* Suporte de altofalante*/
var altofa= document.querySelectorAll('img#altofalante');
var er = document.getElementById("altofalante");
altofa.forEach(icon =>{
icon.addEventListener("click",({target})=>{
    var utterance;
    if(caixatexto.value==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Digite algo para reproduzir!'
          })
        er.setAttribute("src","../_imagens/alto-falante-mudo.png");
    }else{
    if(target.id=="altofalante"){
        er.setAttribute("src","../_imagens/alto_falante.png");
        utterance=new SpeechSynthesisUtterance(caixatexto.value);
        utterance.lang= selecione[0].value;
    }
    speechSynthesis.speak(utterance);
}
});
});


var altofalante= document.querySelectorAll('img#altofalante2');
var et = document.getElementById("altofalante2");
altofalante.forEach(icon =>{
icon.addEventListener("click",({target})=>{
    var utterance;
    if(caixatext.value==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nada para reproduzir!'
          })
        et.setAttribute("src","../_imagens/alto-falante-mudo.png");
    }else{
    if(target.id=="altofalante2"){
        et.setAttribute("src","../_imagens/alto_falante.png");
        utterance=new SpeechSynthesisUtterance(caixatext.value);
        utterance.lang= selecione[1].value;
    }
    speechSynthesis.speak(utterance);
}
});
});



/*
function trocarmicro(){

microfone.src = '../_imagens/microfone.png'

}
*/

//Partilhar
var partilha = document.getElementById("partilha2");

partilha.addEventListener("click", () => {
 
      if(caixatext.value==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sem texto para partilhar!'
          })
        }else{
      Swal.fire({
        title: 'Partilhar com Whatsap?',
        imageUrl: '../_imagens/whatsapp.png',
        imageHeight: 70,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, partilhar!'
      }).then((result) => {
        if (result.isConfirmed) {
            
            whatsap();
        }
      })
    }
});

//Função partilhar whatsap
function whatsap(){
    var txt= caixatext.value;

    var codificartxt= encodeURIComponent(txt);
    var url="https://wa.me/?text=" + codificartxt;

    window.open(url);
}

// Captção de Voz e Escrita 
class speechApi {
    
    constructor(){
        const speechToText = window.SpeechRecognition ||  
                              window.webkitSpeechRecognition    
        //var selectedIndex= opc.selectedIndex  
        this.speechApi = new speechToText()
        this.output = caixatexto.output
        this.speechApi.continuous = true
        this.speechApi.lang = 'pt-BR'
        //this.speechApi.lang = selectedIndex
        this.speechApi.onresult = e => {
            var resultIndex = e.resultIndex
            var transcript = e.results[resultIndex][0].transcript
            caixatexto.value += transcript
        } 
    }
    start(){
        this.speechApi.start()
    }
    stop(){
        this.speechApi.stop()
    }
}



var speech = new speechApi();
var imagemActual = 1;
micro.addEventListener("click", ()=>{
var imgElemeto = document.getElementById("micro");
if(imagemActual == 1){
imgElemeto.src = "../_imagens/micro_mudo.png";
imagemActual = 2;
 speech.start();
}else{
imgElemeto.src = "../_imagens/microfone.png";
imagemActual = 1;
speech.stop();
funcaotraduzir();
console.log(speech)
}
 });

// Opções avançadas Ler Arquivo

var arquivo= document.getElementById("arquivo");

arquivo.addEventListener("change", function(){
    const arq= this.files[0];
    
    const leitor= new FileReader();

    leitor.addEventListener("load", function(){
        caixatexto.value=leitor.result;
        funcaotraduzir();
        console.log(arquivo)
    });

    if(arq){
        leitor.readAsText(arq);
    }
})

//Histórico
var hist= document.getElementById("hist");
var des= document.querySelector("#ladodireito");

hist.addEventListener("click", function(){
    if(des.style.display==="inline-block"){
        des.style.display="none";
    }else{
        
        des.style.display="inline-block";
    }
})

// Função para levar as informações na historia

function guardarstory(){
    
}