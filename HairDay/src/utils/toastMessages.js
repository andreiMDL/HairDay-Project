export const failedSingup = (toast, message = 'Erro ao realizar cadastro, tente novamente!') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const failedLogin = (toast, message = 'Erro ao realizar login.') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const mandatoryFields = (toast, message = 'Preencha os campos obrigatórios.') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const emailNotExists = (toast, message = 'Não existe nenhuma conta com esse email') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const incorrectInfos = (toast, message = 'Email ou senha estão incorretos') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const emailAlreadyExists = (toast, message = 'Este email já está cadastrado.') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const serverError = (toast, message = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.') => {
  toast.error(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const successSignup = (toast, message = 'Cadastro realizado com sucesso!') => {
  toast.success(message, {
    position: 'top',
    duration: 3000,
    dismissible: true,
  });
};

export const successLogin = (toast, message = 'Logion realizado com sucesso!') => {
  toast.success(message, {
    position: 'top',
    duratiom: 3000,
    dismissible: true,
  });
};
