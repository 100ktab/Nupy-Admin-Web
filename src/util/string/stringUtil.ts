import {CountryCodes} from "@/util/statics/IOSCounryCode";

export const rexpString = (input: string) => {
  const pattern = new RegExp(input.toUpperCase().split(/[,\s]+/).join('|'), "i")
  const searchResult = CountryCodes.filter(([countryCode, countryName]) => {
    return pattern.test(countryName)
  })
  console.log(searchResult)
  return searchResult
}


export const checkSameString = (input: string) => {
  const searchResult = CountryCodes.filter(([countryCode, countryName]) => {
    return countryName === (input.toUpperCase())
  })
  return searchResult
}

export const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}