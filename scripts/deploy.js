const { ethers, run, network } = require("hardhat")

async function main() {
    const NftFactory = await ethers.getContractFactory("NFT")

    console.log("Deploying Contract ....")
    const Nft = await NftFactory.deploy("www.nft.com", 1, 1)
    await Nft.deployed()
    console.log(`Deployed contract to ${Nft.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log(`Waiting for block transaction to complete`)
        await Nft.deployTransaction.wait(6)
        await verify(Nft.address, ["www.nft.xyz", 1, 1])
    }
}

//VERIFYING PROGRAMMATICALLY
async function verify(contractAddress, args) {
    console.log(`Verifying ${contractAddress}`)
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
        // console.log(network.config)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
