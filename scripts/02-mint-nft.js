const { ethers } = require("hardhat")
const maxPriorityFeePerGas = ethers.utils.parseUnits("10", "gwei")
const maxFeePerGas = ethers.utils.parseUnits("30", "gwei")
async function main() {
    const mintFactory = await ethers.getContract("MintFactory")

    const tx = await mintFactory.batchMintStart({
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
    })
    const txReceipt = await tx.wait()
    // console.log(txReceipt)
    const mintArray = await mintFactory.getContractMint()
    console.log(mintArray.length)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
