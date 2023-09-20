const bcrypt = require("bcrypt");

// ...

app.post("/register", async (req, res) => {
  try {
    const { name, mail, pass } = req.body;

    // Check if the username or email already exists (if needed)

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      name: name,
      mail: mail,
      pass: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
