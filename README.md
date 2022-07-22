# DLTx Meshie NFTs
Each member of the DLTx mesh is entitled to an Ethereum "Meshie" NFT, representing their status as a formal member of DLTx Labs.

## What the NFT means

The NFT represents membership of the DLTx Mesh. NFT holders have access to any special rights and privileges that have been arranged for mesh members, which may include access to certain online resources, discounted products, or other benefits. 

## Soul-bound Token

Once minted, a DLTx Mesh NFT can not be transferred. It is bound to the original owner for all time.

## Upgrading to Sudo

A DLTx mesh member can be recognised as a "Sudo" if two other Sudo mesh members send an `approveUpgrade` transaction specifying their token. To be recognised as Sudo means that the mesh member has performed extraordinary feats such as:
- Demonstrating leadership and mentoring other Mesh members.
- Contributing to open source projects, developing communities or building their own open source projects.
- Representing DLTx values in the community by speaking or running events such as Hackathons.
- Owning a project to completion.  Working with Product Owner and Project Manager to deliver quality solutions.
- Being an SME or dragon-born in specific tech such as Solidity, AWS or a programming language.
- Getting formal or informal verification for these achievements or credentials.

## Metadata

DLTx metadata is stored on-chain. Although the URL specifies a link to the DLTx website, the JSON returned contains values pulled from the chain.

### startTimestamp
The date that the person joined the DLTx Mesh.

### endTimestamp
If the person has left the DLTx Mesh, the date that they did so.

### probationSeconds
The duration of the mesh member's probationary period, as defined in their employment contract.

### isSudo
If true, the mesh member has been recognised as a Sudo (see above).
