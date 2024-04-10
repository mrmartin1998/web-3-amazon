let AmazonContract;

async function startApp() {
    AmazonContract = new web3.eth.Contract(contractABI, contractAddress);
    // Make sure you define AmazonContract globally as you did before.
    await refreshItemsDisplay();
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access
            await ethereum.request({ method: 'eth_requestAccounts' });
            // Account access granted
            startApp();
        } catch (error) {
            console.error("User denied account access...");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        startApp();
    } else {
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
const contractAddress = '0xB185B165280933994Bd6946438222b38fC46db22';

async function refreshItemsDisplay() {
    const itemsDiv = document.getElementById('items');
    // Clear existing items
    itemsDiv.innerHTML = '';

    // Fetch the updated itemCount after adding a product
    const updatedCount = await AmazonContract.methods.itemCount().call();

    // Re-fetch and display updated items
    for (let i = 0; i < updatedCount; i++) {
        displayItem(i);
    }
}

// New function to display a single item
async function displayItem(index) {
    const itemsDiv = document.getElementById('items');
    const item = await AmazonContract.methods.items(index).call();
    const costInEth = web3.utils.fromWei(item.cost, 'ether');
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: ${costInEth} ETH</p>
        <button onclick="buyProduct(${item.id}, '${item.cost}')">Buy</button>
    `;
    itemsDiv.appendChild(itemDiv);
}

async function addProduct() {
    // Retrieve product details from form inputs
    const id = document.getElementById('productId').value; // New line for product ID
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const cost = document.getElementById('productCost').value;
    const rating = document.getElementById('productRating').value;
    const stock = document.getElementById('productStock').value;

    // Convert numeric fields to appropriate data types
    const idNum = parseInt(id); // Convert ID to a number
    const costInWei = web3.utils.toWei(cost, 'ether'); // Convert cost to Wei
    const ratingNum = parseInt(rating); // Convert rating to a number
    const stockNum = parseInt(stock); // Convert stock to a number

    // Get the current account from MetaMask
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];

    try {
        // Send transaction to list the product
        await AmazonContract.methods.list(idNum, name, category, image, costInWei, ratingNum, stockNum)
            .send({ from: currentAccount })
            .on('receipt', async (receipt) => {
                alert('Product added successfully!');
                console.log(receipt);
                // Refresh the items displayed
                await refreshItemsDisplay();
            });
    } catch (error) {
        console.error('Error while adding product:', error);
        alert('Error adding product. See console for details.');
    }
}

async function buyProduct(itemId, itemCostWei) {
    const accounts = await web3.eth.getAccounts();
    await AmazonContract.methods.buy(itemId)
        .send({ from: accounts[0], value: itemCostWei })
        .then(() => {
            alert('Product purchased successfully!');
            // You might want to refresh the display or update the stock count here
        })
        .catch(e => {
            console.error(e);
            alert('Error purchasing product. See console for details.');
        });
}
