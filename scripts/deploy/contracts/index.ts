import { ethers as tsEthers } from "ethers";
import * as NFT from "./NFT";

export interface DeploymentModule {
  contractNames: (...params: any) => string[];
  constructorArguments: (addresses?: any) => any[];
  deploy: (
    deployer: tsEthers.Signer,
    setAddresses: Function,
    addresses?: any
  ) => Promise<tsEthers.Contract>;
  upgrade?: (deployer: tsEthers.Signer, addresses?: any) => void;
}

const modules: DeploymentModule[] = [NFT];

export default modules;
