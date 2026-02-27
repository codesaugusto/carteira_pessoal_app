import { Wallet, CreditCard, Building, PiggyBank } from "lucide-react";
import type { Wallet as WalletType } from "../data/walletsData";
import { WALLETS_CONFIG } from "../data/walletsData";

const getIconForWallet = (iconName: string) => {
  const iconClass = "text-green-500 w-6 h-6";

  switch (iconName) {
    case "cash":
      return <Wallet className={iconClass} />;
    case "card":
      return <CreditCard className={iconClass} />;
    case "bank":
      return <Building className={iconClass} />;
    case "savings":
      return <PiggyBank className={iconClass} />;
    default:
      return <Wallet className={iconClass} />;
  }
};

export const getWalletsWithIcons = (): WalletType[] => {
  return WALLETS_CONFIG.map((wallet) => ({
    ...wallet,
    icon: getIconForWallet(wallet.iconName),
  }));
};
