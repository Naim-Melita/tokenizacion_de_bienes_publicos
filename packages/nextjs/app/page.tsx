"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Logo } from "~~/components/Logo";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { chain } = useNetwork();

  const realEstate = (deployedContracts[31337] as any)?.RealEstateNFT;

  // Logs para depuración
  console.log("📡 Connected Address:", connectedAddress);
  console.log("🌐 Chain info:", chain);
  console.log("📦 Contract Info:", realEstate);

  const args = connectedAddress ? [connectedAddress, "ipfs://metadata-uri-ejemplo"] : undefined;

  const {
    data,
    write,
    isLoading: isWriting,
    error: writeError,
  } = useContractWrite({
    address: realEstate?.address as `0x${string}`,
    abi: realEstate?.abi,
    functionName: "mint",
    args,
    chainId: chain?.id,
  });

  if (writeError) {
    console.error("❌ Write Error:", writeError);
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Log para el click en el botón
  const handleMint = () => {
    console.log("🚀 Mint button clicked");
    if (write) {
      write();
    } else {
      console.error("Write function not ready");
    }
  };

  return (
    <section className="flex items-center flex-col flex-grow pt-10 px-4">
      {/* Branding */}
      <div className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <Logo size={48} />
          Tokenización de bienes públicos
        </h1>
        <div className="mt-4">
          <p>Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
      </div>

      {/* Acción del contrato */}
      <div className="mt-8">
        <button className="btn btn-primary" disabled={!write || isWriting || isConfirming} onClick={handleMint}>
          {isWriting || isConfirming ? "Minteando..." : "Mintear propiedad NFT"}
        </button>

        {isConfirmed && <p className="text-green-500 mt-2">✅ NFT minteado exitosamente</p>}
        {writeError && <p className="text-red-500 mt-2">Error: {writeError.message}</p>}
      </div>

      {/* Navegación opcional */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-base-100 rounded-xl text-center">
          <BugAntIcon className="h-8 w-8 mx-auto mb-2" />
          <Link href="/debug" className="link">
            Debug Contracts
          </Link>
        </div>
        <div className="p-6 bg-base-100 rounded-xl text-center">
          <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2" />
          <Link href="/blockexplorer" className="link">
            Block Explorer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
