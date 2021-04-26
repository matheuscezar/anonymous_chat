// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0x1a93e450262124574B33Ee929EcaF8fAd556C257";

// Inicializa o objeto DApp
document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

var QTD_LIKES = new Map();

// Nosso objeto DApp que irá armazenar a instância web3
const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  // Inicializa o provedor web3
  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ // Requisita primeiro acesso ao Metamask
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on('accountsChanged', DApp.updateAccount); // Atualiza se o usuário trcar de conta no Metamaslk
      } catch (error) {
        console.error("Usuário negou acesso ao web3!");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.error("Instalar MetaMask!");
      return;
    }
    return DApp.initContract();
  },

  // Atualiza 'DApp.account' para a conta ativa no Metamask
  updateAccount: async function () {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
    atualizaInterface();
  },

  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.Contrato = new DApp.web3.eth.Contract(abi, contractAddress);
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    inicializaInterface();
  },
};

function sendMessageBlockchain() {
  let message = document.getElementById("message").value;
  console.log("Realizando chamada ao blockchain");
  if (document.getElementById("fixed").checked) {
    return DApp.contracts.Contrato.methods.SendfixedMessageChat(message, true).send({ from: DApp.account }).then((atualizaInterface));
  } else {
    return DApp.contracts.Contrato.methods.sendMessageChat(message).send({ from: DApp.account }).then((atualizaInterface));
  }
}

function formatTimestamp(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function sendLike(messageId) {
  return DApp.contracts.Contrato.methods.likeMessageChat(messageId.id).send({ from: DApp.account }).then((atualizaInterface));
}

function getQtdLikesByMessageId(messageId) {
   return DApp.contracts.Contrato.getPastEvents("MessageLiked", { fromBlock: 0, toBlock: "latest" }).then((result) => {
    result.forEach((message) => {
      if (message.id == messageId) console.log(message);
    });
  });
}

function loadMessages(messages) {
  var messagesFixed = [];
  document.getElementById("messageTable").innerHTML = "";
  messages.forEach((message) => {
    var qtd_likes = QTD_LIKES.get((message.returnValues.message.id).toString()) ? QTD_LIKES.get((message.returnValues.message.id).toString()) : "0"
    if (message.returnValues.message.isFixed) messagesFixed.push(message);
    document.getElementById("messageTable").innerHTML = document.getElementById("messageTable").innerHTML + "<tr><td>" + formatTimestamp(message.returnValues.message.timestamp) + "</td><td>" + message.returnValues.message.body + "</td><td>" + qtd_likes + " <i  id=\"" + message.returnValues.message.id + "\" onclick=\"sendLike(this)\" class=\"fa fa-thumbs-up\"></i></td></tr>";
  });
  messagesFixed.forEach((messageFixed) => {
    var qtd_likes = QTD_LIKES.get((messageFixed.returnValues.message.id).toString()) ? QTD_LIKES.get((messageFixed.returnValues.message.id).toString()) : "0"
    document.getElementById("messageTable").innerHTML = "<tr bgcolor=\"rgb(140, 140, 140)\"><td>" + formatTimestamp(messageFixed.returnValues.message.timestamp) + "</td><td>" + messageFixed.returnValues.message.body + "</td><td>" + qtd_likes + " <i  id=\"" + messageFixed.returnValues.message.id + "\" onclick=\"sendLike(this)\" class=\"fa fa-thumbs-up\"></i></td></tr>" + document.getElementById("messageTable").innerHTML;
  });
}

function atualizaInterface() {
  console.log("Atualizando interface");
  DApp.contracts.Contrato.getPastEvents("MessageLiked", { fromBlock: 0, toBlock: "latest" }).then((result) => {
    result.forEach((message) => {
      QTD_LIKES.set(message.returnValues.messageId, message.returnValues.qtdLikes);
    });
  });
  DApp.contracts.Contrato.getPastEvents("MessageSended", { fromBlock: 0, toBlock: "latest" }).then((result) => loadMessages(result));
}
function inicializaInterface() {
  document.getElementById("btnSend").onclick = sendMessageBlockchain;
  atualizaInterface();
}
