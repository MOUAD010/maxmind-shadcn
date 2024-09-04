"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LockIcon, UserIcon } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const storedUserData = sessionStorage.getItem("userData");
      if (storedUserData) {
        const { username } = JSON.parse(storedUserData);
        setUsername(username);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Error reading from sessionStorage:", err);
      setError(
        "An error occurred while retrieving user data. Please try logging in again."
      );
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!username || !password) {
        throw new Error("Please enter both username and password.");
      }

      // In a real application, you would validate credentials against a backend
      // For this example, we'll just check if the password is not empty
      if (password.length > 0) {
        const userData = { username, loginTime: new Date().toISOString() };
        sessionStorage.setItem("userData", JSON.stringify(userData));
        setIsLoggedIn(true);
      } else {
        throw new Error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Logout error:", err);
      setError("An error occurred during logout. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex  justify-center items-center my-auto w-full h-screen shadow-md">
        {" "}
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome, {username}!</CardTitle>
            <CardDescription>You are logged in.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          </CardFooter>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className=" flex  justify-center items-center my-auto w-full h-screen shadow-md">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <UserIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
