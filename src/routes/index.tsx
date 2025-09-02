import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import API from "../api/api";
import type { AxiosError } from "openapi-client-axios";
import type { Paths } from "../openapi";
export const Route = createFileRoute("/" as never)({
  component: RouteComponent,
});

const menuItems = [
  {
    key: "CHAT_ARCHIVES",
    name: "Chat Archives",
    path: "/explorer/archives",
  },
  {
    key: "TOTAL_CHATS",
    name: "Total Chats",
    path: "/explorer/total_chats_report",
  },
  {
    key: "CHAT_ENGAGEMENT",
    name: "Chat Engagement",
    path: "/explorer/engagement",
  },
  {
    key: "MISSED_CHATS",
    name: "Missed Chats",
    path: "/explorer/missed_chats",
  },
  {
    key: "TAGS_USAGE",
    name: "Tags Usage",
    path: "/explorer/tags_usage",
  },
  {
    key: "CHAT_SATISFACTION",
    name: "Chat Satisfaction",
    path: "/explorer/satisfaction",
  },
  {
    key: "CHAT_AVAILABILITY",
    name: "Chat Availability",
    path: "/explorer/availability",
  },
  {
    key: "CHAT_DURATION",
    name: "Chat Duration",
    path: "/explorer/duration",
  },
  {
    key: "AGENT_PERFORMANCE",
    name: "Agent Performance",
    path: "/explorer/agent_performance",
  },
  {
    key: "RESPONSES_TIME",
    name: "Chat Responses Time",
    path: "/explorer/responses_time",
  },
];

const validateSession = async (): Promise<Paths.VerifyDashboardToken.Responses.$200 | null> => {
  try {
    const client = await API();
    const { data } = await client.verifyDashboardToken({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return data;
  } catch (e) {
    // window.location.href = `/`
    return null;
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
      const user = await client.DashboardAppLogin(
        {
          app_slug: import.meta.env.VITE_APP_SLUG,
        },
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const accessibleMenuItems = menuItems.filter((item) =>
        user.data?.reportsAccess?.includes(item.key)
      );
      const path = accessibleMenuItems[0]?.path ?? "/explorer/archives";
      nav({
        to: path,
      } as never);
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

    try {
      const session = await validateSession();
      if (session) {
        const accessibleMenuItems = menuItems.filter((item) =>
          session.reportsAccess?.includes(item.key)
        );
        const path = accessibleMenuItems[0]?.path ?? "/explorer/archives";

        nav({
          to: path,
        } as never);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [nav]);


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
