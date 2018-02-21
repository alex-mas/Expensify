import moment from 'moment';


/**
 * 
 * @description This function is the responsible for properly sorting and filtering the expenses upon user request
 * 
 * @param {Object[]} expenses - array of expenses
 * 
 * @param {Object} -  Object with the filter information
 * 
 */
export default  (expenses, { text, sortBy, startDate, endDate }) => {
    if(!expenses) return;
    //return filtered array cropping out expenses that don't match the desired text or date interval
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment,'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    //take the filtered expenses and sort them by the requested method
    }).sort((a,b)=>{
        switch(sortBy){
            case 'date':
                return a.createdAt < b.createdAt ? 1 : -1;
            case 'amount':
                return a.amount < b.amount ? 1 : -1;
            default:
                return -1;
        }
    });
};