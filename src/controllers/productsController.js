const {json} = require("express");
const fs = require("fs");
const {get} = require("http");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))
    return products
}

const controller = {
    index: (req, res) => {
        res.render("index", { products: getProducts() })
    },
    productDetail: (req, res) => {
        const products = getProducts()
        const product = products.find( (product) => product.id == req.params.id)
        res.render("productDetail", { product })
    },
    create: (req, res) => {
        res.render("productCreate");
    },
    store: (req, res) => {
        const products = getProducts()
        const productToCreate = {
          id: products[products.length - 1].id + 1,
          image: "default-image.png",
          ...req.body,
        };
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect("/index");
    },
    edit: (req, res) => {
        const products = getProducts()
        const product = products.find((product) => product.id == req.params.id);
        res.render("productEdit", { productToEdit: product});
    },
    destroy: (req, res) => {
        const products = getProducts();
        const indexProduct = products.findIndex((product) => product.id == req.params.id)
        products.splice(indexProduct, 1)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        res.redirect("/index");
    }
}

module.exports = controller