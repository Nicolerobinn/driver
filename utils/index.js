const CryptoJS = require('./aes.js');
const key = CryptoJS.enc.Utf8.parse('8c88c1d31bf1ca02120fb592555f5429');

export const  encrypt = (word)=>{
	const srcs = CryptoJS.enc.Utf8.parse(word);
	const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return encrypted.toString();
}
export const  decrypt = (word)=>{
	const decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	const JSON_DEC =  CryptoJS.enc.Utf8.stringify(decrypt);
	return JSON.parse(JSON_DEC)
}

 //解密方法
 // export const decrypt = (word)=> {
 //     const decrypt = CryptoJS.AES.decrypt(word, key, {
 //         mode: CryptoJS.mode.CBC,
 //         padding: CryptoJS.pad.Pkcs7
 //     });
 //     const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
 //     return decryptedStr.toString();
 // }
 // //加密方法
 // export const  encrypt = (word)=>{
 //     const srcs = CryptoJS.enc.Utf8.parse(word);
 //     const encrypted = CryptoJS.AES.encrypt(srcs, key, {
 //         mode: CryptoJS.mode.CBC,
 //         padding: CryptoJS.pad.Pkcs7
 //     });
 //     return encrypted.ciphertext.toString().toUpperCase();
 // }