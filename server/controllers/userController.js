const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/usersModel");

/**
 * @desc Register a user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400);
			throw new Error("Please enter all fields");
		}
		// check if user exists
		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400);
			throw new Error("User already exists");
		}

		// hash the password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create a new user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 * @desc Authenticate a user
 * @route POST /api/login
 * @access Public
 */
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// check for user email
		const user = await User.findOne({ email });

		// check for user password
		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Invalid credentials");
		}
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 * @desc Get user date
 * @route GET /api/users/me
 * @access Private
 */
const getMe = async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		res.json({ message: error.message });
	}
};

// generate a token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = { registerUser, loginUser, getMe };
