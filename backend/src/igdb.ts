let accessToken: string | null = null;
let tokenExpiration = 0;

export async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpiration) {
        return accessToken;
    }

    const response = await fetch(
        "https://id.twitch.tv/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID!,
                client_secret: process.env.TWITCH_CLIENT_SECRET!,
                grant_type: "client_credentials"
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to obtain Twitch access token");
    }

    const data = await response.json();

    accessToken = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000;

    return accessToken;
}