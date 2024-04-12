// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Amazon {
    address public owner;
    uint256 public itemCount;

    struct Item {
        uint256 id;
        string name;
        string category;
        uint256 cost;
        uint256 stock;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;

    event Buy(address indexed buyer, uint256 itemId);
    event List(uint256 indexed itemId, string name, uint256 cost, uint256 stock);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
    uint256 _id,
    string memory _name,
    string memory _category,
    uint256 _costWei,  // Indicate that this should be in wei
    uint256 _stock
) public onlyOwner {
    require(items[_id].id == 0, "Item already exists");

    items[_id] = Item({
        id: _id,
        name: _name,
        category: _category,
        cost: _costWei,  // Store cost in wei
        stock: _stock
    });

    itemCount++;
    emit List(_id, _name, _costWei, _stock);  // Emit cost in wei
}


    function buy(uint256 _id) public payable {
        Item storage item = items[_id];

        require(item.id != 0, "Item does not exist");
        require(msg.value >= item.cost, "Not enough ether to buy item");
        require(item.stock > 0, "Item is out of stock");

        item.stock--;
        orderCount[msg.sender]++;
        emit Buy(msg.sender, _id);

        // Transfer the amount to owner
        payable(owner).transfer(msg.value);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is 0");

        payable(owner).transfer(balance);
    }
}
