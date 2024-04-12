let AmazonContract;

async function initializeWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('User denied account access:', error);
            return false;
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        alert('Non-Ethereum browser detected. Consider trying MetaMask!');
        return false;
    }
    return true;
}

async function initializeContract() {
    const contractAddress = '0x3dA5122A1f0C713896A742c51D5121D6033125B6'; // Update with your contract address
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
            "indexed": true,
            "internalType": "address",
            "name": "buyer",
            "type": "address"
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
            "indexed": true,
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
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
            "name": "stock",
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
            "internalType": "uint256",
            "name": "cost",
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
            "internalType": "uint256",
            "name": "_costWei",
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
    AmazonContract = new web3.eth.Contract(contractABI, contractAddress);
}

async function addProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const cost = web3.utils.toWei(document.getElementById('productCost').value, 'ether');
    const stock = document.getElementById('productStock').value;

    const accounts = await web3.eth.getAccounts();
    try {
        await AmazonContract.methods.list(id, name, category, cost, stock).send({ from: accounts[0] });
        alert('Product added successfully!');
        loadProducts();
    } catch (error) {
        console.error('Error while adding product:', error);
    }
}

async function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const count = await AmazonContract.methods.itemCount().call();

    for (let i = 0; i < count; i++) {
        const item = await AmazonContract.methods.items(i).call();
        const itemElement = document.createElement('div');
        itemElement.className = 'product';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ${web3.utils.fromWei(item.cost, 'ether')} ETH</p>
            <p>Stock: ${item.stock}</p>
            <button onclick="buyProduct(${item.id})">Buy</button>
        `;
        productList.appendChild(itemElement);
    }
}

async function buyProduct(id) {
    const item = await AmazonContract.methods.items(id).call();
    const accounts = await web3.eth.getAccounts();
    try {
        await AmazonContract.methods.buy(id).send({ from: accounts[0], value: item.cost });
        alert('Product purchased successfully!');
        loadProducts();
    } catch (error) {
        console.error('Error purchasing product:', error);
    }
}

async function initializeApp() {
    if (!await initializeWeb3()) {
        console.error('Web3 initialization failed');
        return;
    }
    await initializeContract();
    loadProducts();
}

window.addEventListener('load', initializeApp);
