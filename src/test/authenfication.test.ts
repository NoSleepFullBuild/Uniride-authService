import { Authentification } from "../middleware/authentification";

describe('Authentification', () => {
    let auth: Authentification;

    beforeAll(() => {
        auth = new Authentification();
    });

    describe('checkoutEmail', () => {
        it('should return true for valid email', () => {
            expect(auth.checkoutEmail('test@example.com')).toBeTruthy();
        });

        it('should return false for invalid email', () => {
            expect(auth.checkoutEmail('test@example')).toBeFalsy();
        });
    });

    describe('checkoutUsername', () => {
        it('should return true for valid username', () => {
            expect(auth.checkoutUsername('user_123')).toBeTruthy();
        });

        it('should return false for invalid username', () => {
            expect(auth.checkoutUsername('us')).toBeFalsy();
        });
    });

    describe('checkoutPassword', () => {
        it('should return true for valid password', () => {
            expect(auth.checkoutPassword('password1')).toBeTruthy();
        });

        it('should return false for invalid password', () => {
            expect(auth.checkoutPassword('pass')).toBeFalsy(); 
        });
    });
});
