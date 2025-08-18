import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import API from "../api/api";
import type { AxiosError } from "openapi-client-axios";
import type { Paths } from "../openapi";
export const Route = createFileRoute("/" as never)({
  component: RouteComponent,
});

const validateSession = async () => {
  try {
    const client = await API();
    await client.verifyDashboardToken({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return true;
  } catch (e) {
    // window.location.href = `/`
    return false;
  }
};

const fetchLogoURL = async () => {
  try {
    const client = await API();
    const { data } = await client.DashboardsGetOrganizationLogo(
      {
        app_slug: import.meta.env.VITE_APP_SLUG,
      },
      {
        domain: window.location.hostname,
      }
    );
    return data.logoURL;
  } catch (e) {
    console.error(e);
    return "";
  }
};

function RouteComponent() {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [logoURL, setLogoURL] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const login = async () => {
    if (!userData.email || !userData.password) {
      void messageApi.error("Please enter email and password");
      return;
    }

    setLoginLoading(true);
    try {
      const client = await API();
      await client.DashboardAppLogin(
        {
          app_slug: import.meta.env.VITE_APP_SLUG,
        },
        {
          email: userData.email,
          password: userData.password,
        }
      );
      nav({
        to: "/explorer/archives",
      });
    } catch (error) {
      const e =
        (error as AxiosError<Paths.DashboardAppLogin.Responses.$500>).response
          ?.data?.message?.error_message || "Something went wrong";
      void messageApi.error(e);
      console.log(error);
    }
    setLoginLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const logo = await fetchLogoURL();
      setLogoURL(logo ?? "");
      validateSession()
        .then((r) => {
          if (r) {
            nav({
              to: "/explorer/archives",
            });
          }
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-[100vh] flex flex-col p-6 justify-center items-center bg-gradient-to-t from-blue-100  to-white">
      {contextHolder}
      <div className="w-full md:w-1/4 sm:w-1/2 xs:w-full flex flex-col justify-center items-center  p-4 gap-4 bg-white rounded-lg shadow">
        <h5 className="text-lg font-semibold">Chat Data Explorer</h5>
        <Input
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          type="email"
          placeholder="Email"
        />
        <Input
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          type="password"
        />
        <Button loading={loginLoading} type="default" onClick={login}>
          Sign In
        </Button>
        {/* <a
        href="#"
        className="text-sm text-gray-600 hover:text-gray-900"
      >Forgot Password?</a> */}
        <img
          src={logoURL ?? "/logo.png"}
          alt="logo"
          className="w-[150px] mt-4 object-cover"
        />
      </div>
    </div>
  );
}
