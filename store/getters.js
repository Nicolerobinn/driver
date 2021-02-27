const getters= {
  sureCode({sureCodeBase64}){
	let str = sureCodeBase64.replace(/\. +/g, '')
	str = str.replace(/[\r\n]/g, '')
	return (`data:image/png;base64,${str}`)
  },
    
}
export default getters