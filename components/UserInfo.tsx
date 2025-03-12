"use client";
import { useUserStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const UserInfo = () => {
  const { email, firstName, lastName, password, other } = useUserStore(
    (state) => state,
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Info</CardTitle>
          <CardDescription>
            This is the stored user information with the help of zustand.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>Email: {email}</div>
          <div>First Name: {firstName}</div>
          <div>Last Name: {lastName}</div>
          <div>Password: {password}</div>
          <div>Other: {other}</div>
        </CardContent>
      </Card>
    </>
  );
};
