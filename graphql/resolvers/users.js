const User = require('../../model/User');
const { SECRET_KEY } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');


module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async register(parent, args, context, info) {
            const { registerInput } = args;
            const { username, email, password: oldPassword, confirmPassword } = registerInput;
            const { errors, valid } = validateRegisterInput(username, email, oldPassword, confirmPassword)
            console.log(errors)
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }
            //判断用户是否已经存在
            //
            const user = await User.findOne({ username });
            console.log(user);
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "用户已经存在"
                    }
                })
            }



            password = await bcrypt.hash(oldPassword, 12);
            //假设是新用户
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = jwt.sign(
                {
                    id: res.id,
                    email: res.email,
                    username: res.username
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );
            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(parent, args, context, info) {
            const { loginInput } = args;
            const { username, password } = loginInput;
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "用户不存在";
                throw new UserInputError("用户不存在", { errors });
            }
             
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = "密码错误";
                throw new UserInputError("密码错误", { errors });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );
            console.log(user,'zhdoadoa ')

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
};