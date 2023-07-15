// @ts-nocheck
import * as fcl from "@onflow/fcl"
import "../../../../flow/config"

export const login = async () => {
  return new Promise((resolve, reject) => {
    fcl.logIn().then(account => {
      console.log(account)
      resolve(account)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}

export const getCreateNFTs = async (accountAddress: string) => {
  const NFTIds = await getNFTIds(accountAddress)
  try {
    // @ts-ignore
    const promises = NFTIds.map(id => getMetadata(id, accountAddress)); // getMetadata를 각 ID에 대해 호출
     // 모든 getMetadata 호출이 완료될 때까지 기다림
    return await Promise.all(promises); // 모든 결과를 반환
  } catch (error) {
    console.error(`Error in getAllMetadata: ${error}`);
    throw error;
  }
}

export const getNFTIds = async (accountAddress: string) => {
  const resultID = await fcl.query({
    cadence: `
        import NUPY from 0x6e1d1217a98b542c //재배포시 여기 주소 바뀌어야함

        // Print the NFTs owned by account
        pub fun main(address: Address) : [UInt64] {
          // Get the public account object for account 0x01
          let nftOwner = getAccount(address)
      
          // Find the public Receiver capability for their Collection
          let capability = nftOwner.getCapability<&{NUPY.NFTReceiver}>(NUPY.CollectionPublicPath)
      
          // borrow a reference from the capability
          let receiverRef = capability.borrow()
                  ?? panic("Could not borrow receiver reference")
      
          // Log the NFTs that they own as an array of IDs
          log("Account 1 NFTs")
          log(receiverRef.getIDs())
          return receiverRef.getIDs()
      }
      `,
    args: (arg, t) => [arg(accountAddress, t.Address)], //조회하고자하는 계정주소
  })
  return resultID
}

export const getMetadata = async (id: number, accountAddress: string) => {
  const metadata = await fcl.query({
    cadence: `
        import NUPY from 0x6e1d1217a98b542c

        // Print the NFTs owned by account
        pub fun main(address: Address, id: UInt64) : String {
          // Get the public account object for account 0x01
          let nftOwner = getAccount(address)
      
          // Find the public Receiver capability for their Collection
          let capability = nftOwner.getCapability<&{NUPY.NFTReceiver}>(NUPY.CollectionPublicPath)
      
          // borrow a reference from the capability
          let receiverRef = capability.borrow()
                  ?? panic("Could not borrow receiver reference")
      
          return receiverRef.getMetadata(id: id)
      }
      `,
    args: (arg, t) => [ //main 에 들어갈 arguments
      arg(accountAddress, t.Address), //지갑주인
      arg(id, t.UInt64), //nft ID
    ],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
  });
  return metadata
}

// @ts-ignore
export const mintAll = async (metaData) => {
  let results = [];
  for(let i = 0; i < 10; i++) {
    metaData.name = `${metaData.name} #${i + 1}`
    let result = await mintOne(metaData);
    results.push(result);
  }
  return results;
}


// @ts-ignore
export const mintOne = async (metaData) => {
  console.log(metaData)
  const transactionId = await fcl.mutate({
    cadence: `
        import NUPY from 0x6e1d1217a98b542c. //중요

        transaction(metadata: String) {

          // The reference to the collection that will be receiving the NFT
          let receiverRef: &{NUPY.NFTReceiver}

          prepare(acct: AuthAccount) {
              // Get the owner's collection capability and borrow a reference
              self.receiverRef = acct.getCapability<&{NUPY.NFTReceiver}>(NUPY.CollectionPublicPath)
                  .borrow()
                  ?? panic("Could not borrow receiver reference")
          }

          execute {
              // Use the minter reference to mint an NFT, which deposits
              // the NFT into the collection that is sent as a parameter.
              let newNFT <- NUPY.mintNFT(metadata:metadata)

              self.receiverRef.deposit(token: <-newNFT)

              log("NFT Minted and deposited to NUPY ADMIN's Collection")
          }
      }  
      `,
    args: (arg, t) => [arg('{"json":"1ds","key2":"value Hi"}', t.String)], //메타데이터
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};