const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    log("----------------")
    const args = ["baobao"]
    const froyoKittens = await deploy("FroyoKittens", {
        from: deployer,
        log: true,
        args: args,
        waitConfirMations: network.config.blockConfirmations || 1,
    })
    log(`froyoKittensAddress is ${froyoKittens.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(froyoKittens.address, args)
    }
}
