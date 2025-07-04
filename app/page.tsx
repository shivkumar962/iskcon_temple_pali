
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from "@/components/ui/carousel"
import { Calendar, Clock, Heart, Users, BookOpen, Sparkles, MapPin, Phone, Mail, Star, Quote, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {


  const heroSlides = [
    {
      image: "/images/hero-slide-1.jpg",
      title: "Welcome to Divine Consciousness",
      subtitle: "Experience the bliss of Krishna consciousness",
      description:
        "Join us in our journey towards spiritual enlightenment through devotion, community, and divine love.",
      cta: "Begin Your Journey",
    },
    {
      image: "/images/hero-slide-2.jpg",
      title: "Janmashtami Festival 2024",
      subtitle: "Celebrate Lord Krishna's Birth",
      description: "Join us for the grand celebration with kirtan, drama, and divine prasadam on August 26th.",
      cta: "Register Now",
    },
    {
      image: "/images/hero-slide-3.jpg",
      title: "Daily Spiritual Programs",
      subtitle: "Deepen Your Practice",
      description: "Participate in our daily arati, Bhagavad Gita classes, and community kirtan sessions.",
      cta: "View Schedule",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-800">ISKCON Temple</h1>
                <p className="text-sm text-orange-600 font-medium">🕉️ Hare Krishna 🕉️</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="#about"
                className="text-orange-700 hover:text-orange-900 font-medium transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#events"
                className="text-orange-700 hover:text-orange-900 font-medium transition-colors relative group"
              >
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#services"
                className="text-orange-700 hover:text-orange-900 font-medium transition-colors relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#contact"
                className="text-orange-700 hover:text-orange-900 font-medium transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent font-medium"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                  Join Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Carousel Section */}
      <section className="relative">
        <Carousel autoPlay autoPlayInterval={6000} className="h-[70vh] md:h-[80vh]">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative">
                <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                      <div className="max-w-4xl mx-auto">
                        <Badge className="mb-6 bg-orange-500/90 text-white border-orange-400 backdrop-blur-sm text-lg px-4 py-2">
                          🕉️ {slide.subtitle}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
                          {slide.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold"
                          >
                            <Heart className="w-5 h-5 mr-2" />
                            {slide.cta}
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg px-8 py-4 shadow-xl font-semibold"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Watch Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      </section>

      {/* Enhanced Daily Schedule */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-orange-300 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-amber-300 rounded-full"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200 text-lg px-4 py-2">
              🕉️ Daily Worship
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">Daily Temple Schedule</h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Join us for daily prayers, kirtans, and spiritual activities that nourish the soul
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                time: "4:30 AM",
                activity: "Mangala Arati",
                description: "Morning prayers and offerings to awaken the divine",
                icon: "🌅",
              },
              {
                time: "7:00 AM",
                activity: "Guru Puja",
                description: "Honoring the spiritual master with devotion",
                icon: "🙏",
              },
              {
                time: "12:30 PM",
                activity: "Raj Bhog Arati",
                description: "Midday offering of sumptuous feast to Krishna",
                icon: "🍽️",
              },
              {
                time: "7:00 PM",
                activity: "Sandhya Arati",
                description: "Evening prayers and community kirtan",
                icon: "🕯️",
              },
            ].map((schedule, index) => (
              <Card
                key={index}
                className="border-orange-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4">{schedule.icon}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-orange-900 font-bold">{schedule.time}</CardTitle>
                  <CardDescription className="text-orange-600 font-semibold text-lg">
                    {schedule.activity}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 text-center leading-relaxed">{schedule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Upcoming Events */}
      <section
        id="events"
        className="py-20 px-4 bg-gradient-to-br from-orange-100 via-amber-100 to-orange-200 relative"
      >
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/temple-interior-2.jpg" alt="Temple Background" fill className="object-cover" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500 text-white border-orange-400 text-lg px-4 py-2">🎉 Celebrations</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">Upcoming Festivals & Events</h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Celebrate divine festivals and spiritual gatherings with our loving community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Janmashtami Celebration",
                date: "August 26, 2024",
                time: "6:00 PM - 11:00 PM",
                description: "Celebrate the birth of Lord Krishna with kirtan, drama, and divine prasadam",
                image: "/images/festival-celebration.jpg",
                attendees: 450,
                price: "Free",
              },
              {
                title: "Bhagavad Gita Study Circle",
                date: "Every Sunday",
                time: "10:00 AM - 12:00 PM",
                description: "Weekly study and discussion of Krishna's eternal teachings",
                image: "/images/spiritual-books.jpg",
                attendees: 85,
                price: "Free",
              },
              {
                title: "Ratha Yatra Festival",
                date: "July 15, 2024",
                time: "9:00 AM - 6:00 PM",
                description: "Grand chariot festival with procession and divine celebrations",
                image: "/images/lotus-temple.jpg",
                attendees: 320,
                price: "Free",
              },
            ].map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden border-orange-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/95 backdrop-blur-sm"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 text-white shadow-lg backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Event
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm mb-2 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-orange-900 font-bold">{event.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-orange-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees} attending
                    </div>
                    <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                      {event.price}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-orange-700 mb-6 leading-relaxed">{event.description}</p>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold">
                    <Heart className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services */}
      <section id="services" className="py-20 px-4 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200 text-lg px-4 py-2">
              🛕 Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">Temple Services</h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Spiritual services and community programs designed to nurture your divine connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Spiritual Education",
                description: "Bhagavad Gita classes, Sanskrit learning, and deep philosophical discussions",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "Community Programs",
                description: "Youth programs, family events, and devotee gatherings for all ages",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Heart,
                title: "Donation Services",
                description: "Support temple activities and community service projects with love",
                color: "from-red-500 to-rose-600",
              },
              {
                icon: Calendar,
                title: "Event Booking",
                description: "Book the temple for weddings, ceremonies, and spiritual celebrations",
                color: "from-purple-500 to-pink-600",
              },
              {
                icon: Sparkles,
                title: "Spiritual Counseling",
                description: "Personal guidance and spiritual mentorship from experienced devotees",
                color: "from-yellow-500 to-orange-600",
              },
              {
                icon: Users,
                title: "Volunteer Programs",
                description: "Join our seva (service) programs and contribute to the divine mission",
                color: "from-teal-500 to-cyan-600",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="text-center border-orange-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50"
              >
                <CardHeader className="pb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-orange-900 font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 leading-relaxed text-lg">{service.description}</p>
                  <Button
                    variant="outline"
                    className="mt-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent font-medium"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500 text-white border-orange-400 text-lg px-4 py-2">💝 Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">Devotee Experiences</h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Hear from our community members about their spiritual journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Radha Devi",
                role: "Devotee since 2020",
                image: "/images/devotee-2.jpg",
                quote:
                  "This temple has transformed my life completely. The daily programs and loving community have brought me closer to Krishna than I ever imagined possible.",
                rating: 5,
              },
              {
                name: "Govinda Das",
                role: "Volunteer Coordinator",
                image: "/images/devotee-1.jpg",
                quote:
                  "Serving in this temple is the greatest blessing. Every day brings new opportunities to serve Krishna and help others on their spiritual path.",
                rating: 5,
              },
              {
                name: "Krishna Priya",
                role: "Bhagavad Gita Student",
                image: "/images/devotee-3.jpg",
                quote:
                  "The Gita classes here are profound and life-changing. The teachers explain complex philosophy in such a beautiful and practical way.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-orange-200 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-900 text-lg">{testimonial.name}</h4>
                      <p className="text-orange-600 text-sm">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-orange-300 mb-4" />
                  <p className="text-orange-700 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-r from-orange-900 via-amber-900 to-orange-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/meditation-hall.jpg" alt="Temple Interior" fill className="object-cover" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-orange-500 text-white border-orange-400 text-lg px-4 py-2">🏛️ Visit Us</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Visit Our Sacred Temple</h2>
              <p className="text-orange-100 mb-10 text-xl leading-relaxed">
                Come and experience the divine atmosphere of Krishna consciousness. All souls are welcome to join our
                spiritual family and embark on the path of devotion.
              </p>

              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors">
                    <MapPin className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Temple Address</p>
                    <p className="text-orange-200">123 Spiritual Avenue, Divine City, DC 12345</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Phone Number</p>
                    <p className="text-orange-200">+1 (555) 123-HARE</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email Address</p>
                    <p className="text-orange-200">info@iskcontemple.org</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-orange-300/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Get Temple Updates</CardTitle>
                <CardDescription className="text-orange-100 text-lg">
                  Subscribe to receive updates about events, festivals, and spiritual programs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-300/30 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-300/30 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <textarea
                    placeholder="Your message (optional)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-orange-300/30 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent backdrop-blur-sm resize-none"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 py-3 text-lg font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  Subscribe & Connect
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-orange-950 text-orange-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">ISKCON Temple</span>
                  <p className="text-orange-300">🕉️ Hare Krishna 🕉️</p>
                </div>
              </div>
              <p className="text-orange-300 mb-6 leading-relaxed text-lg">
                Dedicated to spreading Krishna consciousness and providing a spiritual home for all souls seeking divine
                connection.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-orange-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#events" className="text-orange-300 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-orange-300 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-orange-300 hover:text-white transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Programs</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-orange-300">Daily Arati</span>
                </li>
                <li>
                  <span className="text-orange-300">Gita Classes</span>
                </li>
                <li>
                  <span className="text-orange-300">Kirtan Sessions</span>
                </li>
                <li>
                  <span className="text-orange-300">Festivals</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-800 pt-8 text-center">
            <p className="text-orange-300 mb-6 text-xl font-medium">
              🕉️ Hare Krishna Hare Krishna Krishna Krishna Hare Hare 🕉️
              <br />
              🕉️ Hare Rama Hare Rama Rama Rama Hare Hare 🕉️
            </p>
            <p className="text-orange-400">
              © 2024 ISKCON Temple. All rights reserved. | Spreading Krishna Consciousness Worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
