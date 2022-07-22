import { deployProxy, upgradeProxy } from "../utils";
import { Mesh } from "../../../build/typechain";

export const contractNames = () => ["mesh"];
export const constructorArguments = () => [];

export const deploy = async (deployer, setAddresses) => {
  console.log("deploying Mesh");
  const mesh: Mesh = (await deployProxy(
    "Mesh",
    constructorArguments(),
    deployer,
    1
  )) as Mesh;
  console.log(
    `deployed Mesh to address ${mesh.address}`
  );
  setAddresses({ mesh: mesh.address });
  return mesh;
};

export const upgrade = async (deployer, addresses) => {
  return await upgradeProxy(
    "Mesh",
    addresses.mesh,
    deployer,
    1
  );
};
