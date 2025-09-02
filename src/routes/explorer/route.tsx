import { FunnelPlotOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Alert, Avatar, Input, message, Modal, Typography } from "antd";
import { createContext, useEffect, useState } from "react";
import API from "../../api/api";
import type { Paths } from "../../openapi";

const validateSession = async () => {
  try {
    const client = await API();
    const { data } = await client.verifyDashboardToken({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return data;
  } catch (e) {
    window.location.href = `/`;
    return false;
  }
};

const getGroups = async () => {
  try {
    const client = await API();
    const { data } = await client.DashboardListGroups({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return data;
  } catch (e) {
    return [];
  }
};

const getAgents = async () => {
  try {
    const client = await API();
    const { data } = await client.DashboardListAgents({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return data;
  } catch (e) {
    return [];
  }
};

const getTags = async (group_ids: number[]) => {
  try {
    const client = await API();
    const { data } = await client.DashboardReportsListTags(
      {
        app_slug: import.meta.env.VITE_APP_SLUG,
      },
      {
        groups: group_ids,
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getUserFilters = async () => {
  try {
    const client = await API();
    const { data } = await client.DashboardListUserFilters({
      app_slug: import.meta.env.VITE_APP_SLUG,
    });
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const Route = createFileRoute("/explorer")({
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

export const ReportContext = createContext<{
  selectedGroup: number | null;
  groups: {
    id: number;
    name: string;
  }[];
  agents: Paths.DashboardListAgents.Responses.$200;
  tags: Paths.DashboardReportsListTags.Responses.$200;
  sessionData?: Paths.VerifyDashboardToken.Responses.$200;
  userFilters?: Paths.DashboardListUserFilters.Responses.$200;
}>({ selectedGroup: null, groups: [], agents: [], tags: [], userFilters: [] });

function RouteComponent() {
  const [status, setStatus] = useState<
    "unauthenticated" | "loading" | "authenticated"
  >("loading");
  const [sessionData, setSessionData] =
    useState<Paths.VerifyDashboardToken.Responses.$200 | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
  const [agents, setAgents] =
    useState<Paths.DashboardListAgents.Responses.$200>([]);
  const [tags, setTags] =
    useState<Paths.DashboardReportsListTags.Responses.$200>([]);
  const [userFilters, setUserFilters] =
    useState<Paths.DashboardListUserFilters.Responses.$200>([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectorFilter, setSelectorFilter] = useState("");
  const { pathname: path } = useLocation();
  const [messageApi, messageContext] = message.useMessage();

  const accessibleMenuItems = menuItems.filter(item =>
  sessionData?.reportsAccess.includes(item.key)
);

  const navigate = useNavigate();
  useEffect(() => {
    validateSession().then((r) => {
      setStatus(r ? "authenticated" : "unauthenticated");

      if (r) {
        setSessionData(r);
        getUserFilters().then((r) => {
          setUserFilters(r);
        });
        getGroups().then((r) => {
          setGroupsLoading(false);
          setGroups(
            r
              .map((g) => ({ id: g.id ?? Math.random(), name: g.name ?? "" }))
              .sort((a, b) => a.name.localeCompare(b.name))
          );
          if (!selectedGroup) setSelectedGroup(r[0].id ?? null);
        });
      }
    });
  }, []);

useEffect(() => {
  if (!selectedGroup && selectedGroup !== 0) return;

  // 1. Fetch tags and filter by groups
  getTags(groups.map((g) => g.id)).then((tagsResponse) => {
    setTags(
      tagsResponse.filter(tag =>
        tag.group_ids.some((groupId: number) =>
          groups.some(g => g.id === groupId)
        )
      )
    );
  });

  // 2. Fetch agents and filter them based on available groups
  getAgents().then((agentsResponse) => {
    setAgents(
      agentsResponse.filter((agent) =>
        agent.groups.some((group: { id: number; priority: string }) =>
          groups.some((g) => g.id === group.id)
        )
      )
    );
  });

}, [selectedGroup, groups]); // include groups if it can change

  if (status === "loading")
    return (
      <div className="h-screen flex justify-center items-center animate-pulse">
        Loading
      </div>
    );
  else if (status === "unauthenticated") return <div>Unauthenticated</div>;
  else if (status === "authenticated") {
    if (!groupsLoading && groups.length == 0)
      return (
        <div className="h-screen flex justify-center items-center">
          <Alert
            type="info"
            message="Unfortunately you have not been invited to any groups. Please contact your administrator for more information"
          />
        </div>
      );
    return (
      <div className="flex flex-row h-screen ">
        {messageContext}
        <ReportContext.Provider
          value={{
            agents,
            selectedGroup,
            groups,
            tags,
            sessionData: sessionData || undefined,
            userFilters,
          }}
        >
          <Modal
            footer={null}
            title="Change Group"
            open={showSelectionModal}
            onCancel={() => setShowSelectionModal(false)}
          >
            <Input.Search
              placeholder="Filter Groups"
              onChange={(v) => setSelectorFilter(v.target.value)}
              value={selectorFilter}
            />
            <div className="flex flex-col max-h-[calc(100vh-200px)] overflow-y-scroll mt-4">
              {groups
                .filter((g) =>
                  g.name.toLowerCase().includes(selectorFilter.toLowerCase())
                )
                .map((g, i) => {
                  return (
                    <div
                      key={i}
                      className="p-4 border-b border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300"
                      onClick={() => {
                        setSelectedGroup(g.id);
                        setShowSelectionModal(false);
                      }}
                    >
                      <Avatar
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${g.name}`}
                        size={40}
                        shape="square"
                      />
                      <div className="w-[380px]">
                        <Typography.Text strong ellipsis={true}>
                          {g.name}
                        </Typography.Text>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Modal>
          {/* SIDEBAR */}
          <div className="w-[300px] bg-gray-50 p-2 h-screen flex flex-col">
            {/* LOGO */}
            <div>
              <img
                src={sessionData?.dashboardDetails.whiteLabelImage || "/logo.png"}
                className="max-w-[200px] mx-auto py-4 max-h-[200px]"
              />
            </div>
            {/* GROUP SELECTOR */}
            {/* <Spin spinning={groupsLoading}>
            <div className='p-2 text-sm font-semibold text-gray-500'>Select Group:</div>
            <div
              onClick={() => setShowSelectionModal(true)}
              className='p-4 border border-gray-200 flex justify-center items-center gap-2 shadow-md rounded-lg hover:bg-gray-100 cursor-pointer w-[95%] mx-auto'>
              <Avatar
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${groups.find(g => g.id === selectedGroup)?.name ?? "All"}`}
                size={40} shape='square' />
              <div className='w-[160px]'><Typography.Text strong ellipsis={true}>{
                groups.find(g => g.id === selectedGroup)?.name ?? "Loading"}</Typography.Text></div>
              <div
                onClick={() => setShowSelectionModal(true)}
              ><EllipsisOutlined className='cursor-pointer transform rotate-90' /></div>
            </div>
          </Spin> */}
            <div className="flex flex-col flex-1  mt-4 mx-2">
              {accessibleMenuItems.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`${item.path === path ? "bg-blue-100 font-semibold" : ""} p-3 rounded-lg  flex justify-between items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300`}
                    onClick={() => {
                      navigate({
                        to: item.path,
                      } as never);
                    }}
                  >
                    <div className="flex gap-2 items-center ">
                      {/* <div>{item.icon}</div> */}
                      <div>{item.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="p-3 rounded-lg  flex  items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={() =>
                navigate({ to: "/explorer/filters_manager" } as never)
              }
            >
              <FunnelPlotOutlined />
              Filters Manager
            </div>
            <div
              className="p-3 rounded-lg  flex  items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={async () => {
                try {
                  void messageApi.loading("Logging out...");
                  const client = await API();
                  await client.dashboardLogOut({
                    app_slug: import.meta.env.VITE_APP_SLUG,
                  });
                  void messageApi.destroy();
                  await messageApi.success("Logged out successfully");
                  window.location.href = `/`;
                } catch (e) {
                  console.log(e);
                  void messageApi.error("Something went wrong");
                }
              }}
            >
              <LogoutOutlined />
              Log Out
            </div>
          </div>
          <div className="flex-1 h-screen overflow-y-auto">
            <Outlet />
          </div>
        </ReportContext.Provider>
      </div>
    );
  }
}
