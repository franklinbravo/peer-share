import { Injectable } from '@angular/core';
import * as crypto from 'crypto'

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  crypto: typeof crypto;
  password: string='franklin';

  constructor() { 
    let privKey='01e5e0e43d7b35ba62a778358be6f32c31825011294d67c30253e90b54ce06cb2cd20ea9c0a1bc7637a8266c07144cc1e806a94a58ea142d62c574c51d71c5b9e41b'
  
    this.cipherTextPlain(privKey)
  }
  createHash(name){
    var hash = crypto.createHash('md5').update(name).digest('hex');
    return hash;
  }

  generateKey(){
    const ecdh = crypto.createECDH('secp521r1')
    ecdh.generateKeys();
    let keyPub=ecdh.getPublicKey().toString('hex')
    let keyPriv=ecdh.getPrivateKey().toString('hex')
    return {keyPub: keyPub,keyPriv:keyPriv}
  }
  gkeys(){
    const iv = Buffer.alloc(16, 0);
  
    // Mi llave
    const ecdh = crypto.createECDH('secp521r1')
    let key='01e5e0e43d7b35ba62a778358be6f32c31825011294d67c30253e90b54ce06cb2cd20ea9c0a1bc7637a8266c07144cc1e806a94a58ea142d62c574c51d71c5b9e41b'
    ecdh.setPrivateKey(key,'hex')
    const ecdhkey= ecdh.getPublicKey()
    console.log(ecdhkey.toString('hex'),'public key')
    // Llave del otro
    const ecdh_2 = crypto.createECDH('secp521r1')
    const ecdhkey_2= ecdh_2.generateKeys();

    let pk1=ecdh.getPrivateKey().toString('hex')
    console.log(pk1, 'key privada')
    let pk2=ecdh_2.getPrivateKey().toString('hex')

    /*
    const p1=pk1.computeSecret(ecdhkey_2);
    console.log('mixta 1',p1)
    const p2=ecdh_2.computeSecret(ecdhkey);
    console.log('mixta 2',p2)

    const resultT=ecdh.computeSecret(p2)
    console.log(resultT,'secreto 1')
    const resultT2=ecdh_2.computeSecret(p1)
    console.log(resultT2, 'secreto 2')*/
  }

  cipherTextPlain(privKey){
    const iv = Buffer.alloc(16, 0);
    var options = {
      hashName: 'sha256',
      hashLength: 32,
      macName: 'sha256',
      macLength: 32,
      curveName: 'secp521r1',
      symmetricCypherName: 'aes-256-cbc',
      iv: iv, // iv is used in symmetric cipher, set null if cipher is in ECB mode. 
      keyFormat: 'compressed',
      s1: null, // optional shared information1
      s2: null // optional shared information2
    }
    let ecdh = crypto.createECDH(options.curveName);
    let ecdhkey=ecdh.generateKeys();
    

    let plainText= Buffer.from('Holaaa que tal')
    
    //cifrado con llave publica de otro
    let result=this.encrypt(privKey,ecdh.getPublicKey(),plainText, options)
    
    let result2=this.decrypt(ecdh, result, options);
    console.log(result.toString('hex'))
    console.log(result2.toString())
  }


  //Preparacion para cifrado
  encrypt(privateKey,publicKey, message, options) {
    options = this.makeUpOptions(options);
    /*
    Usar llave previamente guardada
    */
    var ecdh = crypto.createECDH(options.curveName);
    ecdh.setPrivateKey(privateKey,'hex')
    // R
    let R = Buffer.from(ecdh.getPublicKey(null, options.keyFormat));


    // S
    var sharedSecret = ecdh.computeSecret(publicKey);
    // uses KDF to derive a symmetric encryption and a MAC keys:
    // Ke || Km = KDF(S || S1)
    var hash = this.hashMessage(
        options.hashName,
        Buffer.concat(
            [sharedSecret, options.s1],
            sharedSecret.length + options.s1.length
        )
    );
    // Ke
    var encryptionKey = hash.slice(0,64);
    // Km
    var macKey = hash.slice(hash.length / 2);
    // encriptar el mensaje:
    // c = E(Ke; m);
    var cipherText = this.symmetricEncrypt(options.symmetricCypherName, options.iv, encryptionKey, message);

    // computes the tag of encrypted message and S2: 
    // d = MAC(Km; c || S2)
    var tag = this.macMessage(
        options.macName,
        macKey,
        Buffer.concat(
            [cipherText, options.s2],
            cipherText.length + options.s2.length
        )
    );
    // outputs R || c || d
    return Buffer.concat([R,cipherText, tag]);
  };
  symmetricEncrypt(cypherName, iv, key, plaintext) {
    let cipher = crypto.createCipheriv(cypherName, key, iv);
    var firstChunk = cipher.update(plaintext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
  }
  symmetricDecrypt(cypherName, iv, key, ciphertext) {
    let cipher = crypto.createDecipheriv(cypherName, key, iv);
    var firstChunk = cipher.update(ciphertext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
  }

  decrypt(ecdh, message, options) {
    options = this.makeUpOptions(options);
    var publicKeyLength = ecdh.getPublicKey(null, options.keyFormat).length;
    // R
    var R = message.slice(0, publicKeyLength);
    // c
    var cipherText = message.slice(publicKeyLength, message.length - options.macLength);
    // d
    var messageTag = message.slice(message.length - options.macLength);

    // S
    var sharedSecret = ecdh.computeSecret(R);
    // derives keys the same way as Alice did:
    // Ke || Km = KDF(S || S1)
    var hash = this.hashMessage(
        options.hashName,
        Buffer.concat(
            [sharedSecret, options.s1],
            sharedSecret.length + options.s1.length
        )
    );
    // Ke
    var encryptionKey = hash.slice(0,64);
    // Km
    var macKey = hash.slice(hash.length / 2);

    // uses MAC to check the tag
    var keyTag = this.macMessage(
        options.macName,
        macKey,
        Buffer.concat(
            [cipherText, options.s2],
            cipherText.length + options.s2.length
        )
    );


    // uses symmetric encryption scheme to decrypt the message
    // m = E-1(Ke; c)
    return this.symmetricDecrypt(options.symmetricCypherName, options.iv, encryptionKey, cipherText);
  }

  //--------------------------
  hashMessage(cypherName, message) {
    return crypto.createHash(cypherName).update(message).digest();
  }
  macMessage(cypherName, key, message) {
    return crypto.createHmac(cypherName, key).update(message).digest();
  }

  //--------------------------
  makeUpOptions(options) {
    options = options || {};
    if (options.hashName == undefined) {
        options.hashName = 'sha256';
    }
    if (options.hashLength == undefined) {
        options.hashLength = this.hashMessage(options.hashName, '').length;
    }
    if (options.macName == undefined) {
        options.macName = 'sha256';
    }
    if (options.macLength == undefined) {
        options.macLength = this.macMessage(options.hashName, '', '').length;
    }
    if (options.curveName == undefined) {
        options.curveName = 'secp256k1';
    }
    if (options.symmetricCypherName == undefined) {
        options.symmetricCypherName = 'aes-256-ecb';
        // use options.iv to determine is the cypher in ecb mode
        options.iv = null;
    }
    if (options.keyFormat == undefined) {
        options.keyFormat = 'uncompressed';
    }

    // S1 (optional shared information1)
    if (options.s1 == undefined) {
        options.s1 = Buffer.from([]);
    }
    // S2 (optional shared information2)
    if (options.s2 == undefined) {
        options.s2 = Buffer.from([]);
    }
    return options;
  }
}