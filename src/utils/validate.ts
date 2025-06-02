const mmPhoneRegex = /^(09|\+?959)[0-9]{7,9}$/;

const validatePhone = (v: string) => {
  return mmPhoneRegex.test(v);
};

const validateEmail = (v: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

const validatePassword = (v: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(v);
};

export { mmPhoneRegex, validatePhone, validateEmail, validatePassword };
