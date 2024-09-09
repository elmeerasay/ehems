require('dotenv').config();
const { ethers } = require('ethers');

// Mengambil RPC URL dan Private Key dari file .env
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

// Inisialisasi provider dan wallet
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Fungsi untuk melakukan swap dengan metode execute
async function executeSwap(swap) {
    const { contractAddress, commands, inputs, logMessage } = swap;

    // ABI untuk kontrak yang memiliki metode execute
    const abi = [
        "function execute(bytes commands, bytes[] inputs, uint256 deadline) public"
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
        // Tentukan deadline (timestamp) untuk transaksi ini. Misalnya, 10 menit dari sekarang.
        const deadline = Math.floor(Date.now() / 1000) + 600;

        // Log deskriptif sebelum transaksi
        console.log(`${logMessage}`);

        // Kirim transaksi ke kontrak
        const tx = await contract.execute(commands, inputs, deadline);
        console.log('Transaction hash:', tx.hash);
        
        // Tunggu konfirmasi transaksi
        const txReceipt = await tx.wait();
        console.log('Transaction confirmed in block:', txReceipt.blockNumber);
    } catch (error) {
        console.error('Error executing swap:', error.reason);
    }
}

// Data untuk swap dengan log message
const swaps = [
    {
        contractAddress: '0xA18019E62f266C2E17e33398448e4105324e0d0F',
        commands: '0x00',
        inputs: [
            "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000e156994cc1eac4000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000423adf21a6cbc9ce6d5a3ea401e7bae9499d3912980000640c8afd1b58aa2a5bad2414b861d8a7ff898edc3a000bb8ec46e0efb2ea8152da0327a5eb3ff9a43956f13e000000000000000000000000000000000000000000000000000000000000"
        ],
        logMessage: 'SWAP 1 USDT TO DAI',
    },
    {
        contractAddress: '0xA18019E62f266C2E17e33398448e4105324e0d0F',
        commands: '0x00',
        inputs: [
            "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000f29f100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002bec46e0efb2ea8152da0327a5eb3ff9a43956f13e0000643adf21a6cbc9ce6d5a3ea401e7bae9499d391298000000000000000000000000000000000000000000"
        ],
        logMessage: 'SWAP 1 DAI TO USDT',
    },
    {
        contractAddress: '0xA18019E62f266C2E17e33398448e4105324e0d0F',
        commands: '0x00',
        inputs: [
            "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000016ba3200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000042ec46e0efb2ea8152da0327a5eb3ff9a43956f13e000bb80c8afd1b58aa2a5bad2414b861d8a7ff898edc3a000064d47971c7f5b1067d25cd45d30b2c9eb60de96443000000000000000000000000000000000000000000000000000000000000"
        ],
        logMessage: 'SWAP 1 DAI TO USDC',
    },
];

// Menjalankan semua swap
async function main() {
    for (const swap of swaps) {
        await executeSwap(swap);
    }
}

// Menjalankan fungsi utama
main().catch(console.error);
