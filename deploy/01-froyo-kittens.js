const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    log("----------------")
    const args = ["baobao"]
    const kopoko = await deploy("FroyoKittens", {
        from: deployer,
        log: true,
        args: args,
        waitConfirMations: network.config.blockConfirmations || 1,
    })
}
