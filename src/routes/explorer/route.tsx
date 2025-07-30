import { EllipsisOutlined, LogoutOutlined } from '@ant-design/icons'
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Alert, Avatar, Input, Modal, Spin, Typography } from 'antd'
import { createContext, useEffect, useState } from 'react'
import API from '../../api/api'
import type { Paths } from '../../openapi'

const validateSession = async () => {
  try {
    const client = await API()
    await client.verifyDashboardToken({
      app_slug: import.meta.env.VITE_APP_SLUG
    })
    return true
  } catch (e) {
    return window.location.href = `/`
  }
}

const getGroups = async () => {
  try {
    const client = await API()
    const { data } = await client.DashboardListGroups({
      app_slug: import.meta.env.VITE_APP_SLUG
    })
    return data
  } catch (e) {
    return []
  }
}

const getAgents = async () => {
  try {
    const client = await API()
    const { data } = await client.DashboardListAgents({
      app_slug: import.meta.env.VITE_APP_SLUG
    })
    return data
  } catch (e) {
    return []
  }
}

const getTags = async (group_id: number) => {
  try {
    const client = await API()
    const { data } = await client.DashboardReportsListTags({
      app_slug: import.meta.env.VITE_APP_SLUG
    }, {
      groups: [group_id]
    })
    return data
  } catch (e) {
    console.log(e)
    return []
  }
}

export const Route = createFileRoute('/explorer')({
  component: RouteComponent,
})


const menuItems = [
  {
    name: 'Chat Archives',
    path: '/explorer/archives',
    // icon: <MessageOutlined />
  },
  {
    name: 'Total Chats',
    path: '/explorer/total_chats_report',
    // icon: <MessageOutlined />
  },
  {
    name: "Chat Engagement",
    path: '/explorer/engagement',
  },
  {
    name: "Missed Chats",
    path: '/explorer/missed_chats',
  },
  {
    name: "Tags Usage",
    path: '/explorer/tags_usage',
  },
  {
    name: "Chat Satisfaction",
    path: '/explorer/satisfaction',
  },
  {
    name: "Chat Availability",
    path: '/explorer/availability',
  },
  {
    name: "Chat Duration",
    path: '/explorer/duration',
  },
  {
    name: "Agent Performance",
    path: '/explorer/agent_performance',
  },
  {
    name: "Chat Responses Time",
    path: '/explorer/responses_time',
  }
]

export const ReportContext = createContext<{
  selectedGroup: number | null,
  groups: {
    id: number,
    name: string
  }[],
  agents: Paths.DashboardListAgents.Responses.$200,
  tags: Paths.DashboardReportsListTags.Responses.$200
}>({ selectedGroup: null, groups: [], agents: [], tags: [] })

function RouteComponent() {
  const [status, setStatus] = useState<'unauthenticated' | 'loading' | 'authenticated'>('loading')
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [groups, setGroups] = useState<{ id: number, name: string }[]>([])
  const [agents, setAgents] = useState<Paths.DashboardListAgents.Responses.$200>([])
  const [tags, setTags] = useState<Paths.DashboardReportsListTags.Responses.$200>([])
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [selectorFilter, setSelectorFilter] = useState('')
  const { pathname: path } = useLocation()


  const navigate = useNavigate()
  useEffect(() => {
    validateSession().then(r => {
      setStatus(r ? 'authenticated' : 'unauthenticated')
      if (r) {
        getGroups().then(r => {
          setGroupsLoading(false)
          setGroups(r.map(g => ({ id: g.id ?? Math.random(), name: g.name ?? "" })).sort((a, b) => a.name.localeCompare(b.name)))
          if (!selectedGroup) setSelectedGroup(r[0].id ?? null)
        })
        getAgents().then(r => {
          setAgents(r)
        })

      }
    })
  }, [])

  useEffect(() => {
    if(!selectedGroup) return
    getTags(selectedGroup).then(r => {
      setTags(r)
    })
  }, [selectedGroup])


  if (status === "loading") return <div
    className='h-screen flex justify-center items-center animate-pulse'
  >Loading</div>
  else if (status === "unauthenticated") return <div>Unauthenticated</div>
  else if (status === "authenticated") {
    if (!groupsLoading && groups.length == 0) return <div className='h-screen flex justify-center items-center'>
      <Alert type='info' message="Unfortunately you have not been invited to any groups. Please contact your administrator for more information" />
    </div>
    return <div className='flex flex-row h-screen '>
      <ReportContext.Provider
        value={{
          agents,
          selectedGroup,
          groups,
          tags
        }}
      >
        <Modal
          footer={null}
          title="Change Group" open={showSelectionModal} onCancel={() => setShowSelectionModal(false)}>
          <Input.Search placeholder='Filter Groups' onChange={v => setSelectorFilter(v.target.value)} value={selectorFilter} />
          <div className='flex flex-col max-h-[calc(100vh-200px)] overflow-y-scroll mt-4'>
            {groups
              .filter(g => g.name.toLowerCase().includes(selectorFilter.toLowerCase()))
              .map((g, i) => {
                return <div key={i} className='p-4 border-b border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300'
                  onClick={() => {
                    setSelectedGroup(g.id)
                    setShowSelectionModal(false)
                  }}
                >
                  <Avatar
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${g.name}`}
                    size={40} shape='square' />
                  <div className='w-[380px]'><Typography.Text strong ellipsis={true}>{g.name}</Typography.Text></div>
                </div>
              })}
          </div>
        </Modal>
        {/* SIDEBAR */}
        <div className='w-[300px] bg-gray-50 p-2 h-screen flex flex-col'>
          {/* LOGO */}
          <div>
            <img src={"/logo.png"} className='w-[200px] mx-auto py-4' />
          </div>
          {/* GROUP SELECTOR */}
          <Spin spinning={groupsLoading}>
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
          </Spin>
          <div className='flex flex-col flex-1  mt-4 mx-2'>
            {
              menuItems.map((item, i) => {
                return <div key={i} className={`${item.path === path ? "bg-blue-100 font-semibold" : ""} p-3 rounded-lg  flex justify-between items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300`}
                  onClick={() => {
                    navigate({
                      to: item.path
                    } as never)
                  }}
                >
                  <div className='flex gap-2 items-center '>
                    {/* <div>{item.icon}</div> */}
                    <div>{item.name}</div>
                  </div>
                </div>
              })
            }
          </div>
          <div
            className='p-3 rounded-lg  flex  items-center gap-2 cursor-pointer hover:bg-gray-100 transition duration-300'
          >
            <LogoutOutlined />
            Log Out</div>
        </div>
        <div className='flex-1 h-screen overflow-y-auto'>
          <Outlet />
        </div>
      </ReportContext.Provider>
    </div>
  }
}
