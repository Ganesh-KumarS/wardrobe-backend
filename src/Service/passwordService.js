import bcrypt from "bcrypt";

export const hashPassword = (userPassword)=>{
  let password = bcrypt.hashSync(userPassword, 8)
  return password
}

export const validatePassword = (userPassword,dbPassword)=>{
    let validatedPassword = bcrypt.compareSync(userPassword,dbPassword)
    return validatedPassword
}
