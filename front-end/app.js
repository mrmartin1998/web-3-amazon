
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
const contractAddress = '0x4CB3a2b293346729DE788cA5AFd74EBa4AADFeBE';

let AmazonContract;

// Function to create item elements in the UI
function createItemElement(item) {
    const costInEth = web3.utils.fromWei(item.cost, 'ether');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: ${costInEth} ETH</p>
        <button class="buyBtn" data-id="${item.id}" data-cost="${item.cost}">Buy</button>
    `;
    return itemDiv;
}

// Function to refresh and display items
async function refreshItemsDisplay() {
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '';
    const updatedCount = await AmazonContract.methods.itemCount().call();
    for (let i = 0; i < updatedCount; i++) {
        const item = await AmazonContract.methods.items(i).call();
        const itemElement = createItemElement(item);
        itemsDiv.appendChild(itemElement);
    }
}

// Function to handle buying products
async function buyProduct(itemId, itemCostWei) {
    const accounts = await web3.eth.getAccounts();
    try {
        await AmazonContract.methods.buy(itemId).send({ from: accounts[0], value: itemCostWei });
        alert('Product purchased successfully!');
        refreshItemsDisplay();
    } catch (error) {
        console.error('Error purchasing product:', error);
        alert('Error purchasing product. See console for details.');
    }
}

// Function to add a new product
async function addProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const cost = document.getElementById('productCost').value;
    const rating = document.getElementById('productRating').value;
    const stock = document.getElementById('productStock').value;

    const idNum = parseInt(id);
    const costInWei = web3.utils.toWei(cost, 'ether');
    const ratingNum = parseInt(rating);
    const stockNum = parseInt(stock);

    const accounts = await web3.eth.getAccounts();
    try {
        await AmazonContract.methods.list(idNum, name, category, image, costInWei, ratingNum, stockNum).send({ from: accounts[0] });
        alert('Product added successfully!');
        refreshItemsDisplay();
    } catch (error) {
        console.error('Error while adding product:', error);
        alert('Error adding product. See console for details.');
    }
}

// Function to initialize the contract
async function initializeContract() {
    AmazonContract = new web3.eth.Contract(contractABI, contractAddress);
}

// Function to initialize Web3
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
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return false;
    }
    return true;
}

// Function to attach event listeners
function attachEventListeners() {
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('buyBtn')) {
            const itemId = event.target.getAttribute('data-id');
            const itemCostWei = event.target.getAttribute('data-cost');
            await buyProduct(itemId, itemCostWei);
        }
    });

    const addProductButton = document.getElementById('addProductButton');
    if (addProductButton) {
        addProductButton.addEventListener('click', addProduct);
    }
}

// Main function to initialize the app
async function initializeApp() {
    const web3Initialized = await initializeWeb3();
    if (!web3Initialized) {
        console.error('Web3 initialization failed');
        return;
    }

    await initializeContract();
    attachEventListeners();
    refreshItemsDisplay();
}

window.addEventListener('load', initializeApp);
