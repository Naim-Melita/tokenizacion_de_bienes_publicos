import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Despliega los contratos "YourContract" y "RealEstateNFT"
 */
const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // ✅ Desplegar YourContract (por defecto del scaffold)
  await deploy("YourContract", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
  console.log("👋 Initial greeting:", await yourContract.greeting());

  // ✅ Desplegar RealEstateNFT
  await deploy("RealEstateNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("🏠 RealEstateNFT contract deployed successfully");
};

export default deployContracts;

deployContracts.tags = ["YourContract", "RealEstateNFT"];
