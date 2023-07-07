const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; //  "+" is added before to make it a number instaed of a string
    this.description = productData.description;
    this.img = productData.img; // the name of the image file
    this.uploadimage();
    // when a new product is created, before saving it into a db, it wont have an id therefore
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }
  static async findbyId(productid) {
    // we might even get the wrong productid so we do the following
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productid);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with the given id");
      error.code = 404; //  this will help us know which template to render.
      throw error;
    }
    return  new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  static async findMultiple(ids) {
    const productIds = ids.map(function(id) {
      return new mongodb.ObjectId(id);
    })
    
    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  uploadimage() {
    this.imgpath = `product-data/images/${this.img}`;
    this.imgurl = `/products/assets/images/${this.img}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      img: this.img,
    };

    if (this.id) {
      const prodId = new mongodb.ObjectId(this.id);

      if (!this.img) {
        // if the user doest wnat to update the img, he might not upload a new one!!
        delete productData.img;
      }

      db.getDb().collection("products").updateOne(
        { _id: prodId },
        {
          $set: productData,
        }
      );
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }
  replaceimg(newimage) {
    this.img = newimage;
    this.uploadimage();
  }
  remove(){
    const prodId = new mongodb.ObjectId(this.id)
    return db.getDb().collection('products').deleteOne({_id: prodId})
  }
}
module.exports = Product;
