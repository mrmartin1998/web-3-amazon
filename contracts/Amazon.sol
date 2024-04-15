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
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public orders;

    event Buy(address indexed buyer, uint256 itemId, uint256 quantity);
    event List(uint256 indexed itemId, string name, string imageUrl, uint256 cost, uint256 stock);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
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
    ) public onlyOwner {
        items[itemCount] = Item({
            id: itemCount,
            name: _name,
            category: _category,
            imageUrl: _imageUrl,
            cost: _costWei,
            stock: _stock
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
        payable(owner).transfer(msg.value);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");
        payable(owner).transfer(balance);
    }

    function getOrders(address user) public view returns (uint256[] memory) {
        return orders[user];
    }
}
