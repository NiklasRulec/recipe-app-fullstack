import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";

export const userRouter = Router();
const multerMiddleware = multer();
const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/resetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("reset password for ", email);
    await createResetToken(email);
    return res.sendStatus(200);
  } catch (e) {
    if (e?.message === "No User with this email") {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(500).send({ error: "Unknown Error occurred" });
  }
});

userRouter.post("/resetPassword-confirm", async (req, res) => {
  const { id, token, password } = req.body;
  const isValidResetProcess = validateResetToken(id, token);
  try {
    if (!isValidResetProcess) {
      throw new Error("NonValidResetProcess");
    }
    const user = await User.findById(id);
    user.setPassword(password);
    await user.save();
    return res.send({
      data: { message: "New password confirmed" },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  newUser.setPassword(req.body.password);
  try {
    await newUser.save();
    return res.send({
      data: {
        message: "New user created",
        user: { name, email },
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      return res.status(400).send({ error: e });
    }
    if (e.name === "MongoServerError" && e.code === 11000) {
      console.log("Account exists already");
      return res.status(400).send({
        error: { message: "Username and Password combination not valid" },
      });
    }
    return res.status(500).send({ error: { message: "Unknown Server error" } });
  }
});

userRouter.post("/login", multerMiddleware.none(), async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  const user = await User.findOne({ email }).select("+hash").select("+salt");
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    const token = generateAccessToken({ email });
    console.log(token);
    res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });
    res.send({ message: "Success", data: user });
  } else {
    res.status(404).send({
      message: "Failed to login",
      error: {
        message: "Password and E-Mail combination is wrong.",
      },
    });
  }
});

userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

userRouter.put("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    const existingIndex = user.favorites.indexOf(req.body.idMeal);
    if (existingIndex > -1) {
      user.favorites.splice(existingIndex, 1);
    } else {
      user.favorites.push(req.body.idMeal);
    }
    await user.save();
    res.status(200).send({ message: "Favoriten erfolgreich aktualisiert" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("Es gab einen Fehler beim Aktualisieren der Favoriten");
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("OK");
});

userRouter.get("/secure", authenticateToken, async (req, res) => {
  console.log(req.userEmail);
  res.send({ email: req.userEmail });
});
