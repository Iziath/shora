/**
 * Configuration des rappels de sécurité avec images
 * Les images peuvent être stockées localement ou sur un service externe (Cloudinary, S3, etc.)
 */

const REMINDERS = [
    {
        message: '⚠️ Avant de soulever, vérifie que le sol n\'est pas glissant.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Chantier sécurisé
        category: 'lifting'
    },
    {
        message: '🦺 N\'oublie pas ton casque ! C\'est ton meilleur ami sur le chantier.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Casque de sécurité
        category: 'epi'
    },
    {
        message: '👷 Porte toujours tes gants de protection lors de la manipulation d\'outils.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Gants de protection
        category: 'epi'
    },
    {
        message: '👀 Vérifie ton environnement avant de commencer le travail.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Inspection chantier
        category: 'inspection'
    },
    {
        message: '🔌 Évite les fils électriques dénudés et signale-les immédiatement.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Danger électrique
        category: 'danger'
    },
    {
        message: '🚧 Respecte toujours les zones de sécurité délimitées.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Zone de sécurité
        category: 'zones'
    },
    {
        message: '👟 Porte des chaussures de sécurité adaptées à ton chantier.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Chaussures de sécurité
        category: 'epi'
    },
    {
        message: '🌡️ Hydrate-toi régulièrement, surtout par temps chaud.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Hydratation
        category: 'sante'
    },
    {
        message: '📱 En cas d\'urgence, compose le 19 (pompiers) ou le 15 (SAMU).',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Numéros d'urgence
        category: 'urgence'
    },
    {
        message: '🛡️ Les EPI ne sont pas optionnels, ils sont obligatoires !',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // EPI complets
        category: 'epi'
    }
];

module.exports = {
    REMINDERS,
    getRandomReminder: () => REMINDERS[Math.floor(Math.random() * REMINDERS.length)],
    getReminderByCategory: (category) => REMINDERS.filter(r => r.category === category)
};

