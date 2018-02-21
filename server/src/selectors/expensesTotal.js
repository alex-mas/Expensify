
/**
 * @param {Object[]} expenses - takes an array of expenses and returns the sum of its values
 */

export default (expenses) =>{
    //edge cases
    if(!expenses || typeof expenses !== 'object' || expenses.length === 0) return 0;
    if(!expenses.length) return expenses.amount;
    if(expenses.length === 1) return expenses[0].amount;
    //regular addition
    let totalAmount = 0;
    for(let i = 0; i < expenses.length; i++){
        totalAmount += expenses[i].amount;
    }
    return totalAmount;
}


