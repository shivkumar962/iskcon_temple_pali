"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  CreditCard,
  Banknote,
  Building,
  Receipt,
  Download,
  Filter,
  Search,
} from "lucide-react"
import { api, type Donation } from "@/lib/api"

export function DonationsModule() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMethod, setFilterMethod] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [newDonation, setNewDonation] = useState({
    donorName: "",
    amount: 0,
    purpose: "",
    method: "cash" as const,
    recurring: false,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [donationsData, analyticsData] = await Promise.all([api.getDonations(), api.getAnalytics()])
      setDonations(donationsData)
      setAnalytics(analyticsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load donations data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDonation = async () => {
    if (!newDonation.donorName || !newDonation.amount || !newDonation.purpose) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const donationData = {
        ...newDonation,
        donorId: "manual-entry",
        date: new Date().toISOString().split("T")[0],
        status: "completed" as const,
        receiptSent: false,
      }

      const createdDonation = await api.createDonation(donationData)
      setDonations([createdDonation, ...donations])
      setNewDonation({
        donorName: "",
        amount: 0,
        purpose: "",
        method: "cash",
        recurring: false,
      })
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Donation recorded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record donation",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = filterMethod === "all" || donation.method === filterMethod
    return matchesSearch && matchesMethod
  })

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "online":
        return <CreditCard className="w-4 h-4" />
      case "bank_transfer":
        return <Building className="w-4 h-4" />
      case "check":
        return <Receipt className="w-4 h-4" />
      default:
        return <Banknote className="w-4 h-4" />
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "online":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "bank_transfer":
        return "bg-green-100 text-green-800 border-green-200"
      case "check":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-orange-100 text-orange-800 border-orange-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-orange-900">Donation Management</h2>
          <p className="text-orange-700">Track and manage temple donations and contributions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button variant="outline" className="border-orange-300 bg-transparent w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Record Donation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record New Donation</DialogTitle>
                <DialogDescription>Add a new donation to the temple records</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donorName">Donor Name *</Label>
                  <Input
                    id="donorName"
                    placeholder="Enter donor name"
                    value={newDonation.donorName}
                    onChange={(e) => setNewDonation({ ...newDonation, donorName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newDonation.amount || ""}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Select
                    value={newDonation.purpose}
                    onValueChange={(value) => setNewDonation({ ...newDonation, purpose: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Temple Maintenance">Temple Maintenance</SelectItem>
                      <SelectItem value="Food Distribution">Food Distribution</SelectItem>
                      <SelectItem value="Festival Celebration">Festival Celebration</SelectItem>
                      <SelectItem value="Educational Programs">Educational Programs</SelectItem>
                      <SelectItem value="General Donation">General Donation</SelectItem>
                      <SelectItem value="Emergency Fund">Emergency Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method</Label>
                  <Select
                    value={newDonation.method}
                    onValueChange={(value: any) => setNewDonation({ ...newDonation, method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreateDonation}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Record Donation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-orange-200 bg-gradient-to-br from-white to-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">This Month</p>
                <p className="text-2xl font-bold text-orange-900">
                  ${analytics?.monthlyDonations?.toLocaleString() || 0}
                </p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">This Year</p>
                <p className="text-2xl font-bold text-orange-900">
                  ${(analytics?.totalDonations || 0).toLocaleString()}
                </p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% from last year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Total Donors</p>
                <p className="text-2xl font-bold text-orange-900">{donations.length}</p>
                <p className="text-xs text-orange-600 mt-1">Active contributors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-white to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Avg Donation</p>
                <p className="text-2xl font-bold text-orange-900">
                  $
                  {donations.length > 0
                    ? Math.round(donations.reduce((sum, d) => sum + d.amount, 0) / donations.length)
                    : 0}
                </p>
                <p className="text-xs text-orange-600 mt-1">Per contribution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-orange-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 w-4 h-4" />
                <Input
                  placeholder="Search donations by donor name or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200"
                />
              </div>
            </div>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-full sm:w-48 border-orange-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      <Card className="border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-orange-900">Recent Donations</CardTitle>
          <CardDescription>Latest contributions from devotees ({filteredDonations.length} donations)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors space-y-4 lg:space-y-0"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-semibold text-orange-900 truncate">{donation.donorName}</h4>
                      <Badge variant="outline" className={`${getMethodColor(donation.method)} text-xs w-fit`}>
                        <span className="mr-1">{getMethodIcon(donation.method)}</span>
                        {donation.method.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">{donation.purpose}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-orange-500 mt-1">
                      <span>{donation.date}</span>
                      {donation.recurring && (
                        <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 text-xs w-fit">
                          Recurring
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-xs w-fit ${
                          donation.status === "completed"
                            ? "border-green-300 text-green-700 bg-green-50"
                            : "border-yellow-300 text-yellow-700 bg-yellow-50"
                        }`}
                      >
                        {donation.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">${donation.amount.toLocaleString()}</p>
                    <p className="text-xs text-orange-600">
                      {donation.receiptSent ? "Receipt sent" : "Receipt pending"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-orange-300 bg-transparent">
                    <Receipt className="w-3 h-3 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredDonations.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <DollarSign className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-900 mb-2">No Donations Found</h3>
            <p className="text-orange-600 mb-6">
              {searchTerm || filterMethod !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Record your first donation to get started"}
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Donation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
