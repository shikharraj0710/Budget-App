import { Modal, Button, Stack } from 'react-bootstrap'
import { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext'
import { currencyFormatter } from '../utils'

export default function ViewExpensesModal({ budgetId, handleClose }) {

const { getBudgetExpenses, deleteBudget, deleteExpense, budgets } = useBudgets()
const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name : "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } : budgets.find(b => b.id === budgetId)
const expenses = getBudgetExpenses(budgetId)
console.log(expenses)

  return (
    <Modal show={budgetId != undefined} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>
                <Stack direction='horizontal' gap="2">
                    <div>Expenses - {budget?.name} </div>
                    {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                        <Button onClick={() => {
                            deleteBudget(budget);
                            handleClose();
                        }}
                        variant="outline-danger"
                        >
                        Delete
                        </Button>
                    )}
                </Stack>
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          { expenses.map(expense => { 
            return (
             <Stack direction="horizontal" gap="2" key={expense.id}>
               <div className="me-auto fs-4">{expense.description}</div>
               <div className="fs-5 text-muted">{currencyFormatter.format(expense.amount)}</div>
               <Button variant="outline-danger" size='sm' onClick={() => deleteExpense(expense)}>&times;</Button>
             </Stack>
             )
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
