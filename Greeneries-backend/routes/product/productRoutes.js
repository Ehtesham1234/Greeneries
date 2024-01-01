const express = require("express");
const router = express.Router();
const productController = require("../../controllers/Product/productController");
const { upload } = require("../../utils/fileUploads");
const verifyToken = require("../../middleware/validateToken");
const verifyAdmin = verifyToken("admin");

router.post(
  "/",
  verifyAdmin,
  upload.single("image"),
  productController.createProduct
);
router.patch(
  "/:id",
  verifyAdmin,
  upload.single("image"),
  productController.updateProduct
);
router.get("/", verifyAdmin, productController.getProducts);
router.get("/:id", verifyAdmin, productController.getProduct);
router.delete("/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;
