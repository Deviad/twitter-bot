import {controller, httpPost, request, response} from 'inversify-express-utils';
import {inject} from 'inversify';
import TAGS from '../constant/tags';
import * as express from 'express';
import {TokenVerifier} from '../service/TokenVerifier';

@controller('/auth')
export class AuthController {

    constructor(@inject(TAGS.TokenVerifier) private tokenVerifier: TokenVerifier) {
    }

    @httpPost('')
    public async authenticate(@request() req: express.Request, @response() res: express.Response) {

        try {
            const idToken = await this.tokenVerifier.getIdToken(req.body.authCode);
            return {idToken};
        } catch (err) {
            res.status(500).json({error: JSON.stringify(err)});
        }
    }

}
