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
        address payable seller;  // Store the seller's address
    }

    struct ShippingInfo {
        string name;
        string street;
        string city;
        string postalCode;
        string country;
        bool shipped;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public orders;
    mapping(uint256 => ShippingInfo) public shippingDetails;

    event Buy(address indexed buyer, uint256 itemId, uint256 quantity);
    event List(uint256 indexed itemId, string name, string imageUrl, uint256 cost, uint256 stock);
    event ShippingUpdated(uint256 itemId, string name, string street, string city, string postalCode, string country, bool shipped);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
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
    }

    function buy(uint256 _id, uint256 quantity) public payable {
        require(items[_id].id != 0, "Item does not exist");
        require(items[_id].stock >= quantity, "Insufficient stock");
        require(msg.value >= items[_id].cost * quantity, "Not enough ether sent");

        items[_id].stock -= quantity;
        orders[msg.sender].push(_id);

        emit Buy(msg.sender, _id, quantity);
        items[_id].seller.transfer(msg.value);  // Pay the seller directly
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");
        payable(owner).transfer(balance);
    }

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
}
