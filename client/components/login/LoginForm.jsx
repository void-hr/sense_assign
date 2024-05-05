"use client"

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const handleLogin = async(values) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/login`, {
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
        console.error("something went wrong");
        setIsLoggedIn(false);
    }
  }


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
        handleLogin(values);
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form  className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
            Sign in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-6">
        <div className="w-full text-center flex flex-col gap-3">
          <Label>Don`t have an account yet?</Label>
          <Button variant="outline" className="w-full">
            <Link href={"/register"}>Sign Up</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
