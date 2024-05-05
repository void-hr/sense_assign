"use client"
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setIsLoggedIn } = useAuth();

  const handleCreateAccount = async( values ) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
        const { token } = await res.json();
        if( token ) {
            localStorage.setItem("token", token)
            setIsLoggedIn(true);
            router.push("/")
        }

    } catch (error) {
        console.error("something went wrong")
      setIsSubmitted(false);

    }
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters")
      .max(10, "Password must be at most 10 characters"),
    }),
    onSubmit: (values) => {
      handleCreateAccount(values)
    },
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form  className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="Max"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className="text-red-500 text-xs">{formik.errors.firstName}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Robinson"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className="text-red-500 text-xs">{formik.errors.lastName}</span>
              )}
            </div>
            </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs">{formik.errors.email}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-xs">{formik.errors.password}</span>
            )}
          </div>
          <Button type="button" onClick={formik.handleSubmit} className="w-full">
            Create an account
          </Button>
        </form>
        {isSubmitted && (
          <div className="mt-4 text-center text-green-500">
            Account created successfully!
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
