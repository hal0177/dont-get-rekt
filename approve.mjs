import { ethers } from "ethers"
import dotenv from "dotenv"
import { LedgerSigner } from "@ethersproject/hardware-wallets"

import ERC20_ABI from "./erc20Abi.mjs"

dotenv.config()

const GATE = process.env.GATE
const APPROVAL = process.env.APPROVAL

const ERC20_ADDR = "0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454"
const spender = "0xB8672c799291C2A754578791459d9865B68f33E2"

const erc20Interface = new ethers.utils.Interface(ERC20_ABI)

const connect = () => {
  const provider = new ethers.providers.JsonRpcProvider(GATE)
  const signer = new LedgerSigner(provider)
  
  return { provider, signer }
}

const approve = async () => {
  const { signer } = connect()
  const token = new ethers.Contract(ERC20_ADDR, ERC20_ABI, signer)
  
  try {
    console.log(`Setting allowance of ${ spender } to ${ APPROVAL }`)
    await token.approve(spender, ethers.utils.parseUnits(APPROVAL))
    console.log(`Successfully set allowance.`)
  } catch(err) {
    console.log(err.message)
  }
}

approve()
