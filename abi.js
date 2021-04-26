var abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "messageId",
				"type": "uint256"
			}
		],
		"name": "likeMessageChat",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "messageId",
				"type": "uint256"
			}
		],
		"name": "MessageFixed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "messageId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "qtdLikes",
				"type": "uint256"
			}
		],
		"name": "MessageLiked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "qtdLikes",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isFixed",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					}
				],
				"indexed": false,
				"internalType": "struct Anonymous_chat.Message",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "MessageSended",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isFixed",
				"type": "bool"
			}
		],
		"name": "SendfixedMessageChat",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			}
		],
		"name": "sendMessageChat",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "qtdLikes",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isFixed",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]