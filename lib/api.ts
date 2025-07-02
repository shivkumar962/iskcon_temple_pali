// Mock API functions for development and testing
export interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: "devotee" | "volunteer" | "priest" | "admin"
  spiritualName?: string
  joinDate: string
  avatar?: string
  isActive: boolean
  interests: string[]
  donations: number
  eventsAttended: number
}

export interface Event {
  id: string
  name: string
  description: string
  date: string
  time: string
  location: string
  category: string
  maxAttendees: number
  currentAttendees: number
  budget: number
  spent: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  image?: string
  requiresRegistration: boolean
  sendReminders: boolean
  livestream: boolean
  createdBy: string
  createdAt: string
}

export interface Donation {
  id: string
  donorId: string
  donorName: string
  amount: number
  purpose: string
  method: "cash" | "online" | "bank_transfer" | "check"
  date: string
  recurring: boolean
  status: "completed" | "pending" | "failed"
  receiptSent: boolean
}

export interface Program {
  id: string
  title: string
  description: string
  instructor: string
  schedule: string
  participants: number
  maxParticipants: number
  status: "active" | "inactive" | "planning"
  category: string
  startDate: string
  endDate?: string
}

// Mock data
let mockMembers: Member[] = [
  {
    id: "1",
    name: "Radha Devi",
    email: "radha@temple.org",
    phone: "+1-555-0101",
    role: "devotee",
    spiritualName: "Radha Devi Dasi",
    joinDate: "2023-01-15",
    avatar: "/images/devotee-2.jpg",
    isActive: true,
    interests: ["bhagavad-gita", "kirtan"],
    donations: 5000,
    eventsAttended: 25,
  },
  {
    id: "2",
    name: "Govinda Das",
    email: "govinda@temple.org",
    phone: "+1-555-0102",
    role: "volunteer",
    spiritualName: "Govinda Das",
    joinDate: "2023-03-22",
    avatar: "/images/devotee-1.jpg",
    isActive: true,
    interests: ["service", "cooking"],
    donations: 3500,
    eventsAttended: 18,
  },
  {
    id: "3",
    name: "Krishna Priya",
    email: "krishna@temple.org",
    phone: "+1-555-0103",
    role: "priest",
    spiritualName: "Krishna Priya Devi",
    joinDate: "2022-11-08",
    avatar: "/images/devotee-3.jpg",
    isActive: true,
    interests: ["philosophy", "meditation"],
    donations: 2800,
    eventsAttended: 32,
  },
]

let mockEvents: Event[] = [
  {
    id: "1",
    name: "Janmashtami Celebration",
    description: "Celebrate the birth of Lord Krishna with kirtan, drama, and prasadam",
    date: "2024-08-26",
    time: "18:00",
    location: "Main Temple Hall",
    category: "festival",
    maxAttendees: 500,
    currentAttendees: 450,
    budget: 5000,
    spent: 3200,
    status: "upcoming",
    image: "/images/festival-celebration.jpg",
    requiresRegistration: true,
    sendReminders: true,
    livestream: true,
    createdBy: "admin",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    name: "Bhagavad Gita Study Circle",
    description: "Weekly study and discussion of Krishna's teachings",
    date: "2024-06-15",
    time: "10:00",
    location: "Study Hall",
    category: "class",
    maxAttendees: 100,
    currentAttendees: 85,
    budget: 200,
    spent: 150,
    status: "completed",
    image: "/images/spiritual-books.jpg",
    requiresRegistration: false,
    sendReminders: true,
    livestream: false,
    createdBy: "admin",
    createdAt: "2024-05-01",
  },
]

