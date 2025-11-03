'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Lock, Mail, ArrowRight, User } from "lucide-react";

import Image from "next/image";
import google from "../../../public/google2.svg"; 
import uniLogo from "../../../public/uniLogo.png"; 
import collegeImg from "../../../public/collegeImg.png"; 

import { LoginFormData, loginSchema } from "@/utils/types/auth";
import { Button } from "@/components/ui/button";
import Google from "next-auth/providers/google";

const Login = () => {
    const router = useRouter()
    const [serverErr, setServerErr] = useState('')

    const {
        register,
        clearErrors,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            CollegeId: '',
            password: ""
        }
    })

    const onSubmit = async (data: LoginFormData) => {
        setServerErr('')
        console.log("Form submitted, attempting sign in...");

        try {
            const res = await signIn("credentials", {
                CollegeId: data.CollegeId,
                password: data.password,
                redirect: false
            })

            console.log("Sign in response:", res);

            if (res?.error) {
                setServerErr("Invalid College ID or password. Please try again.")
            }
            else if (res?.ok) {
                router.push('/dashboard')
            } else {
                setServerErr("An unexpected error occurred during login.");
            }
        } catch (error) {
            console.error("Login onSubmit error:", error);
            setServerErr("An unexpected error occurred.");
        }
    }

    const handleGoogleSignIn = () => {
        setServerErr(''); 
        clearErrors();    
        signIn("google"); 
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 relative flex-col justify-center">
                 <Image src={collegeImg} alt="collegeimg"/>
                <h2 className="text-4xl font-bold mb-6 max-w-md">Powering student-centric education in universities & colleges</h2>
                <p className="text-lg text-slate-200 max-w-lg">
                    We help universities and colleges of all sizes and streams run better – from admissions to academics, back office to
                    accreditations, desktop to mobiles – We empower students, faculty and management to collaborate efficiently and use
                    insights effectively, benchmarking quality education while creating personalized learning experience.
                </p>

                <div className="absolute bottom-12">
                    <p className="text-sm text-slate-400 mb-2">A market leader in end-to-end unified education management solutions</p>
                    <p className="text-xs text-slate-500">2025 © All rights reserved & Privacy Policy</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-10 px-6 sm:px-12 bg-white">
                
                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <Image src={uniLogo} alt="universityLogo" width={250} />
                    </div>

                    {/* Form container */}
                    <form
                        className="w-full space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Login Id Field */}
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-medium text-gray-600 mb-1">college Id</label>
                            <input
                                type={"text"}
                                placeholder=""
                                className="outline-none w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 transition-all"
                                {...register("CollegeId")}
                            />
                            {errors.CollegeId && (
                                <p className="text-sm text-red-600 mt-1">{errors.CollegeId.message}</p>
                            )}
                        </div>
                        
                        {/* Password Field */}
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
                            <input
                                type={"password"}
                                placeholder=""
                                className="outline-none w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 transition-all"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {serverErr && (
                            <p className="text-sm text-red-600 text-center font-medium pt-2">{serverErr}</p>
                        )}
                        <div className=" flex items-center w-full pt-4">
                            <button
                                type="submit"
                                className="bg-[#5D7DF3] hover:bg-[#4a67d1] text-white px-8 py-2.5 rounded-md font-semibold disabled:opacity-70 transition-all  flex items-center gap-2 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "LOGIN"}
                                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Google Sign In Button */}
                        <div className="flex flex-col items-center w-full gap-4 pt-6">
                            <Button className="p-4 cursor-pointer" variant={"outline"} onClick={handleGoogleSignIn}>
                                <Image src={google} alt="googleImg" className="p-2"/>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

