import {z} from "zod"

// --- FIX ---
// Created a new schema specifically for the login form.
// It only validates the fields present in the login form.
export const loginSchema=z.object({
    CollegeId:z.string().min(1, "College ID is required"),
    password:z.string().min(1,"Password is required"),
})

export type LoginFormData = z.infer<typeof loginSchema>;


// Renamed your original schema to 'signupSchema' as it seems
// more appropriate for registration.
export const signupSchema=z.object({
    email:z.string().email({message:"invalid email"}),
    password:z.string().min(6,"password must be greater than length 6").max(12,"password is not greater than 12"),
    name:z.string().min(2,"name should be required"),
    Branch:z.string(),
    CollegeId:z.string(),
    Role:z.string()
})

export type SignupFormData = z.infer<typeof signupSchema>;
