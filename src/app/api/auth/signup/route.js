import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await dbConnect();
      
      const { firstName, lastName, email, password } = await req.json();
  
      if (!firstName || !lastName || !email || !password) {
        return new NextResponse(JSON.stringify({ error: "All fields are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new NextResponse(JSON.stringify({ error: "User already exists" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return new NextResponse(JSON.stringify({ message: "User registered successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Signup error:", error);
      return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  