const User=require('../../model/User');
const { SECRET_KEY } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
    Mutation:{
       async register(parent,args,context,info){
            const {registerInput}=args;
            const { username, email, password:oldPassword, confirmPassword } =registerInput;
            console.log(registerInput,'=========')
            //判断用户是否已经存在
            //
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
                        id:res._id,
                        token
                    }
        }
    }
  };