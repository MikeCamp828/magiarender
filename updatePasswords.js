const bcrypt = require('bcrypt');
const { User } = require('./models'); // Ajusta el path según tu estructura

async function hashExistingPasswords() {
  try {
    const users = await User.findAll(); // Obtiene todos los usuarios

    for (const user of users) {
      if (!user.password.startsWith('$2b$')) { // Verifica si la contraseña ya está hasheada
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hashea la contraseña
        user.password = hashedPassword;
        await user.save(); // Guarda el usuario con la contraseña actualizada
        console.log(`Contraseña hasheada para el usuario ${user.email}`);
      }
    }

    console.log('Todas las contraseñas han sido actualizadas.');
  } catch (error) {
    console.error('Error actualizando contraseñas:', error);
  }
}

hashExistingPasswords();
