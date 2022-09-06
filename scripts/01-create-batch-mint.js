const { ethers } = require("hardhat")
const MAX_PER_WALLET = 2
const NUM = 25
const NFT_PRICE = ethers.utils.parseEther("0.001")
const value = NFT_PRICE * (MAX_PER_WALLET + 1) * NUM

async function main() {
    const mintFactory = await ethers.getContract("MintFactory")
    const froyoKittens = await ethers.getContract("FroyoKittens")

    console.log(`create ${NUM} BatchMintContract`)
    const tx = await mintFactory.createBatchMint(froyoKittens.address, NUM, {
        value: value.toString(),
    })
    await tx.wait()

    const mintArray = await mintFactory.getContractMint()
    console.log(mintArray.length)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
