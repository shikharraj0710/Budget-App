import { Button, Stack } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import UnCategorizedBudgetCard from "./components/UnCategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId)
  }

  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300 px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (<BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
            />)
          })}
         <UnCategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
         <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId}/>
      {console.log(viewExpensesModalBudgetId)}
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()}/>
      
    </>
  )
}

export default App;
