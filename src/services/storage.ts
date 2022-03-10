import { SYSTEM } from "@/constants";
import { ERRORS } from "@/constants/errors";

const storage = window.localStorage

const toJson = (data: any): string => {
  return JSON.stringify(data)
}
const toJS = (data: any): any => {
  if (!data) throw new Error(ERRORS.CREATE_NEW_DATABASE);
  return JSON.parse(data)
}

export const handleStorageMutation = (mutation : any, state : any) => {
  if(mutation.type.includes('patch function')){
    storage.setItem(SYSTEM.LOCAL_DB, toJson(state[SYSTEM.LOCAL_DB]))
  }
  
  if(!mutation.payload) return;

  const key = Object.keys(mutation.payload)[0];
  storage.setItem(key, toJson(mutation.payload[key]))
  console.log(`mutation detected ${key}`)
}

export const handleStorageInitiatilization = (externalDb: any): any => {
  let localDb = {};
  try{
    localDb = toJS(storage.getItem(SYSTEM.LOCAL_DB))
  }catch(err: Error | any) {
    // first user session
    if(err.message === ERRORS.CREATE_NEW_DATABASE){
      return toJS(toJson(externalDb));
    }else{
      console.log(err);
    }
  }
  return localDb;
}

export const fetch = (key: string): any => {
  return storage.getItem(key);
}