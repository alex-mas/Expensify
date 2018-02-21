import { login, logout } from '../../actions/auth';


test('should generate login action objects', () => {
    const uid = 'test';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});


test('should generate a logout action objcet', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});