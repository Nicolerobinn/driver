const getters= {
  sureCode({sureCodeBase64}){
	return `data:image/png;base64,${sureCodeBase64}`;
  },
    
}
export default getters