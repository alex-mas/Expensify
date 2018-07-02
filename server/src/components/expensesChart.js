import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import Chart from 'chart.js';
import moment from 'moment';





export class ExpensesChart extends React.Component {
    state = {
        chart: undefined,
        chartElement: null
    };
    componentDidMount() {
        this.renderChart();
    }
    componentDidUpdate() {
        this.renderChart();
    }
    renderChart() {
        if (this.state.chartElement === null) return;
        if (this.props.expenses.length < 1) {
            this.state.chart = undefined;
            return;
        }
        this.state.chart = new Chart(this.state.chartElement.getContext('2d'), {
            type: 'bar',
            data: {
                labels: this.props.expenses.map((expense) => {
                    return expense.description + ' (' + moment(expense.createdAt).format("dd/M - YY")  + ')';
                }),
                datasets: [{
                    label: 'Expenses',
                    data: this.props.expenses.map((expense) => {
                        return expense.amount;
                    }),
                    backgroundColor: this.props.expenses.map((expense) => {
                        return 'rgb(21, 134, 199)'
                    })
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                events: [],
                title: {
                    display: true,
                    text: 'Expenses',
                    fontSize: 20
                },
                responsive: true
            }
        });

    }
    render() {
        return (
            <div className="content-container">
                <div className="chartWrapper">
                    {this.props.expenses.length > 0 ?
                        <canvas
                            ref={(elmnt) => {
                                this.state.chartElement = elmnt;

                            }}
                        ></canvas>
                        : undefined
                    }
                </div>
            </div>
        );
    }

}



const bootstraper = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        startDate: state.filters.startDate,
        endDate: state.filters.endDate
    };
}
export default connect(bootstraper)(ExpensesChart);

