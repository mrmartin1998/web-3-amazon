let AmazonContract;

async function initializeWeb3() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Web3 initialized');
          return true;
      } catch (error) {
          console.error('User denied account access:', error);
          return false;
      }
  } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      console.log('Web3 initialized using current provider');
      return true;
  } else {
      console.warn('Non-Ethereum browser detected. Consider trying MetaMask!');
      return false;
  }
}

async function initializeContract() {
  if (!window.web3) {
      console.warn('Web3 is not initialized. Skipping contract initialization.');
      return;
  }
  const contractAddress = '0xb27069475B2C2956D706aEF17146FcC45FE2A6b1';
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
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "ItemDeleted",
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
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "manufacturer",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "dimensions",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "weight",
          "type": "uint256"
        }
      ],
      "name": "ItemListed",
      "type": "event"
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
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "ItemPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "SellerAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "SellerRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
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
          "name": "street",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "postalCode",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "country",
          "type": "string"
        }
      ],
      "name": "ShippingInfoUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isSeller",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
        },
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "manufacturer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dimensions",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "weight",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "shippingInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "street",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "postalCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "country",
          "type": "string"
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
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "addSeller",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "removeSeller",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
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
        },
        {
          "internalType": "string",
          "name": "_manufacturer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dimensions",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_weight",
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
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
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
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_street",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_postalCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_country",
          "type": "string"
        }
      ],
      "name": "setShippingInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getShippingInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "street",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "postalCode",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "country",
              "type": "string"
            }
          ],
          "internalType": "struct Amazon.ShippingInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "deleteItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  AmazonContract = new web3.eth.Contract(contractABI, contractAddress);
  console.log('Contract initialized');
}

async function addProduct() {
  const name = document.getElementById('productName').value;
  const category = document.getElementById('productCategory').value;
  const cost = document.getElementById('productCost').value;
  const stock = document.getElementById('productStock').value;
  const manufacturer = document.getElementById('manufacturer').value;
  const dimensions = document.getElementById('dimensions').value;
  const weight = parseInt(document.getElementById('weight').value); // Ensure this is an integer

  // Use a static placeholder image URL
  const imageUrl = "https://via.placeholder.com/150";

  const costInWei = web3.utils.toWei(cost, 'ether');

  try {
      const accounts = await web3.eth.getAccounts();
      if (!await AmazonContract.methods.isSeller(accounts[0]).call()) {
          alert("You are not authorized to list products.");
          return;
      }
      await AmazonContract.methods.list(name, category, imageUrl, costInWei, stock, manufacturer, dimensions, weight).send({ from: accounts[0] });
      document.getElementById('responseMessage').innerText = 'Product added successfully!';
  } catch (error) {
      console.error('Error while adding product:', error);
      document.getElementById('responseMessage').innerText = 'Error while adding product: ' + error.message;
  }
}

async function loadProducts() {
  try {
    const productList = document.getElementById('productList');
    const categoryFilter = document.getElementById('filterCategory');
    productList.innerHTML = ''; // Clear the current items
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Clear the current filter options

    const uniqueCategories = new Set();
    const count = await AmazonContract.methods.itemCount().call();

    // Inside the loadProducts() function
  for (let i = 1; i < count; i++) {
    const item = await AmazonContract.methods.items(i).call();
    if (item && item.id !== "0") { // Add a check to ensure the item is valid
      uniqueCategories.add(item.category);
      const itemElement = createItemElement(item);
      productList.appendChild(itemElement);
    }
  }

    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.innerText = category;
      categoryFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load products:', error);
  }
}

async function buyProduct(id, quantity = 1) {
  const item = await AmazonContract.methods.items(id).call();
  const accounts = await web3.eth.getAccounts();
  const totalCostInWei = BigInt(item.cost) * BigInt(quantity);
  const costInWeiString = totalCostInWei.toString(); // Convert BigInt to string for the transaction

  try {
      await AmazonContract.methods.buy(id, quantity).send({ from: accounts[0], value: costInWeiString });
      alert('Product purchased successfully!');
      loadProducts(); // Refresh the product list to reflect the change in stock
  } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Error purchasing product: ' + error.message);
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
      alert('Please ensure your Ethereum wallet is connected.');
      return;
  }
  await initializeContract();
  if (!AmazonContract) {
      console.error('Contract initialization failed.');
      alert('Failed to initialize the contract.');
      return;
  }
  // Check if the element is present
  if(document.getElementById('productList')) {
      loadProducts();  // Only call loadProducts if productList is present
  } else {
      console.error('Product list element not found');
  }
}

