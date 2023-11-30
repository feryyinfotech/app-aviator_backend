const express = require("express");
const router = express.Router();

const { createTodo } = require("../controller/createTodo");
const { getTodo } = require("../controller/getTodo");
const { getTodoById } = require("../controller/getTodoById");
const { deleteTodo } = require("../controller/deleteTodo");
const { updateById } = require("../controller/updateById");
const { createDummyTitle } = require("../controller/dummyTitle");
const { createPost } = require("../controller/Blogs/createPost");
const { createLikes } = require("../controller/Blogs/createLikes");
const { createComments } = require("../controller/Blogs/createComment");
const { createCustomer } = require("../controller/Customer/createCustomer");
const { changeStaus } = require("../controller/Customer/changeStatus");
const { createShopKeeper, login_Api } = require("../controller/Shaloon/createShopKeeper");
const { signupCustomer, login_Customer, getnearByShops } = require("../controller/Shaloon/getShopByCustomer");
const { addTestData } = require("../controller/Test/addData");
const { getTestData } = require("../controller/Test/getData");

router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.get("/getbyid/:id", getTodoById);
router.delete("/getbyidanddelete/:id", deleteTodo);
router.put("/findByIdAndUpdate/:id", updateById);
router.post("/createtitleindummy", createDummyTitle);

//blogs routes
router.post("/blog/post", createPost);
router.post("/blog/like", createLikes);
router.post("/blog/comment", createComments);

//create Customer
router.post("/customer", createCustomer);
router.put("/customer/status", changeStaus);

// Shaloon
router.post("/create-shop-keeper", createShopKeeper);
router.post("/login/shop-keeper",login_Api);
router.post('/login/api',login_Customer)
//customer
router.post("/create/customer/shaloon",signupCustomer);
router.post("/customer/login",login_Customer)
router.post("/get/nearby_shop",getnearByShops)
//cts


// test
router.post("/test",addTestData)
router.get("/get-data",getTestData)

module.exports = router;
