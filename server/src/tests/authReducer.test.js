import authReducer from '../reducers/auth';


test('should set uid for login', ()=>{
    const action = {
        type: 'LOGIN',
        uid: 'whatever_test'
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});


test('should clear uid for logout',()=>{
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid:'any value'}, action);
    expect(state.uid).toBe(undefined);
    expect(state).toEqual({});
});