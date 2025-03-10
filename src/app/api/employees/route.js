import Employee from "../../../../models/Employee";
import dbConnect from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
      const employees = await Employee.find();
      return NextResponse.json(employees, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  export async function POST(req) {
    await dbConnect();
    try {
      const { firstName, lastName, email, phone, role } = await req.json();
      const employee = await Employee.create({ firstName, lastName, email, phone, role });
      return NextResponse.json(employee, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function PUT(req) {
    await dbConnect();
    try {
      const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
      const id = searchParams.get("id");
  
      if (!id) {
        return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
      }
  
      const { firstName, lastName, email, phone, role } = await req.json();
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { firstName, lastName, email, phone, role },
        { new: true, runValidators: true }
      );
  
      if (!updatedEmployee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedEmployee, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  export async function DELETE(req) {
    await dbConnect();
    try {
      const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
      const id = searchParams.get("id");
  
      if (!id) {
        return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
      }
  
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Employee deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  