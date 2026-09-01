const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) =>  {
    try {

        const { name, email, password, phone, gender, hasAdminAcess, role } = req.body;

        if (!name || !email || !password || !phone || !gender) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        //Encypt the password before saving to the database
        const salt = await bcrypt.genSalt(2);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            gender: req.body.gender,
            hasAdminAcess: req.body.hasAdminAcess || false, // Default to false if not provided
            role: req.body.role || 'user', // Default role is 'user' if not provided
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};  

//Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        //Check if the user exists in the database
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Generate a token for the user
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};