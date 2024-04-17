// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

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
        address payable seller;
    }

    struct ShippingInfo {
        string name;
        string street;
        string city;
        string postalCode;
        string country;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public orders;
    mapping(address => ShippingInfo) public shippingInfo; // Each user's shipping information

    event ItemListed(uint256 indexed itemId, string name, string imageUrl, uint256 cost, uint256 stock, address indexed seller);
    event ItemPurchased(address indexed buyer, uint256 itemId, uint256 quantity);
    event ShippingInfoUpdated(address indexed user, string name, string street, string city, string postalCode, string country);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
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
        uint256 _stock,
        address payable _seller
    ) public onlyOwner {
        uint256 newItemId = itemCount++;
        items[newItemId] = Item(newItemId, _name, _category, _imageUrl, _costWei, _stock, _seller);
        emit ItemListed(newItemId, _name, _imageUrl, _costWei, _stock, _seller);
    }

    function buy(uint256 _id, uint256 _quantity) public payable {
        require(_id > 0 && _id < itemCount, "Item does not exist");
        Item storage item = items[_id];
        require(msg.value >= item.cost * _quantity, "Not enough ether sent");
        require(item.stock >= _quantity, "Not enough items in stock");

        item.stock -= _quantity;
        orders[msg.sender].push(_id);
        emit ItemPurchased(msg.sender, _id, _quantity);

        // Transfer money to the seller
        item.seller.transfer(msg.value);
    }

    function setShippingInfo(string memory _name, string memory _street, string memory _city, string memory _postalCode, string memory _country) public {
        shippingInfo[msg.sender] = ShippingInfo(_name, _street, _city, _postalCode, _country);
        emit ShippingInfoUpdated(msg.sender, _name, _street, _city, _postalCode, _country);
    }

    function getShippingInfo(address _user) public view returns (ShippingInfo memory) {
        return shippingInfo[_user];
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");
        payable(owner).transfer(balance);
    }
}
