"use client"
import Image from "next/image"
import {
  Package,
  CheckCircle,
  PlusCircle,
  Clock,
  Calendar,
  Tag,
  ShoppingBag,
  LogOut,
  User,
  ChevronRight,
  Edit2,
  Trash2,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FoodDonationDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              MealBridge
            </h1>
            <Badge variant="outline" className="ml-2 text-purple-300 border-purple-700">
              Restaurant
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white border-b-2 border-purple-500 pb-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Inventory
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Profile
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search donations..."
                className="w-64 pl-9 bg-slate-800/50 border-slate-700 text-sm"
              />
            </div>

            <div className="flex items-center space-x-1">
              <Avatar className="h-8 w-8 border border-purple-700">
                <AvatarImage src="/placeholder.svg" alt="@mockuser" />
                <AvatarFallback className="bg-purple-800 text-purple-200">MU</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-300 hidden md:inline-block">MockUser</span>
            </div>

            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome and Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="space-y-1 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Welcome, MockUser</h2>
            <p className="text-slate-400">Manage your food donations and help reduce waste</p>
          </div>

          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Donation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Active Donations</CardDescription>
              <CardTitle className="text-3xl font-bold text-white flex items-baseline">
                3<span className="text-green-400 text-sm ml-2 font-normal">+1 this week</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-slate-400 text-sm">
                <Package className="h-4 w-4 mr-1 text-purple-400" />
                <span>Ready for pickup</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Completed Donations</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">0</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-slate-400 text-sm">
                <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                <span>Successfully delivered</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Total Food Saved</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">18 kg</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-slate-400 text-sm">
                <ShoppingBag className="h-4 w-4 mr-1 text-blue-400" />
                <span>Prevented food waste</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400">Charities Helped</CardDescription>
              <CardTitle className="text-3xl font-bold text-white">2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-slate-400 text-sm">
                <User className="h-4 w-4 mr-1 text-pink-400" />
                <span>Community impact</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Recent Donations</CardTitle>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Donation Item 1 */}
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                  <Image
                    src="/placeholder.svg"
                    alt="Apple Pies"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-4 md:p-6 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Apple Pies</h3>
                      <p className="text-slate-400 text-sm">Surplus apple pies from yesterday.</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 self-start mt-2 md:mt-0">
                      Available
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Quantity</p>
                        <p className="text-sm font-medium text-slate-300">3 pies</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="text-sm font-medium text-slate-300">Bakery</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Expires</p>
                        <p className="text-sm font-medium text-slate-300">7/18/2024</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Pickup</p>
                        <p className="text-sm font-medium text-slate-300">09:00 - 11:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 text-purple-400 hover:bg-purple-900/30"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/30">
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Item 2 */}
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                  <Image
                    src="/placeholder.svg"
                    alt="Bread Loaves"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-4 md:p-6 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Bread Loaves</h3>
                      <p className="text-slate-400 text-sm">
                        Freshly baked sourdough and whole wheat bread from this morning.
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 self-start mt-2 md:mt-0">
                      Available
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Quantity</p>
                        <p className="text-sm font-medium text-slate-300">10 loaves</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="text-sm font-medium text-slate-300">Bakery</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Expires</p>
                        <p className="text-sm font-medium text-slate-300">7/17/2024</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Pickup</p>
                        <p className="text-sm font-medium text-slate-300">16:00 - 18:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 text-purple-400 hover:bg-purple-900/30"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/30">
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Item 3 */}
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                  <Image
                    src="/placeholder.svg"
                    alt="Fresh Pasta"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-4 md:p-6 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Fresh Pasta</h3>
                      <p className="text-slate-400 text-sm">
                        Leftover pasta from dinner service, includes vegetarian option.
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 self-start mt-2 md:mt-0">
                      Available
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Quantity</p>
                        <p className="text-sm font-medium text-slate-300">5 kg</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="text-sm font-medium text-slate-300">Prepared Meals</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Expires</p>
                        <p className="text-sm font-medium text-slate-300">7/16/2024</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-500">Pickup</p>
                        <p className="text-sm font-medium text-slate-300">10:00 - 14:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 text-purple-400 hover:bg-purple-900/30"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/30">
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
