import {Term} from "../../models/terms/term.model";

export const parsePhrase:(phrase:string)=>Term[] = (phrase: string) => {
  return [...phrase].map(char=> {
    return {type:'char',char}
  })
}
