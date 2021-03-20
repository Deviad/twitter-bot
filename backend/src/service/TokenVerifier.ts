import {OAuth2Client} from 'google-auth-library';
import {injectable} from 'inversify';
import config from '../../app.properties.json';

@injectable()
export class TokenVerifier {

    public client: OAuth2Client;

    constructor() {
        this.init();
    }

    public init() {
        // @ts-ignore
        this.client = new OAuth2Client(config.googleSSO.clientId);

    }

    public async isVerified(token: string): Promise<void> {
        const ticket = await this.client.verifyIdToken({
        // @ts-ignore
            audience: config.googleSSO.clientId,  // specify the CLIENT_ID of the app that accesses the backend
            idToken: token,
        });
        const payload = ticket.getPayload();
        const userid = payload.sub;
        // @ts-ignore
        if (userid === config.userEmail) {
            throw new Error('user is not authorized to perform this action');
        }
    }

}
