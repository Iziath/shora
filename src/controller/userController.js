const User = require ('../models/Users')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
}


