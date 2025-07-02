"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Calendar, Clock, Edit, Trash2, Loader2, CalendarIcon, Users, MapPin } from "lucide-react"
import Image from "next/image"
import { api, type Event } from "@/lib/api"

export function EventsModule() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxAttendees: 0,
    budget: 0,
    requiresRegistration: false,
    sendReminders: true,
    livestream: false,
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const eventsData = await api.getEvents()
      setEvents(eventsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const eventData = {
        ...newEvent,
        currentAttendees: 0,
        spent: 0,
        status: "upcoming" as const,
        createdBy: "admin",
      }

      const createdEvent = await api.createEvent(eventData)
      setEvents([...events, createdEvent])
      setNewEvent({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        maxAttendees: 0,
        budget: 0,
        requiresRegistration: false,
        sendReminders: true,
        livestream: false,
      })
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Event created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    setLoading(true)
    try {
      await api.deleteEvent(eventId)
      setEvents(events.filter((e) => e.id !== eventId))
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || event.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-orange-900">Event Management</h2>
          <p className="text-orange-700">Organize divine celebrations and spiritual gatherings</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <div className="flex items-center space-x-2 flex-1 lg:flex-initial">
            <Search className="w-4 h-4 text-orange-600" />
            <Input
              placeholder="Search events..."
              className="w-full lg:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48 border-orange-300 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
              <SelectItem value="class">Spiritual Class</SelectItem>
              <SelectItem value="kirtan">Kirtan</SelectItem>
              <SelectItem value="ceremony">Ceremony</SelectItem>
              <SelectItem value="community">Community Service</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Plan your next spiritual gathering</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventName" className="text-orange-800 font-medium">
                        Event Name *
                      </Label>
                      <Input
                        id="eventName"
                        placeholder="e.g., Janmashtami Celebration"
                        className="border-orange-200"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="text-orange-800 font-medium">
                          Date *
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          className="border-orange-200"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventTime" className="text-orange-800 font-medium">
                          Time *
                        </Label>
                        <Input
                          id="eventTime"
                          type="time"
                          className="border-orange-200"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventLocation" className="text-orange-800 font-medium">
                        Location
                      </Label>
                      <Input
                        id="eventLocation"
                        placeholder="Main Temple Hall"
                        className="border-orange-200"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventCategory" className="text-orange-800 font-medium">
                        Category
                      </Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                      >
                        <SelectTrigger className="border-orange-200">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="class">Spiritual Class</SelectItem>
                          <SelectItem value="kirtan">Kirtan</SelectItem>
                          <SelectItem value="ceremony">Ceremony</SelectItem>
                          <SelectItem value="community">Community Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxAttendees" className="text-orange-800 font-medium">
                          Max Attendees
                        </Label>
                        <Input
                          id="maxAttendees"
                          type="number"
                          placeholder="500"
                          className="border-orange-200"
                          value={newEvent.maxAttendees || ""}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, maxAttendees: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventBudget" className="text-orange-800 font-medium">
                          Budget ($)
                        </Label>
                        <Input
                          id="eventBudget"
                          type="number"
                          placeholder="5000"
                          className="border-orange-200"
                          value={newEvent.budget || ""}
                          onChange={(e) => setNewEvent({ ...newEvent, budget: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDescription" className="text-orange-800 font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Describe the event, its significance, and what attendees can expect..."
                    className="border-orange-200 min-h-[100px]"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireRegistration"
                      checked={newEvent.requiresRegistration}
                      onCheckedChange={(checked) => setNewEvent({ ...newEvent, requiresRegistration: checked })}
                    />
                    <Label htmlFor="requireRegistration" className="text-orange-800">
                      Require Registration
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendReminders"
                      checked={newEvent.sendReminders}
                      onCheckedChange={(checked) => setNewEvent({ ...newEvent, sendReminders: checked })}
                    />
                    <Label htmlFor="sendReminders" className="text-orange-800">
                      Send Reminders
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="livestream"
                      checked={newEvent.livestream}
                      onCheckedChange={(checked) => setNewEvent({ ...newEvent, livestream: checked })}
                    />
                    <Label htmlFor="livestream" className="text-orange-800">
                      Enable Livestream
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button
                    onClick={handleCreateEvent}
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                    Create Event
                  </Button>
                  <Button variant="outline" className="border-orange-300 bg-transparent flex-1">
                    Save as Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
          >
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              {event.image ? (
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-orange-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4">
                <Badge
                  variant={event.status === "upcoming" ? "default" : "secondary"}
                  className={event.status === "upcoming" ? "bg-orange-500 text-white" : "bg-green-500 text-white"}
                >
                  {event.status}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center text-sm mb-1 font-medium">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
              </div>
            </div>

            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-orange-900 font-bold line-clamp-2">{event.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-orange-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {event.currentAttendees}/{event.maxAttendees}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
                <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
                  {event.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-orange-700 mb-4 line-clamp-3 leading-relaxed">{event.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-700">Budget Progress</span>
                  <span className="font-medium text-orange-900">
                    ${event.spent}/${event.budget}
                  </span>
                </div>
                <Progress value={(event.spent / event.budget) * 100} className="h-2" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-700">Registration</span>
                  <Badge variant={event.requiresRegistration ? "default" : "secondary"}>
                    {event.requiresRegistration ? "Required" : "Open"}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  disabled={loading}
                  className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-900 mb-2">No Events Found</h3>
            <p className="text-orange-600 mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first event to get started"}
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
