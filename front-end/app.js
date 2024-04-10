window.addEventListener('load', async () => {

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {

            await ethereum.request({ method: 'eth_requestAccounts' }); 
            
            startApp();
        } catch (error) {
            console.error("User denied account access...")
        }
    } 

    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        startApp();
    } 

    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const contractABI = [
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
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "Buy",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "List",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "itemCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "items",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stock",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "orderCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orders",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "category",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "cost",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rating",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "stock",
              "type": "uint256"
            }
          ],
          "internalType": "struct Amazon.Item",
          "name": "item",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_image",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stock",
          "type": "uint256"
        }
      ],
      "name": "list",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = '0x85708afb74D041CCcb76cAC2129104Bb74d98b2b';

function startApp() {
    const AmazonContract = new web3.eth.Contract(contractABI, contractAddress);

    displayItems(AmazonContract);

}

async function displayItems(contract) {
    const itemsDiv = document.getElementById('items');
    const count = await contract.methods.itemCount().call();  // Get total item count

    for (let i = 0; i < count; i++) {
        const item = await contract.methods.items(i).call();
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<h3>${item.name}</h3><p>Price: ${item.cost}</p>`;
        itemsDiv.appendChild(itemDiv);
    }
}

async function addProduct() {
    // Retrieve product details from form inputs
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const cost = document.getElementById('productCost').value;
    const rating = document.getElementById('productRating').value;
    const stock = document.getElementById('productStock').value;

    // Get the current account from MetaMask
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];

    // You may want to convert cost to the appropriate unit (e.g., wei) if it's entered in Ether
    const costInWei = web3.utils.toWei(cost, 'ether');

    try {
        // Assuming your list function in smart contract doesn't expect an id, and auto-generates it
        await AmazonContract.methods.list(name, category, image, costInWei, rating, stock)
            .send({ from: currentAccount })
            .on('transactionHash', (hash) => {
                console.log('Transaction Hash:', hash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log('Confirmation:', confirmationNumber);
            })
            .on('receipt', (receipt) => {
                // Transaction receipt received
                alert('Product added successfully!');
                console.log(receipt);
            });
    } catch (error) {
        console.error('Error while adding product:', error);
        alert('Error adding product. See console for details.');
    }
}

async function buyProduct(productId, productCost) {
    const accounts = await web3.eth.getAccounts();
    await AmazonContract.methods.buy(productId)
        .send({ from: accounts[0], value: productCost })
        .then(() => alert('Product purchased successfully!'))
        .catch(e => console.error(e));
}