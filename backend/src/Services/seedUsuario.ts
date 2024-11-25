import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { TipoUsuario } from "../Types/TipoUsuario";

async function seedUsuarios() {
  const usuarioRepository = AppDataSource.getRepository(Usuario);

  const usuarioExistente = await usuarioRepository.findOne({
    where: { email: "admin@example.com" },
  });

  if (!usuarioExistente) {
    const hashedPassword = await bcrypt.hash("senha", 10); // Hash da senha

    const usuario = usuarioRepository.create({
      nome_completo: "Admin",
      data_nascimento: new Date("1990-01-01"),
      senha: hashedPassword,
      email: "admin@example.com",
      cpf: "12345678900",
      cep: "12345678",
      ativo: true,
      tipo: TipoUsuario.adm,
    });

    await usuarioRepository.save(usuario);
    console.log("Usuário admin criado com sucesso!");
  } else {
    console.log("Usuário admin já existe.");
  }
}

export default seedUsuarios;
