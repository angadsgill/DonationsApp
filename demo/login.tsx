"use client"

import { useState } from "react"
import { Utensils, Heart, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FoodDonationApp() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-950 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-slate-900/60 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              MealBridge
            </CardTitle>
            <CardDescription className="text-slate-300">
              Connect restaurants with excess food to charities in need
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={selectedRole === "restaurant" ? "default" : "outline"}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 ${selectedRole === "restaurant" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-slate-800"}`}
                    onClick={() => setSelectedRole("restaurant")}
                  >
                    <Utensils className="h-8 w-8" />
                    <span>Restaurant</span>
                  </Button>

                  <Button
                    variant={selectedRole === "charity" ? "default" : "outline"}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 ${selectedRole === "charity" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-slate-800"}`}
                    onClick={() => setSelectedRole("charity")}
                  >
                    <Heart className="h-8 w-8" />
                    <span>Charity</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">Username</span>
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-slate-200 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">Password</span>
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-slate-200 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="text-right">
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <p className="text-center text-slate-300">Create a new account to start donating or receiving food.</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-slate-800"
                  >
                    <Utensils className="h-8 w-8" />
                    <span>Restaurant</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-slate-800"
                  >
                    <Heart className="h-8 w-8" />
                    <span>Charity</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6">
              <span className="mr-2">Login</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>

          <div className="p-4 text-center">
            <p className="text-xs text-slate-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
