import EncryptedStorage from 'react-native-encrypted-storage';

export const saveTokens = async (accessToken, refreshToken) => {
  try {
    await EncryptedStorage.setItem(
      'auth_tokens',
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
    );
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

export const getTokens = async () => {
  try {
    const tokens = await EncryptedStorage.getItem('auth_tokens');
    if (tokens) {
      return JSON.parse(tokens);
    } else {
      console.log('No tokens found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await EncryptedStorage.removeItem('auth_tokens');
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};
