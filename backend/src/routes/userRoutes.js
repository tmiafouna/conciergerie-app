const router = require("express").Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");

router.get("/", auth, roleGuard("admin"), getAllUsers);
router.delete("/:id", auth, roleGuard("admin"), deleteUser);
router.put("/:id/role", auth, roleGuard("admin"), updateUserRole);

module.exports = router;
