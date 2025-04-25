import * as ethers from "ethers";
import drawwinnerAbi from "../json/drawwinner_json"
import developersubmitAbi from "../json/developersubmit_json"
import currentsubmitAbi from "../json/currentsubmit_json"
import committeesAbi from "../json/committees_json"
import attachsubmitAbi from "../json/attachsubmit_json"
import alternatesubmitAbi from "../json/alternatesubmit_json"

import {makeAutoObservable} from 'mobx'

class Wallet{
    
    providers = new ethers.providers.JsonRpcProvider('https://dream-rpc.somnia.network')
    
    
    committeescontractAddress = "0xD5EC8B599B86F8078fdAeeD7cAA95bFb7f791a20"
    currentsubmitcontractAddress = "0xb0EDbAF295AAaD5fD237270ca6801fcf9066c92c"
    alternatesubmitcontractAddress = "0x0933C19E58b976E23F8c402784487D33D19F78f5"
    attachsubmitcontractAddress = "0xdFE7c4c6948E467FB33e5B462D5A48F491670d87"
    developersubmitcontractAddress = "0x3aFAF0E99d0aaF2d1df608d51087525e6652D463"
    drawwinnercontractAddress = "0xe5756011922032DeeCB6102d44cF261189D547d2"

    chainID = 50312

    drawwinnercontract = new ethers.Contract(this.drawwinnercontractAddress, drawwinnerAbi, this.providers)
    developersubmitcontract = new ethers.Contract(this.developersubmitcontractAddress, developersubmitAbi, this.providers)
    currentsubmitcontract = new ethers.Contract(this.currentsubmitcontractAddress, currentsubmitAbi, this.providers)
    committeescontract = new ethers.Contract(this.committeescontractAddress, committeesAbi, this.providers)
    attachsubmitcontract = new ethers.Contract(this.attachsubmitcontractAddress, attachsubmitAbi, this.providers)
    alternatesubmitcontract = new ethers.Contract(this.alternatesubmitcontractAddress, alternatesubmitAbi, this.providers)
    
    constructor(){
        makeAutoObservable(this)
    }
    reset() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner()
        this.drawwinnercontract = new ethers.Contract(this.drawwinnercontractAddress, drawwinnerAbi, this.signer)
        this.developersubmitcontract = new ethers.Contract(this.developersubmitcontractAddress, developersubmitAbi, this.signer)
        this.currentsubmitcontract = new ethers.Contract(this.currentsubmitcontractAddress, currentsubmitAbi, this.signer)
        this.committeescontract = new ethers.Contract(this.committeescontractAddress, committeesAbi, this.signer)
        this.attachsubmitcontract = new ethers.Contract(this.attachsubmitcontractAddress, attachsubmitAbi, this.signer)
        this.alternatesubmitcontract = new ethers.Contract(this.alternatesubmitcontractAddress, alternatesubmitAbi, this.signer)
      }

}
const ChainWallet = new Wallet()

export {ChainWallet}