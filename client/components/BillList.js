import React, { Component } from 'react'

import { seedData } from '../models/fetchSeedData'

export default class BillList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    this.setState({ data: seedData })
  }

  billDue(billDueDate) {
    const currentDate = new Date()
    const billDue = billDueDate.getTime()

    if(billDue === currentDate.getTime()) {
      return "DUE NOW"
    } else if (billDue > currentDate.getTime()) {
      return "Due later"
    } else if (billDue < currentDate.getTime()) {
      return "Past due"
    }
  }

  render() {
    return (
      <div>
        {this.state.data.billList.map(bill => 
          <ul key={bill.amount}>
            <li>Company   : {bill.company}</li>
            <li>Amount    : {bill.amount}</li>
            <li>Per Person: {bill.amountPerPerson}</li>
            <li>Due Date  : {bill.dueDate.toString().substring(0,15)}</li>
            <li>Status    : {this.billDue(bill.dueDate)}</li>
          </ul>
        )}
      </div>
    )
  }
}