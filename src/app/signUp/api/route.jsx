import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const newUser = await request.json();

    // Validate input data
    if (!newUser.name || !newUser.email || !newUser.password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const db = await connectDB();
    const userCollection = db.collection("users");
    const exists = await userCollection.findOne({ email: newUser.email });

    if (exists) {
      return new Response(JSON.stringify({ message: "User exists!" }), {
        status: 409,
      });
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    await userCollection.insertOne({ ...newUser, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};
