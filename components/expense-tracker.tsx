"use client"

import { useState } from "react"
import { Plus, Receipt, TrendingUp, DollarSign, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Expense {
  id: number
  amount: number
  category: string
  description: string
  date: string
  currency: string
}

interface ExpenseTrackerProps {
  expenses: Expense[]
  onAddExpense: (expense: Expense) => void
  tripData: any
}

export function ExpenseTracker({ expenses, onAddExpense, tripData }: ExpenseTrackerProps) {
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    currency: "USD",
  })

  const categories = [
    { value: "accommodation", label: "Accommodation", color: "bg-blue-500" },
    { value: "food", label: "Food & Dining", color: "bg-orange-500" },
    { value: "transport", label: "Transportation", color: "bg-green-500" },
    { value: "activities", label: "Activities", color: "bg-purple-500" },
    { value: "shopping", label: "Shopping", color: "bg-pink-500" },
    { value: "other", label: "Other", color: "bg-gray-500" },
  ]

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      onAddExpense({
        ...newExpense,
        amount: Number.parseFloat(newExpense.amount),
      })
      setNewExpense({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        currency: "USD",
      })
      setIsAddingExpense(false)
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const budget = tripData?.budget?.total || 2000
  const budgetUsed = (totalExpenses / budget) * 100

  const expensesByCategory = categories.map((category) => ({
    ...category,
    amount: expenses
      .filter((expense) => expense.category === category.value)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }))

  const getCategoryColor = (category: string) => {
    return categories.find((cat) => cat.value === category)?.color || "bg-gray-500"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Expense Tracker</h1>
            <p className="text-gray-400">Monitor your travel spending in real-time</p>
          </div>
          <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-white/20 text-white">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
                      className="bg-white/5 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select
                      value={newExpense.currency}
                      onValueChange={(value) => setNewExpense((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="What did you spend on?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-white/5 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
                    className="bg-white/5 border-white/20"
                  />
                </div>
                <Button onClick={handleAddExpense} className="w-full bg-gradient-to-r from-purple-500 to-cyan-500">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Budget Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-500/20 text-green-400">Budget</Badge>
              </div>
              <div className="text-2xl font-bold text-white">${budget.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Budget</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Receipt className="w-8 h-8 text-red-400" />
                <Badge className="bg-red-500/20 text-red-400">Spent</Badge>
              </div>
              <div className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Spent</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-500/20 text-blue-400">Remaining</Badge>
              </div>
              <div className="text-2xl font-bold text-white">${(budget - totalExpenses).toLocaleString()}</div>
              <div className="text-sm text-gray-400">Remaining</div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Tag className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-500/20 text-purple-400">Expenses</Badge>
              </div>
              <div className="text-2xl font-bold text-white">{expenses.length}</div>
              <div className="text-sm text-gray-400">Total Items</div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Budget Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Used: ${totalExpenses.toLocaleString()}</span>
                <span className="text-gray-400">{budgetUsed.toFixed(1)}% of budget</span>
              </div>
              <Progress value={budgetUsed} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>${budget.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {expensesByCategory.map((category) => (
                <div key={category.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="text-white">{category.label}</span>
                  </div>
                  <span className="text-white font-semibold">${category.amount.toLocaleString()}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenses
                .slice(-5)
                .reverse()
                .map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.category)}`}></div>
                      <div>
                        <div className="text-white font-medium">{expense.description}</div>
                        <div className="text-sm text-gray-400">{expense.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">${expense.amount}</div>
                      <div className="text-xs text-gray-400">{expense.currency}</div>
                    </div>
                  </div>
                ))}
              {expenses.length === 0 && (
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No expenses recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
