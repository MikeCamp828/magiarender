const { Calificacion, Pueblo, User } = require('../models');

// Crear una nueva calificación
exports.crearCalificacion = async (req, res) => {
    try {
        const { user_id, pueblo_id, rating, comentario } = req.body;

        const pueblo = await Pueblo.findByPk(pueblo_id);
        if (!pueblo) {
            return res.status(404).json({ error: 'Pueblo no encontrado' });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const nuevaCalificacion = await Calificacion.create({
            user_id,
            pueblo_id,
            rating,
            comentario,
        });

        res.status(201).json({ message: 'Calificación creada con éxito', calificacion: nuevaCalificacion });
    } catch (error) {
        console.error('Error al crear la calificación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las calificaciones para un pueblo
exports.obtenerCalificacionesPorPueblo = async (req, res) => {
    try {
        const { pueblo_id } = req.params;

        const pueblo = await Pueblo.findByPk(pueblo_id);
        if (!pueblo) {
            return res.status(404).json({ error: 'Pueblo no encontrado' });
        }

        const calificaciones = await Calificacion.findAll({
            where: { pueblo_id },
            include: [{ model: User, attributes: ['nombre'] }],
        });

        res.status(200).json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
