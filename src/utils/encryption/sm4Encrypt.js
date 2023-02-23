const sm4 = require('sm-crypto').sm4
import CryptoJS from 'crypto-js'
let sm4Config = {
	key: 'HENG1AN2WEN3YIN4',
	mode: 'ecb',
	cipherType: 'base64',
}

// const key = '0123456789abcdef'
let key = [1, 18, 35, 52, 69, 86, 103, 120, 1, 18, 35, 52, 69, 86, 103, 120]

function hexToArray(str) {
	const arr = []
	for (let i = 0, len = str.length; i < len; i++) {
		arr.push(parseInt(str.substr(i, 2), 16))
	}
	return arr
}
// 加密
function Encrypt(text) {
	let encryptData = sm4.encrypt(text, key)
	return encryptData
}

// 解密
function Decrypt(text) {
	// let sm4 = new SM4(sm4Config)
	// return sm4.decrypt(text).toString()
}




/**
 * CryptoJS 加密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 加密后的数据
 * @memberof Utils
 */
export const encrypt = (encryptData) => {
	var key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
	var srcs = CryptoJS.enc.Utf8.parse(encryptData)
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	})
	return encrypted.toString()
}

/**
 * CryptoJS 解密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 解密后的数据
 * @memberof Utils
 */
export const decrypt = (encryptData) => {
	var key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
	var decrypt = CryptoJS.AES.decrypt(encryptData, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	})
	return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}


export {
	Encrypt,
	Decrypt
}
