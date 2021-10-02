import io from "socket.io-client";
import { BombGame } from "./Game";
import { PlayerStatus } from "../../commons/index";
import {
  Connection,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
var web3 = require('@solana/web3.js');
var splToken = require('@solana/spl-token');
// import splToken from "@solana/spl-token";
// import web3 from "@solana/web3.js";

let transactionComplete = false;
let connection;
let wallet;

(function() {
  function startGame() {
    try {
      const socket = io();
      BombGame(socket, {
        parent: "game-container",
        onDeath: showDeathMessage,
        onStart: () => setState("state-playing"),
        onStatusUpdate: onStatusUpdate,
      }).startGame();
    } catch (e) {
      console.error(e);
    }
  }

  // const connectWallet = async () => {
  //   connection = new Connection(clusterApiUrl("testnet"), 'confirmed');
  //   let providerUrl = "https://www.sollet.io";
  //   // let providerUrl = window.sollet;
  //   wallet = new Wallet(providerUrl, "testnet");
  //   wallet.on("connect", (publicKey) =>
  //     console.log("Connected to " + publicKey.toBase58())
  //   );
  //   wallet.on("disconnect", () => console.log("Disconnected"));
  //   await wallet.connect();

  //   let transaction = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: wallet.publicKey,
  //       toPubkey: "42pSkNfUbggFne4vVuBrciAgnNMcP9rPo9EftmwFyd6E",
  //       lamports: 10000000,
  //     })
  //   );

  //   let { blockhash } = await connection.getRecentBlockhash();
  //   transaction.recentBlockhash = blockhash;
  //   transaction.feePayer = wallet.publicKey;
  //   let signed = await wallet.signTransaction(transaction);
  //   let txid = await connection.sendRawTransaction(signed.serialize());
  //   let confirmTransc = await connection.confirmTransaction(txid);
  //   if (connection.confirmTransaction(txid)) {
  //     alert("transaction complete");
  //     transactionComplete = true;
  //     startGame();
  //   }
  //   console.log("txid", txid);
  //   console.log("signed", signed);
  //   console.log("Tranasction Confirmed", confirmTransc);

  //   let walletnew = web3.Keypair.generate();
  //   let fromAirdropSignature = await connection.requestAirdrop(
  //     walletnew.publicKey,
  //     web3.LAMPORTS_PER_SOL
  //   );
  //   await connection.confirmTransaction(fromAirdropSignature);
  //   let mint = await splToken.Token.createMint(
  //     connection,
  //     walletnew,
  //     wallet.publicKey,
  //     null,
  //     9,
  //     splToken.TOKEN_PROGRAM_ID
  //   );
  //   console.log(mint);
    
  // };

  // const walletPhantom = async () => {
  //   const isPhantomInstalled = window.solana && window.solana.isPhantom;
  //   if (isPhantomInstalled) {
  //     await window.solana.connect();
  
  //     if ("solana" in window) {
  //       const provider = window.solana;
  //       if (provider.isPhantom) {
  //         const k = await provider.publicKey.toString();
  //         console.log("k", k);
  
  //         const network = "https://api.testnet.solana.com";
  //         const connection = new Connection(network);
  //         // const transaction = new Transaction();
  
  //         var fromPubkey = "274SCbngGs74HaNca8jxR5zWwgeYiMkbf7BrdkP4ByeE";
  //         var toPubkey = "6dTUCnKv5ZHRbh2J8y1JyK9wmAgNqj1PzNDKgWCRnxtQ";
  
  //         const hash = await (await connection.getRecentBlockhash()).blockhash;
  //         console.log(hash);
  
  //         let transaction = new Transaction().add(
  //           SystemProgram.transfer({
  //             fromPubkey: provider.publicKey,
  //             toPubkey: provider.publicKey,
  //             lamports: 10000000,
  //           })
  //         );
  //         transaction.feePayer = provider.publicKey;
  //         transaction.recentBlockhash = hash;
  //         // const signedTransaction = await window.solana.request({
  //         //   method: "signTransaction",
  //         //   params: {
  //         //     message: bs58.encode(transaction.serializeMessage()),
  //         //   },
  //         // });
  //         const signedTransaction = await window.solana.signTransaction(transaction);
  //         const signature = await connection.sendRawTransaction(
  //           signedTransaction.serialize()
  //         );
  //         console.log(signature);
  //         console.log("trans", transaction);
  //         return transaction;
  //       }
  //     }
  //     await window.solana.on("connect", () => console.log("connected!"));
  //   } else {
  //     const getProvider = () => {
  //       if ("solana" in window) {
  //         const provider = window.solana;
  //         if (provider.isPhantom) {
  //           return provider;
  //         }
  //       }
  //       window.open("https://phantom.app/", "_blank");
  //     };
  //     getProvider();
  //   }
  // };

  function showDeathMessage() {
    setState("state-died");
  }

  function setState(state: "state-waiting" | "state-died" | "state-playing") {
    document.body.className = "";
    document.body.classList.add(state);
  }

  function onStatusUpdate(status: PlayerStatus) {
    const bombCount = <HTMLElement>document.getElementById("bomb-count");
    const bombRange = <HTMLElement>document.getElementById("bomb-range");

    bombCount.innerHTML = status.maxBombCount + "";
    bombRange.innerHTML = status.bombRange + "";
  }

  window.onload = function() {
    const connectWalletButton = <HTMLButtonElement>(
      document.getElementById("connectWallet-button")
    );

    const startGameButton = <HTMLButtonElement>(
      document.getElementById("start-button")
    );

    startGameButton.onclick = function() {
      if (transactionComplete) {
        setState("state-waiting");
        startGame();
      } else {
        startGame();
        alert("Connect wallet");
        const connectWalletButton = <HTMLButtonElement>(
          document.getElementById("connectWallet-button")
        );
        connectWalletButton.onclick = function() {
          setState("state-waiting");
          // connectWallet();
        };
      }
      console.log("start-btn");
    };

    // connectWalletButton.onclick = function() {
    //   setState("state-waiting");
    //   connectWallet();
    // };
  };
})();
