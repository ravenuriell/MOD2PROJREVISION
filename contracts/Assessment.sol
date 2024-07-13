// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdraw(address indexed withdrawer, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    enum TransactionType { Deposit, Withdraw, Transfer }

    struct Transaction {
        address user;
        address to;
        uint256 amount;
        TransactionType transactionType;
    }

    Transaction[] public transactionHistory;

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionHistory.length;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        require(msg.value == _amount, "Amount mismatch with value sent");
        balance += _amount;
        transactionHistory.push(Transaction(msg.sender, address(0), _amount, TransactionType.Deposit));
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        payable(msg.sender).transfer(_withdrawAmount);
        transactionHistory.push(Transaction(msg.sender, address(0), _withdrawAmount, TransactionType.Withdraw));
        emit Withdraw(msg.sender, _withdrawAmount);
    }

    function transfer(address payable _to) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= 1 ether, "Insufficient balance");
        balance -= 1 ether;
        _to.transfer(1 ether);
        transactionHistory.push(Transaction(msg.sender, _to, 1 ether, TransactionType.Transfer));
        emit Transfer(msg.sender, _to, 1 ether);
    }

    receive() external payable {
        balance += msg.value;
    }
}
