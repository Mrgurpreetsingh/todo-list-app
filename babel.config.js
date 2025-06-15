module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        ['babel-plugin-dotenv-import', {
            moduleName: '@env',
            path: '.env',
            safe: false,
            allowUndefined: true,
        }],
        'react-native-reanimated/plugin', // Ajouté pour Reanimated
    ],
};
