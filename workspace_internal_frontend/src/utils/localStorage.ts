
import CryptoJS from "crypto-js";
import { IApplicationState } from "../Store/state/app-state";

export const loadStorage = (): IApplicationState => {
  const decryptedStore = localStorage.getItem("Hrms-state");
  try {
    if (decryptedStore === null) {
      return undefined;
    } else {
      const bytesStore = CryptoJS.AES.decrypt(
        decryptedStore,
        import.meta.env.VITE_CIPHER
      );
      const serializedStore = bytesStore.toString(CryptoJS.enc.Utf8);
      return JSON.parse(serializedStore);
    }
  } catch (error) {
    console.log('Error While Getting LocalStorage State!!!');
  }
};

export const saveStorage = (state: IApplicationState) => {
  try {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem(
      "Hrms-state",
      CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(serializedState),
        import.meta.env.VITE_CIPHER
      ).toString()
    );
  } catch (error) {
    console.log('Error While Saving LocalStorage State!!!');
  }
};
