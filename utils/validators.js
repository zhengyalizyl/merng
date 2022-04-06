const validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
    if (username.trim()==="") {
        errors.username = "用户名不能为空"
    }
    if (email.trim()==="") {
        errors.email = "邮箱不能为空"
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(regEx)) {
            errors.email = "邮箱必须是有效邮箱";
        }
    }

    if (password.trim() === "") {
        errors.password = "密码不能为空";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "密码必须相等";
      }


      return {
          errors,
          valid:Object.keys(errors).length < 1
      }
}


const validateLoginInput = (username, password) => {
    const errors = {};
    console.log("username",username)
    if (username.trim()==="") {
        errors.username = "用户名不能为空"
    }

    if (password.trim() === "") {
        errors.password = "密码不能为空";
      }


      return {
          errors,
          valid:Object.keys(errors).length < 1
      }
}

module.exports={
    validateRegisterInput,
    validateLoginInput
}
