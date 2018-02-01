import moment from 'moment';
import {
    setStartDate, 
    setEndDate,
    setTextFilter,
    sortByAmount,
    sortByDate
} from '../actions/filters';


describe('Filter related actions',()=>{
    describe('setStartDate tests: ',()=>{
        it('should properly generate start date action object',()=>{
            const action = setStartDate(moment(0));
            expect(action).toEqual({
                type: 'SET_START_DATE',
                date: moment(0)
            });
        });
    });
    describe('setEndDate tests: ',()=>{
        it('should properly generate end date action object',()=>{
            const action = setEndDate(moment(0));
            expect(action).toEqual({
                type: 'SET_END_DATE',
                date: moment(0)
            });
        });
    });
    describe('setTextFilter tests: ',()=>{
        it('should properly generate a text filter action object',()=>{
            const action = setTextFilter('whatever');
            expect(action).toEqual({
                type: 'SET_TEXT_FILTER',
                text:'whatever'
            });
            expect(setTextFilter()).toEqual({
                type: 'SET_TEXT_FILTER',
                text:''
            });
        });
    });
    describe('sortByDate tests: ',()=>{
        it('should properly generate a correct action object',()=>{ 
            expect(sortByDate()).toEqual({
                type: 'SORT_BY_DATE'
            });

        });
    });
    describe('sortByAmount tests: ',()=>{
        it('should properly generate a correct action object',()=>{ 
            expect(sortByAmount()).toEqual({
                type: 'SORT_BY_AMOUNT'
            });

        });
    });
});