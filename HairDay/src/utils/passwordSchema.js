import passwordValidator from "password-validator";

const schema = new passwordValidator();

schema
  .is().min(6)
  .is().max(50)
  .has().digits()
  .has().uppercase()
  .has().lowercase()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

export default schema;