async function searchProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const itemsDiv = document.getElementById('productList');
  const count = await AmazonContract.methods.itemCount().call();
  
  itemsDiv.innerHTML = ''; // Clear the current items
  
  for (let i = 1; i < count; i++) {
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
  let itemsArray = await fetchAllItems();

  switch(sortOption) {
    case 'priceLowHigh':
      itemsArray.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
      break;
    case 'priceHighLow':
      itemsArray.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
      break;
  }
  displayItems(itemsArray);
}

async function fetchAllItems() {
  const count = await AmazonContract.methods.itemCount().call();
  let itemsArray = [];
  
  for (let i = 1; i < count; i++) {
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

async function deleteProduct(productId) {
  try {
      await AmazonContract.methods.deleteItem(productId).send({ from: userAccount });
      alert('Product deleted successfully');
      loadProducts();  // Refresh the list after deletion
  } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product: ' + error.message);
  }
}

function createItemElement(item) {
  const isAdmin = window.location.pathname.includes('administrator.html'); // Check if the user is an admin
  const userIsOwner = userAccount === item.seller; // Check if the user is the seller of the product

  const itemElement = document.createElement('div');
  itemElement.className = 'product';
  itemElement.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" style="width:100px;height:100px;">
      <h3>${item.name}</h3>
      <p>Category: ${item.category}</p>
      <p>Price: ${web3.utils.fromWei(item.cost, 'ether')} ETH</p>
      <p>Stock: ${item.stock}</p>
      <button onclick="buyProduct(${item.id}, 1)">Buy</button>
      ${userIsOwner || isAdmin ? `<button onclick="editProduct(${item.id})">Edit</button> <button onclick="deleteProduct(${item.id})">Delete</button>` : ''}
  `;
  return itemElement;
}

function showSetShipping(itemId) {
  // Code to display UI for setting shipping information
}

let userAccount = null;

async function connectWalletHistory() {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          userAccount = accounts[0];
          await displayAccountInfo(userAccount);
          await fetchOrderHistory();  // Fetch order history after connecting wallet
          window.ethereum.on('accountsChanged', handleAccountsChanged);
      } catch (error) {
          if (error.code === 4001) {
              alert("Connection to MetaMask wallet was rejected by the user.");
          } else {
              console.error(error);
          }
      }
  } else {
      alert('Please install MetaMask to use this feature!');
  }
}

async function connectWallet() {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          userAccount = accounts[0];
          await displayAccountInfo(userAccount);
          window.ethereum.on('accountsChanged', handleAccountsChanged);

          // Store user session
          sessionStorage.setItem('userAccount', userAccount);
          alert("Wallet connected: " + userAccount);
      } catch (error) {
          if (error.code === 4001) {
              alert("Connection to MetaMask wallet was rejected by the user.");
          } else {
              console.error(error);
          }
      }
  } else {
      alert('Please install MetaMask to use this feature!');
  }
}

async function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
  } else {
      userAccount = accounts[0];
      await displayAccountInfo(userAccount);
      loadProducts(); // Reload the products as the user account has changed
  }
}

async function displayAccountInfo(account) {
  const walletAddressDiv = document.getElementById('walletAddress');
  const walletBalanceDiv = document.getElementById('walletBalance');

  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

  walletAddressDiv.innerText = `Connected account: ${account}`;
  walletBalanceDiv.innerText = `Balance: ${balanceEth} ETH`;
}

async function updateBalance() {
  if (userAccount) {
      const balanceWei = await web3.eth.getBalance(userAccount);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      document.getElementById('walletBalance').innerText = `Balance: ${balanceEth} ETH`;
  }
}

// Handle account change
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else {
    userAccount = accounts[0];
    document.getElementById('walletAddress').innerText = `Connected account: ${userAccount}`;
    loadProducts(); // Reload the products as the user account has changed
  }
}

let shoppingCart = [];

// Function to add an item to the shopping cart
function addToCart(id, quantity = 1) { // Set default quantity to 1
  const productIndex = shoppingCart.findIndex((item) => item.id === id);
  if (productIndex !== -1) {
    // If the item is already in the cart, update the quantity
    shoppingCart[productIndex].quantity += quantity;
  } else {
    // If the item is not in the cart, add it with the specified quantity
    shoppingCart.push({ id, quantity });
  }
  updateCartDisplay();
}

// Function to remove an item from the shopping cart
function removeFromCart(id) {
  shoppingCart = shoppingCart.filter((item) => item.id !== id);
  updateCartDisplay();
}

// Checkout function
async function checkout() {
  if (!userAccount) {
      alert('Please connect your wallet first!');
      return;
  }

  for (const cartItem of shoppingCart) {
      const item = await AmazonContract.methods.items(cartItem.id).call();
      const itemCost = BigInt(item.cost);
      const quantity = BigInt(cartItem.quantity);
      const totalCost = itemCost * quantity;
      const costInWei = web3.utils.toWei(totalCost.toString(), 'wei');

      try {
          await AmazonContract.methods.buy(cartItem.id, cartItem.quantity)
              .send({ from: userAccount, value: costInWei.toString() });
          alert(`Successfully purchased ${cartItem.quantity} of item ID ${cartItem.id}`);
      } catch (error) {
          alert(`Failed to purchase item ID ${cartItem.id}: ${error.message}`);
      }
  }

  shoppingCart = []; // Clear the cart after checkout
  updateCartDisplay();
}

// Fetch order history (you will need to implement this according to your smart contract events)
async function fetchOrderHistory() {
  
  try {
      const buyEvents = await AmazonContract.getPastEvents('ItemPurchased', {
          filter: { buyer: userAccount },
          fromBlock: 0,
          toBlock: 'latest'
      });

      // Process and display these events in the UI
      displayOrderHistory(buyEvents);
  } catch (error) {
      console.error('Error fetching order history:', error);
      alert('Failed to fetch order history: ' + error.message);
  }
}

async function displayOrderHistory(events) {
  const orderHistoryDiv = document.getElementById('orderHistory');
  orderHistoryDiv.innerHTML = ''; // Clear previous entries

  for (let event of events) {
      const { itemId, quantity, buyer } = event.returnValues;
      try {
          const item = await AmazonContract.methods.items(itemId).call();
          const orderElement = document.createElement('div');
          orderElement.innerHTML = `
              <p>Product: ${item.name}</p>
              <p>Item ID: ${itemId}</p>
              <p>Quantity: ${quantity}</p>
              <p>Cost: ${web3.utils.fromWei(item.cost, 'ether')} ETH</p>
              <p>Seller: ${item.seller}</p>
          `;
          orderHistoryDiv.appendChild(orderElement);
      } catch (error) {
          console.error('Error fetching item details:', error);
          const errorElement = document.createElement('div');
          errorElement.innerHTML = `<p>Error loading details for item ID ${itemId}</p>`;
          orderHistoryDiv.appendChild(errorElement);
      }
  }
}

// Function to display shopping cart
function updateCartDisplay() {
  const cartDiv = document.getElementById('shoppingCart');
  cartDiv.innerHTML = ''; // Clear the shopping cart div
  shoppingCart.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
          Item ID: ${item.id}, Quantity: ${item.quantity}
          <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartDiv.appendChild(itemDiv);
  });
}

async function setShippingInfo() {
  // Ensure the contract is initialized
  if (!AmazonContract) {
    console.error("Attempting to set shipping info without an initialized contract.");
    await initializeContract();
    if (!AmazonContract) {
      alert("Failed to initialize the contract. Please ensure your wallet is connected.");
      return;
    }
  }

  // Proceed with setting the shipping info
  const name = document.getElementById('name').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const postalCode = document.getElementById('postalCode').value;
  const country = document.getElementById('country').value;
  const accounts = await web3.eth.getAccounts();

  try {
      await AmazonContract.methods.setShippingInfo(name, street, city, postalCode, country).send({ from: accounts[0] });
      alert('Shipping information updated successfully.');
  } catch (error) {
      console.error('Failed to set shipping information:', error);
      alert('Failed to set shipping information: ' + error.message);
  }
}

async function markItemAsShipped(itemId) {
  const accounts = await web3.eth.getAccounts();
  try {
      await AmazonContract.methods.markAsShipped(itemId).send({ from: accounts[0] });
      alert('Item marked as shipped successfully!');
  } catch (error) {
      console.error('Error marking item as shipped:', error);
      alert('Error marking item as shipped: ' + error.message);
  }
}

async function displayShippingInfo() {
  const accounts = await web3.eth.getAccounts();
  try {
      const info = await AmazonContract.methods.getShippingInfo(accounts[0]).call();
      alert(`Shipping Info - Name: ${info.name}, Street: ${info.street}, City: ${info.city}, Postal Code: ${info.postalCode}, Country: ${info.country}`);
  } catch (error) {
      console.error('Failed to retrieve shipping information:', error);
  }
}

async function addSeller(address) {
  try {
      const accounts = await web3.eth.getAccounts();
      await AmazonContract.methods.addSeller(address).send({ from: accounts[0] });
      alert("Seller added successfully.");
  } catch (error) {
      console.error('Error adding seller:', error);
      alert('Error adding seller: ' + error.message);
  }
}

async function removeSeller(address) {
  try {
      const accounts = await web3.eth.getAccounts();
      await AmazonContract.methods.removeSeller(address).send({ from: accounts[0] });
      alert("Seller removed successfully.");
  } catch (error) {
      console.error('Error removing seller:', error);
      alert('Error removing seller: ' + error.message);
  }
}

async function loadAdminProducts() {
  const productList = document.getElementById('productList');
  if (!productList) {
      console.error('Admin Product list element not found');
      return;
  }
  productList.innerHTML = ''; // Clear the current items

  try {
      const count = await AmazonContract.methods.itemCount().call();
      for (let i = 1; i <= count; i++) {
          const item = await AmazonContract.methods.items(i).call();
          if (item.id !== "0" && item.name) { // Ensure item is valid and not empty
              const itemElement = createAdminItemElement(item);
              productList.appendChild(itemElement);
          }
      }
  } catch (error) {
      console.error('Failed to load products for admin:', error);
  }
}

function createAdminItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.className = 'product';
  itemElement.innerHTML = `
      <img src="${item.imageUrl || 'https://via.placeholder.com/150'}" alt="${item.name}" style="width:100px;height:100px;">
      <h3>${item.name}</h3>
      <p>Price: ${web3.utils.fromWei(item.cost, 'ether')} ETH</p>
      <p>Stock: ${item.stock}</p>
      <button onclick="editProduct(${item.id})">Edit</button>
      <button onclick="deleteProduct(${item.id})">Delete</button>
  `;
  return itemElement;
}

window.addEventListener('load', async function() {
  try {
      const web3Loaded = await initializeWeb3();
      if (!web3Loaded) {
          console.error('Web3 initialization failed or not supported.');
          alert('Please make sure your Ethereum wallet is connected.');
          return;
      }

      await initializeContract();
      if (!AmazonContract) {
          console.error('Contract initialization failed.');
          alert('Failed to initialize the contract.');
          return;
      }

      // Enable any page-specific buttons if they exist
      const updateShippingButton = document.getElementById('updateShippingButton');
      if (updateShippingButton) {
          updateShippingButton.disabled = false;
      }

      // Execute page-specific scripts
      switch (document.body.id) {
          case "home":
              // Possibly call some functions specific to the Home page
              break;
          case "product":
              loadProducts();
              break;
          case "add-product":
              // No specific action required on load for add-product unless needed
              break;
          case "order-history":
              connectWalletHistory().then(fetchOrderHistory);
              break;
          case "account-management":
              // Account management specific scripts
              break;
          case "about":
              // Code specific to the About page
              break;
      }
  } catch (error) {
      console.error('An error occurred during app initialization:', error);
      alert('An error occurred. Please check the console for details.');
  }
});
