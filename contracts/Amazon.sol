// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

contract Amazon {
    address public owner;
    uint256 public itemCount = 1;  // Start from 1 to avoid zero initialization issues

    struct Item {
        uint256 id;
        string name;
        string category;
        string imageUrl;
        uint256 cost;
        uint256 stock;
<<<<<<< HEAD
        address payable seller;
=======
        address payable seller;  // Store the seller's address
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03
    }

    struct ShippingInfo {
        string name;
        string street;
        string city;
        string postalCode;
        string country;
<<<<<<< HEAD
=======
        bool shipped;
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public orders;
<<<<<<< HEAD
    mapping(address => ShippingInfo) public shippingInfo; // Each user's shipping information

    event ItemListed(uint256 indexed itemId, string name, string imageUrl, uint256 cost, uint256 stock, address indexed seller);
    event ItemPurchased(address indexed buyer, uint256 itemId, uint256 quantity);
    event ShippingInfoUpdated(address indexed user, string name, string street, string city, string postalCode, string country);
=======
    mapping(uint256 => ShippingInfo) public shippingDetails;

    event Buy(address indexed buyer, uint256 itemId, uint256 quantity);
    event List(uint256 indexed itemId, string name, string imageUrl, uint256 cost, uint256 stock);
    event ShippingUpdated(uint256 itemId, string name, string street, string city, string postalCode, string country, bool shipped);
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier onlySellerOrOwner(uint256 itemId) {
        require(msg.sender == items[itemId].seller || msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        string memory _category,
        string memory _imageUrl,
        uint256 _costWei,
<<<<<<< HEAD
        uint256 _stock,
        address payable _seller
    ) public onlyOwner {
        uint256 newItemId = itemCount++;
        items[newItemId] = Item(newItemId, _name, _category, _imageUrl, _costWei, _stock, _seller);
        emit ItemListed(newItemId, _name, _imageUrl, _costWei, _stock, _seller);
=======
        uint256 _stock
    ) public {
        items[itemCount] = Item({
            id: itemCount,
            name: _name,
            category: _category,
            imageUrl: _imageUrl,
            cost: _costWei,
            stock: _stock,
            seller: payable(msg.sender)  // Set the seller to the message sender
        });
        emit List(itemCount, _name, _imageUrl, _costWei, _stock);
        itemCount++;
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03
    }

    function buy(uint256 _id, uint256 _quantity) public payable {
        require(_id > 0 && _id < itemCount, "Item does not exist");
        Item storage item = items[_id];
        require(msg.value >= item.cost * _quantity, "Not enough ether sent");
        require(item.stock >= _quantity, "Not enough items in stock");

        item.stock -= _quantity;
        orders[msg.sender].push(_id);
        emit ItemPurchased(msg.sender, _id, _quantity);

<<<<<<< HEAD
        // Transfer money to the seller
        item.seller.transfer(msg.value);
    }

    function setShippingInfo(string memory _name, string memory _street, string memory _city, string memory _postalCode, string memory _country) public {
        shippingInfo[msg.sender] = ShippingInfo(_name, _street, _city, _postalCode, _country);
        emit ShippingInfoUpdated(msg.sender, _name, _street, _city, _postalCode, _country);
    }

    function getShippingInfo(address _user) public view returns (ShippingInfo memory) {
        return shippingInfo[_user];
=======
        emit Buy(msg.sender, _id, quantity);
        items[_id].seller.transfer(msg.value);  // Pay the seller directly
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");
        payable(owner).transfer(balance);
    }
<<<<<<< HEAD
=======

    function getOrders(address user) public view returns (uint256[] memory) {
        return orders[user];
    }

    function buyWithToken(uint256 _id, uint256 quantity, address tokenAddress) public {
        Item storage item = items[_id];
        require(item.id != 0, "Item does not exist");
        require(item.stock >= quantity, "Insufficient stock");
        
        IERC20 token = IERC20(tokenAddress);
        uint256 totalCost = item.cost * quantity;
        require(token.transferFrom(msg.sender, item.seller, totalCost), "Failed to transfer tokens");

        item.stock -= quantity;
        orders[msg.sender].push(_id);
        emit Buy(msg.sender, _id, quantity);
    }

    function setShippingInfo(
        uint256 _id,
        string memory _name,
        string memory _street,
        string memory _city,
        string memory _postalCode,
        string memory _country
    ) public onlySellerOrOwner(_id) {
        ShippingInfo storage info = shippingDetails[_id];
        info.name = _name;
        info.street = _street;
        info.city = _city;
        info.postalCode = _postalCode;
        info.country = _country;
        info.shipped = false;
        emit ShippingUpdated(_id, _name, _street, _city, _postalCode, _country, false);
    }

    function markAsShipped(uint256 _id) public onlySellerOrOwner(_id) {
        ShippingInfo storage info = shippingDetails[_id];
        require(!info.shipped, "Item already shipped");
        info.shipped = true;
        emit ShippingUpdated(_id, info.name, info.street, info.city, info.postalCode, info.country, true);
    }
>>>>>>> 76c170b171dd8f1fe2490ddbb83e72226eeb5c03
}
