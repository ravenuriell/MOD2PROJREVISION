import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const bal = await atm.getBalance();
      setBalance(ethers.utils.formatEther(bal));
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(ethers.utils.parseEther("1"), { value: ethers.utils.parseEther("1") }); // 1 ETH in wei
      await tx.wait();
      await getBalance();
      await fetchTransactionHistory();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(ethers.utils.parseEther("1")); // 1 ETH in wei
      await tx.wait();
      await getBalance();
      await fetchTransactionHistory();
    }
  };

  const transfer = async () => {
    if (atm && recipient) {
      let tx = await atm.transfer(recipient);
      await tx.wait();
      await getBalance();
      await fetchTransactionHistory();
    }
  };

  const fetchTransactionHistory = async () => {
    if (atm) {
      const count = await atm.getTransactionCount();
      let transactions = [];
      for (let i = 0; i < count; i++) {
        const tx = await atm.transactionHistory(i);
        transactions.push(tx);
      }
      setTransactions(transactions);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Connect Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button onClick={transfer}>Transfer 1 ETH</button>
        <hr />
        <h3>Transaction History:</h3>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>
              {tx.transactionType === 0
                ? `Deposit ${ethers.utils.formatEther(tx.amount)} ETH`
                : tx.transactionType === 1
                ? `Withdraw ${ethers.utils.formatEther(tx.amount)} ETH`
                : `Transfer ${ethers.utils.formatEther(tx.amount)} ETH to ${tx.to}`}
              &nbsp; by {tx.user}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>LUSTAVIA ETHERIUM NETWORK</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
