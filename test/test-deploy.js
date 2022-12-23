const { ethers, run, network } = require("hardhat")
const { expect, assert } = require("chai")

// describe("Nft", () => {})
describe("Nft", function () {
    let NftFactory, Nft
    beforeEach(async function () {
        NftFactory = await ethers.getContractFactory("NFT")
        Nft = await NftFactory.deploy("www.notreveal.com", 1, 1)
    })

    it("To check if the reveal feature is working or not", async function () {
        Nft.editMintWindows(true, false)
        for (let i = 0; i < 2; i++) {
            await Nft.publicMint({ value: ethers.utils.parseEther("2.0") })
        }
        const Uri = "www.example.xyz"
        await Nft.reveal()
        await Nft.setRevealUri(Uri)
        const Reveal_URI = await Nft.tokenURI(1)
        // assert
        // expect
        assert.equal(Reveal_URI.toString(), Uri)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("To test rental part", async function () {
        Nft.editMintWindows(true, false)
        for (let i = 0; i < 2; i++) {
            await Nft.publicMint({ value: ethers.utils.parseEther("2.0") })
        }
        const expectedPersonaddress =
            "0xcd3B766CCDd6AE721141F452C550Ca635964ce71"
        const tokenNumber = 1
        const expirytime = 1671810180
        const transactionResponse = await Nft.setUser(
            tokenNumber,
            expectedPersonaddress,
            expirytime
        )
        const expiry = await Nft.userExpires(1)
        const Tenant = await Nft.userOf(1)
        console.log(
            `The expiry date is ${expiry} and rental ownership is ${Tenant}`
        )
        //await transactionResponse.wait(1)
        //const { favoriteNumber, name } = await Nft.people(0)
        // We could also do it like this
        // const person = await simpleStorage.people(0)
        // const favNumber = person.favoriteNumber
        // const pName = person.name

        //assert.equal(name, expectedPersonName)
        //assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
