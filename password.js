const crypto = require("crypto");

class Password {

    // -----------------------------------------------

    //------------------------------------------------

    constructor(password) {
        this.password = password;
        this.isEncrypted = false;
        this.algorithm = "aes-256-cbc";
        this.initVector = crypto.randomBytes(16);
        this.Securitykey = crypto.randomBytes(32);
        this.cipher = crypto.createCipheriv(this.algorithm, this.Securitykey, this.initVector);
        this.deCipher = crypto.createDecipheriv(this.algorithm, this.Securitykey, this.initVector);
    }

    encrypt() {
        this.password = this.cipher.update(this.password, "utf-8", "hex");
        this.password += this.cipher.final("hex");
        this.isEncrypted = true;
        return this.password;
    }

    decrypt() {
        this.password = this.deCipher.update(this.password, "hex", "utf-8");
        this.password += this.deCipher.final("utf-8");
        this.isEncrypted = false;
        return this.password;
    }

    isValid() {
        let encryptAgain = false;
        if (this.isEncrypted) {
            encryptAgain = true;
            this.decrypt();
        }

        if (this.password.match(/^[A-Za-z]\w{7,20}$/)) {
            if (encryptAgain)
                this.encrypt();
            return true;
        } else return false;
    }

}

module.exports = Password;