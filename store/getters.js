const getters= {
  sureCode({buffer}){
	if(!buffer){
	  return '' 
	}
	const base64 = wx.arrayBufferToBase64(buffer)
	return `data:image/png;base64,${base64}`;
  },
    
}
export default getters