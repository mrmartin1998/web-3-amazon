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
    const contractAddress = '0xdCfAd21fa9E2549Ed06698Cb752FbE2ca63dBFE8'; // Update with your contract address
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
            "internalType": "string",
            "name": "imageUrl",
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
            "internalType": "string",
            "name": "imageUrl",
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
            "internalType": "string",
            "name": "_imageUrl",
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
  const cost = document.getElementById('productCost').value; // assuming this is already in ETH
  const stock = document.getElementById('productStock').value;

  const costInWei = web3.utils.toWei(cost, 'ether');

  const imageUrl = "https://via.placeholder.com/150"; // Placeholder image URL

  const accounts = await web3.eth.getAccounts();
  try {
      await AmazonContract.methods.list(id, name, category, imageUrl, costInWei, stock).send({ from: accounts[0] });
      alert('Product added successfully!');
      loadProducts(); // Refresh the product list
  } catch (error) {
      console.error('Error while adding product:', error);
  }
}

async function loadProducts() {
  const productList = document.getElementById('productList');
  const categoryFilter = document.getElementById('filterCategory');

  productList.innerHTML = ''; // Clear the current items
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Clear the current filter options

  const uniqueCategories = new Set();
  const count = await AmazonContract.methods.itemCount().call();

  for (let i = 0; i < count; i++) {
      const item = await AmazonContract.methods.items(i).call();
      uniqueCategories.add(item.category); // Add the item's category to the set

      const itemElement = createItemElement(item);
      productList.appendChild(itemElement);
  }

  uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.innerText = category;
      categoryFilter.appendChild(option);
  });
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

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
      const response = await fetch('https://api.yourstorage.com/upload', {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
      }

      const data = await response.json();
      return data.url; // Assuming the API responds with JSON that includes the URL
  } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw the error so it can be handled further up the call stack
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

async function searchProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const itemsDiv = document.getElementById('productList');
  const count = await AmazonContract.methods.itemCount().call();
  
  itemsDiv.innerHTML = ''; // Clear the current items
  
  for (let i = 0; i < count; i++) {
    const item = await AmazonContract.methods.items(i).call();
    // Convert both strings to lowercase to make the search case-insensitive
    if (item.name.toLowerCase().includes(searchValue) || item.category.toLowerCase().includes(searchValue)) {
      const itemElement = createItemElement(item); // createItemElement is your existing function to create the product display
      itemsDiv.appendChild(itemElement);
    }
  }
}

async function sortProducts() {
  const sortOption = document.getElementById('sortOptions').value;
  let itemsArray = await fetchAllItems(); // Assume this is a function that fetches all items and returns them as an array

  if (sortOption === 'priceLowHigh') {
    itemsArray.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
  } else if (sortOption === 'priceHighLow') {
    itemsArray.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
  }
  // Implement other sorting options as needed
  
  displayItems(itemsArray); // Function to display the items
}

async function fetchAllItems() {
  const count = await AmazonContract.methods.itemCount().call();
  let itemsArray = [];
  
  for (let i = 0; i < count; i++) {
    let item = await AmazonContract.methods.items(i).call();
    itemsArray.push(item);
  }
  
  return itemsArray;
}

function displayItems(itemsArray) {
  const itemsDiv = document.getElementById('productList');
  itemsDiv.innerHTML = ''; // Clear the current items

  itemsArray.forEach(item => {
      const itemElement = createItemElement(item);
      itemsDiv.appendChild(itemElement);
  });
}

async function filterProducts() {
  const selectedCategory = document.getElementById('filterCategory').value;
  const itemsArray = await fetchAllItems();

  // If 'all' is selected, display all items. Otherwise, filter the items.
  const filteredItemsArray = selectedCategory === 'all'
      ? itemsArray
      : itemsArray.filter(item => item.category === selectedCategory);

  displayItems(filteredItemsArray);
}

function createItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.className = 'product';
  itemElement.innerHTML = `
    <img src="${item.imageUrl || 'https://via.placeholder.com/150'}" alt="${item.name}" style="width:100px;height:100px;">
    <h3>${item.name}</h3>
    <p>Price: ${web3.utils.fromWei(item.cost, 'ether')} ETH</p>
    <p>Stock: ${item.stock}</p>
    <button onclick="buyProduct(${item.id})">Buy</button>
  `;
  return itemElement;
}

window.addEventListener('load', initializeApp);