const app = require("express");
const router = app.Router();

const { viewNeedHelp } = require("../controllers/NeedHelpController");

router.get("/viewNeedHelp", viewNeedHelp);

module.exports = router;
