import {useRecoilState} from "recoil";
import {accountSelector} from "@/states/states";

export const useAccount = () => {
  const [account, setAccountInfo] = useRecoilState(accountSelector)

  const setAccount = (account) => {
    setAccountInfo(account)
  }

  const isLoggedIn = () => {
    return account.loggedIn
  }

  const getAddress = () => {
    return account.addr
  }

  return {
    account,
    isLoggedIn,
    setAccount,
    getAddress
  }
}