import { ethers } from "ethers"
import dotenv from "dotenv"

import ERC20_ABI from "./erc20Abi.mjs"

dotenv.config()

const GATE = process.env.GATE
const PK = process.env.PK
const TX = process.env.TX

const erc20Interface = new ethers.utils.Interface(ERC20_ABI)

const connect = () => {
  const provider = new ethers.providers.JsonRpcProvider(GATE)
  let signer
  if(PK) {
    const owner = new ethers.Wallet(PK)
    signer = owner.connect(provider)
    
    return { provider, signer }
  }

  return { provider }
}

const getTx = async (provider) => {
  const tx = await provider.getTransaction(TX)
  const { args } = erc20Interface.parseTransaction(tx)
  let amount = ethers.utils.formatUnits(args.amount)
  amount = amount === "115792089237316195423570985008687907853269984665640564039457.584007913129639935" ? "infinite" : amount

  console.log(`${ tx.from } approved ${ args.spender } to spend ${ amount } tokens.`)

  return { from: tx.from, tokenAddr: tx.to, spender: args.spender }
}

const approveZero = async () => {
  const { provider, signer } = connect()
  const { from, tokenAddr, spender } = await getTx(provider)
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, signer)

  try {
    console.log(`Revoking spending rights from ${ spender } ...`)
    const approvalTx = await token.approve(spender, 0)
    const approved = await approvalTx.wait()
    console.log(`Success, ${ approved.hash }`)
  } catch(err) {
    console.log(err.message)
  }

  try {
    console.log(`Check new allowance ...`)
    const allowance = await token.allowance(from, spender)
    console.log(`New allowance is ${ ethers.utils.formatUnits(allowance)}`)
  } catch(err) {
    console.log(err.message)
  }
}

approveZero()