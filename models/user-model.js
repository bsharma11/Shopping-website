const res = require("express/lib/response");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postal_code: postal,
      city: city,
    };
  }

  static findbyId(userId) {
    const uid = new mongodb.ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }
  getuserwithsameemail() {
    return db.getDb().collection("users").findOne({ email: this.email });
    // we don't use async-await in the above func because beacause we dont perform more than one task in this function
  }

  async userexists() {
    const existunguser = await this.getuserwithsameemail();
    if (existunguser) {
      return true;
    }
    return false;
  }

  matchpass(hashedpass) {
    return bcrypt.compare(this.password, hashedpass);
  }

  async signup() {
    const hashedpass = await bcrypt.hash(this.password, 12);
    db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedpass,
      name: this.name,
      address: this.address,
    });
  }
}
module.exports = User;
