import {OAuth2Client, OAuth2ClientOptions} from 'google-auth-library';
import {injectable, unmanaged} from 'inversify';
import config from '../../app.properties.json';

class ExtendedOauth2Client extends OAuth2Client {

    constructor(@unmanaged() params: OAuth2ClientOptions) {
        super(params);
    }

    public refreshToken(refreshToken: string) {
        return super.refreshToken(refreshToken);
    }
}


@injectable()
export class TokenVerifier {

    public client: ExtendedOauth2Client;

    constructor() {
        this.init();
    }

    public init() {
        this.client = new ExtendedOauth2Client({
            clientId: config.googleSSO.clientId,
            clientSecret: config.googleSSO.clientSecret
        });
    }

    public async isVerified(token: string): Promise<void> {
        const ticket = await this.client.verifyIdToken({
            // @ts-ignore
            audience: config.googleSSO.clientId,  // specify the CLIENT_ID of the app that accesses the backend
            idToken: token,
        });
        const payload = ticket.getPayload();
        const email = payload.email;
        // @ts-ignore
        if (email !== config.userEmail) {
            throw new Error('user is not authorized to perform this action');
        }
    }

    public async getIdToken(authCode: string): Promise<string> {
        try {
            const resp = await this.client.getToken(authCode);
            return resp.tokens.id_token;
        } catch (error) {
            throw error;
        }
    }


}