const mockDonations: Donation[] = [
  {
    id: "1",
    donorId: "1",
    donorName: "Radha Devi",
    amount: 500,
    purpose: "Temple Maintenance",
    method: "online",
    date: "2024-06-10",
    recurring: true,
    status: "completed",
    receiptSent: true,
  },
  {
    id: "2",
    donorId: "2",
    donorName: "Govinda Das",
    amount: 250,
    purpose: "Food Distribution",
    method: "cash",
    date: "2024-06-09",
    recurring: false,
    status: "completed",
    receiptSent: true,
  },
]

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Bhagavad Gita Study Circle",
    description: "Weekly study and discussion of Krishna's teachings",
    instructor: "Govinda Das",
    schedule: "Every Sunday, 10:00 AM",
    participants: 45,
    maxParticipants: 60,
    status: "active",
    category: "spiritual-education",
    startDate: "2024-01-01",
  },
  {
    id: "2",
    title: "Kirtan & Devotional Music",
    description: "Learn and practice devotional singing",
    instructor: "Radha Devi",
    schedule: "Every Friday, 7:00 PM",
    participants: 32,
    maxParticipants: 40,
    status: "active",
    category: "kirtan",
    startDate: "2024-02-01",
  },
]

// API Functions
export const api = {
  // Members
  async getMembers(): Promise<Member[]> {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    return [...mockMembers]
  },

  async getMember(id: string): Promise<Member | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMembers.find((m) => m.id === id) || null
  },

  async createMember(member: Omit<Member, "id">): Promise<Member> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newMember = { ...member, id: Date.now().toString() }
    mockMembers.push(newMember)
    return newMember
  },

  async updateMember(id: string, updates: Partial<Member>): Promise<Member> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockMembers.findIndex((m) => m.id === id)
    if (index === -1) throw new Error("Member not found")
    mockMembers[index] = { ...mockMembers[index], ...updates }
    return mockMembers[index]
  },

  async deleteMember(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    mockMembers = mockMembers.filter((m) => m.id !== id)
  },

  // Events
  async getEvents(): Promise<Event[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...mockEvents]
  },

  async createEvent(event: Omit<Event, "id" | "createdAt">): Promise<Event> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    mockEvents.push(newEvent)
    return newEvent
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockEvents.findIndex((e) => e.id === id)
    if (index === -1) throw new Error("Event not found")
    mockEvents[index] = { ...mockEvents[index], ...updates }
    return mockEvents[index]
  },

  async deleteEvent(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    mockEvents = mockEvents.filter((e) => e.id !== id)
  },

  // Donations
  async getDonations(): Promise<Donation[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...mockDonations]
  },

  async createDonation(donation: Omit<Donation, "id">): Promise<Donation> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newDonation = { ...donation, id: Date.now().toString() }
    mockDonations.push(newDonation)
    return newDonation
  },

  // Programs
  async getPrograms(): Promise<Program[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...mockPrograms]
  },

  async createProgram(program: Omit<Program, "id">): Promise<Program> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newProgram = { ...program, id: Date.now().toString() }
    mockPrograms.push(newProgram)
    return newProgram
  },

  async updateProgram(id: string, updates: Partial<Program>): Promise<Program> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = mockPrograms.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Program not found")
    mockPrograms[index] = { ...mockPrograms[index], ...updates }
    return mockPrograms[index]
  },

  // Analytics
  async getAnalytics() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      totalMembers: mockMembers.length,
      activeMembers: mockMembers.filter((m) => m.isActive).length,
      totalDonations: mockDonations.reduce((sum, d) => sum + d.amount, 0),
      monthlyDonations: mockDonations
        .filter((d) => new Date(d.date).getMonth() === new Date().getMonth())
        .reduce((sum, d) => sum + d.amount, 0),
      upcomingEvents: mockEvents.filter((e) => e.status === "upcoming").length,
      activePrograms: mockPrograms.filter((p) => p.status === "active").length,
      memberGrowth: [
        { month: "Jan", members: 1050 },
        { month: "Feb", members: 1120 },
        { month: "Mar", members: 1180 },
        { month: "Apr", members: 1210 },
        { month: "May", members: 1235 },
        { month: "Jun", members: mockMembers.length },
      ],
    }
  },
}
