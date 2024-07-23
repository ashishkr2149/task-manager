import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

// Encryption and Decryption keys
const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = randomBytes(16);

const encrypt = (text) => {
  const cipher = createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (hash) => {
  const parts = hash.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = createDecipheriv(algorithm, secretKey, iv);

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
};

// // Example usage
// const url = "url";

// const encryptedUrl = encrypt(url);
// console.log("Encrypted URL:", encryptedUrl);

// const decryptedUrl = decrypt(encryptedUrl);
// console.log("Decrypted URL:", decryptedUrl);

//To generate SESSION_SECRET
// console.log(randomBytes(64).toString('hex'));
