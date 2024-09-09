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
            "masukan input data disini, cek manual di explorer hemi"
        ],
        logMessage: 'SWAP 1 USDT TO DAI',
    },
    {
        contractAddress: '0xA18019E62f266C2E17e33398448e4105324e0d0F',
        commands: '0x00',
        inputs: [
            "masukan input data disini, cek manual di explorer hemi"
"
        ],
        logMessage: 'SWAP 1 DAI TO USDT',
    },
    {
        contractAddress: '0xA18019E62f266C2E17e33398448e4105324e0d0F',
        commands: '0x00',
        inputs: [
            "masukan input data disini, cek manual di explorer hemi"
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
