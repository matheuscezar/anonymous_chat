//Autor: Matheus Cezar Maciel Ferreira

pragma abicoder v2;

contract Anonymous_chat {
    
    struct Message {
        uint id;
        string body;
        uint timestamp;
        uint qtdLikes;
        bool isFixed;
        string color;
    }
    
    event MessageSended(Message message);
    event MessageLiked(uint messageId, uint qtdLikes);
    event MessageFixed(uint messageId);
    
    Message public message;
    Message[] messages;
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Somente o dono do contrato pode executar essa funcao!");
        _;
    }
    
    function sendMessageChat(string memory body) public {
        message.id = messages.length+1;
        message.body = body;
        message.timestamp = block.timestamp;
        message.isFixed = false;
        message.color = "grey";
        messages.push(message);
        emit MessageSended(message);
    }

    function likeMessageChat(uint messageId) public {
        for (uint i=0; i<messages.length; i++){
            if(messages[i].id==messageId){
                messages[i].qtdLikes = messages[i].qtdLikes + 1;
                emit MessageLiked(messageId, messages[i].qtdLikes);
                break;
            }
        }
    }
    
    function SendfixedMessageChat(string memory body, bool isFixed) payable public {
        message.id = messages.length+1;
        message.body = body;
        message.timestamp = block.timestamp;
        message.isFixed = isFixed;
        message.color = "grey";
        messages.push(message);
        emit MessageSended(message);
    }
    
}