const { ethers, getNamedAccounts } = require("hardhat")
const maxPriorityFeePerGas = ethers.utils.parseUnits("3", "gwei")
const maxFeePerGas = ethers.utils.parseUnits("5", "gwei")
async function main() {
    const { deployer } = await getNamedAccounts()
    const mintFactory = await ethers.getContract("MintFactory")

    console.log("withdraw from contracts..")
    const tx = await mintFactory.batchWithdraw(deployer, {
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
        gasLimit: "20000000",
    })
    await tx.wait()

    // console.log(txReceipt)
    console.log("withdraw complete..")

    const txDeleteMintArray = await mintFactory.deleteMintArray()
    await txDeleteMintArray.wait()
    const mintArray = await mintFactory.getContractMint()
    console.log(mintArray.length)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
