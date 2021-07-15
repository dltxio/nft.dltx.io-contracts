import "@nomiclabs/hardhat-ethers";
import { run, ethers } from "hardhat";

async function main() {
  await run("compile");

  const DLTx = await ethers.getContractFactory("DLTx");
  const greeter = await DLTx.deploy();

  console.log(`Greeter deployed to: ${greeter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
