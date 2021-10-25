const app = require("express");
const router = app.Router();
const { authenticateUser } = require("../controllers/userController");

const { addPrescription } = require("../controllers/PrescriptionController");

router.post("/addPrescription", authenticateUser, addPrescription);

module.exports = router;
