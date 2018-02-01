import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';

const defaultFiltersState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};
const filterReducer = (state = defaultFiltersState, action) => {
    let newState;
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            newState = cloneDeep(state);
            newState.text = action.text;
            return newState;
        case 'SORT_BY_DATE':
            newState = cloneDeep(state);
            newState.sortBy = 'date';
            return newState;
        case 'SORT_BY_AMOUNT':
            newState = cloneDeep(state);
            newState.sortBy = 'amount';
            return newState;
        case 'SET_START_DATE':
            newState = cloneDeep(state);
            newState.startDate = action.date;
            return newState;
        case 'SET_END_DATE':
            newState = cloneDeep(state);
            newState.endDate = action.date;
            return newState;
        default:
            return state;
    }
}


export default filterReducer;