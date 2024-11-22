const users = []; // Penyimpanan sementara

const register = (request, h) => {
  const { username, email, password, confirmPassword, namaLengkap } =
    request.payload;

  if (password !== confirmPassword) {
    return h.response({ message: "Password tidak cocok!" }).code(400);
  }

  users.push({ username, email, password, namaLengkap });
  return h.response({ message: "Registrasi berhasil!" }).code(201);
};

const login = (request, h) => {
  const { username, email, password } = request.payload;

  const user = users.find(
    (u) =>
      (u.username === username || u.email === email) && u.password === password
  );

  if (!user) {
    return h.response({ message: "Login gagal!" }).code(401);
  }

  return h
    .response({ message: `Selamat datang, ${user.namaLengkap}!` })
    .code(200);
};

module.exports = { register, login };
