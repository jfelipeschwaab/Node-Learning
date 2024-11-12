const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: 'sindsei-emails-firebase-adminsdk-ikrew-56311b99a8.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  console.log('Access Token:', accessToken.token);
}

getAccessToken();
