let auth = firebase.auth();
let db = firebase.firestore();

var name;

auth.onAuthStateChanged(function(user){ //teste de autenticação
  if(user){
    name = user.displayName;
    let texto = document.getElementById('nome');
  } else{
    window.location.replace('index.html');
}
});

  db.collection("mensagens").orderBy("data", "desc").onSnapshot(snapshot => { //ordenando as mensagem de forma decrescente
    let mensagens = document.getElementById("mensagens");
    mensagens.innerText = "";
    snapshot.forEach(imagem => {
      let doc = imagem.data();
      mensagens.appendChild(chat(doc));
    })
  })

function chat(msg){
    let tempo = document.createElement("b");
    let conteudo = document.createElement("write");
    let texto = document.createElement("p");

    tempo.innerText = formatarData(msg.data) + " - " + msg.rementente + ": ";
    conteudo.innerText = msg.texto;
    texto.appendChild(tempo);
    texto.appendChild(conteudo);

    return texto;
  }

function formatarData(data, showDate = true, showTime = true) {

  monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10","11","12");

  let date = new Date(data.seconds *1000);
  if(showDate == true && showTime == true) {
    return date.getDate() + "/" +
           monName[date.getMonth()] +  "  " +

           date.getHours() + ":" +
           date.getMinutes();
  }

  if(showDate == true && showTime == false) {
    return date.getDate() + "/" +
           monName[date.getMonth()] + "/" +
           date.getFullYear();
  }

  if(showDate == false && showTime == true) {
    return date.getHours() + ":" +
           date.getMinutes();
  }
  return showDate +  "  " + showTime;
}

window.onload = function(){

  let enviar = document.getElementById('enviar');

  enviar.onclick = function(){
  let texto = document.getElementById('texto');
  let mensagem = {
      texto: texto.value,
      data: new Date(),
      rementente: name
  }

  db.collection('mensagens').doc().set(mensagem); //adicionando mensagens ao banco de dados

  texto.value = ""; //limpando a caixa de mensagem
}
}
