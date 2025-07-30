import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { Alert, Avatar, Button, ConfigProvider, Form, Input, List, message, Modal, Select, theme } from 'antd'
import { useEffect, useState } from 'react'
import API from '../../api/api'
import stringifyError from '../../methods/stringifyError'
import type { Paths } from '../../openapi'
export const Route = createFileRoute('/administration')({
  component: RouteComponent,
})


const sessionHandler = async (token: string) => {
  const APP_DATA: {
    client_id?: string,
  } = {
    client_id: undefined
  }
  try {
    const client = await API();
    const { data: app } = await client.GetAppDetails({
      app_slug: import.meta.env.VITE_APP_SLUG
    })

    APP_DATA.client_id = app.clientID

    const { data } = await client.Authenticate({
      token,
      app_slug: import.meta.env.VITE_APP_SLUG
    })


    return {
      success: true,
      clientID: APP_DATA.client_id
    }
  } catch (error) {
    return {
      success: false,
      clientID: APP_DATA.client_id
    }
  }
}


function RouteComponent() {
  const [status, setStatus] = useState<'unauthenticated' | 'loading' | 'authenticated'>('loading')
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, contextModal] = Modal.useModal()
  const [groups, setGroups] = useState<Paths.ListGroups.Responses.$200>()
  const [newUser, setNewUser] = useState<{
    name?: string
    email?: string
    password?: string
    groups: number[]
    id?: string
  }>({ groups: [] })

  const [users, setUsers] = useState<Paths.DashboardListUsers.Responses.$200>()

  const [modalOpen, setModalOpen] = useState(false)
  const getGroups = async () => {
    try {
      const client = await API()
      const { data } = await client.listGroups({
        app_slug: import.meta.env.VITE_APP_SLUG
      })
      setGroups(data)
      const { data: users } = await client.DashboardListUsers({
        app_slug: import.meta.env.VITE_APP_SLUG
      })
      setUsers(users)
    } catch (e) {
      void messageApi.error(stringifyError(e))
    }
  }

  useEffect(() => {
    const url = window.location.href;
    const params = url.split("#")[1];
    const accessToken = params?.split("&")[0]?.split("=")[1];
    sessionHandler(decodeURIComponent(accessToken)).then(r => {
      if (r.success) {
        void messageApi.success('Authenticated')
        setStatus('authenticated')
      } else {
        window.location.href = `https://accounts.livechat.com/?response_type=token&client_id=${r.clientID
          }&redirect_uri=${encodeURIComponent(
            url.split("?")[0]
            // "https://igor.dashka.io/administration"
          )}`
      }
    })
  }, [])

  useEffect(() => {
    if (status === 'authenticated')
      getGroups()
  }, [status])

  const searchParams = useSearch({
    from: '/administration'
  }) as {
    theme?: "dark"|"light"
  }
  const LC_THEME = searchParams.theme

  const [form] = Form.useForm();
  if (status === "loading") return <div
    className='h-screen flex justify-center items-center animate-pulse'
  >Loading</div>
  return <div className={LC_THEME === "dark" ? "bg-[#141414] text-white w-full h-screen" : ""}>
    <ConfigProvider
      theme={{
        
        token:{
          colorPrimary: "#0066ff",
                
        },
        algorithm: LC_THEME === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm 
      }}
    >
      {contextHolder}
      {contextModal}
      <Modal title="Create New User" open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={async () => {
          try {
            if (!newUser.name || !newUser.email || (!newUser.password && !newUser.id)) {
              void messageApi.error('Please enter name, email and password')
              return
            }
            const client = await API()
            await client.DashboardReportsUpsertUser({
              app_slug: import.meta.env.VITE_APP_SLUG
            }, {
              name: newUser.name,
              email: newUser.email,
              password: newUser.password,
              groups: newUser.groups,
              id: newUser.id
            })
            setModalOpen(false)
            getGroups()
          } catch (e) {
            void messageApi.error(stringifyError(e))
          }
        }}
      >
        <Form
          form={form}
          onValuesChange={(_, v) => setNewUser(v as any)} layout='vertical'>
          <Form.Item name={'id'} label='ID' hidden>
            <Input placeholder='ID' />
          </Form.Item>
          <Form.Item name={'name'} label='Name'>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item name={'email'} label='Email'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item name={'password'} label='Password'>
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item name={'groups'} >
            <Select
              showSearch
              mode='multiple'
              placeholder="Select Groups"
              options={groups?.map(g => ({ label: g.name, value: g.id }))}
            />
          </Form.Item>
        </Form>

      </Modal>

      <div className='p-2 pl-6 pb-6 flex flex-col gap-2 h-screen'>
        {/* <div className='text-2xl font-semibold border-b border-gray-200 pb-2'>Dashboards for LiveChat</div> */}
        <div className='text-lg font-semibold mx-2'>User Management</div>
        <div className='w-[500px] flex flex-row gap-2 items-center'>
          <div className='flex-1'><Input.Search placeholder='Search' /></div>
          <Button
            style={{ fontWeight: 600 }}
            type='primary'
            onClick={() => setModalOpen(true)}
            icon={<PlusOutlined />}>Add New User</Button>
        </div>
        <div className='flex-1 w-[500px]'>
          <List
            dataSource={users}
            renderItem={(user) => (
              <List.Item
                // extra={<Dropdown
                //   trigger={['click']}
                //   menu={{
                //     items: [
                //       {
                //         key: '0',
                //         label: 'Edit',
                //         icon: <EditOutlined />,
                //         onClick: () => {
                //           setModalOpen(true)
                //           setNewUser({
                //             id: user.id ?? "",
                //             name: user.name ?? "",
                //             email: user.email ?? "",
                //             groups: user.groups ?? []
                //           })
                //           form.setFieldsValue({
                //             id: user.id ?? "",
                //             name: user.name ?? "",
                //             email: user.email ?? "",
                //             groups: user.groups ?? []
                //           })
                //         }
                //       },
                //       {
                //         key: '1',
                //         label: 'Delete',
                //         icon: <DeleteOutlined />,
                //         onClick: async () => {
                //           try {
                //             const client = await API()
                //             await client.DashboardReportsDeleteUser({
                //               app_slug: import.meta.env.VITE_APP_SLUG
                //             }, {
                //               id: user.id ?? ""
                //             })
                //             getGroups()
                //           } catch (e) {
                //             void messageApi.error(stringifyError(e))
                //           }
                //         }
                //       },
                //     ]
                //   }}
                // ><Button
                //     type="text"
                //     icon={<EllipsisOutlined style={{ transform: 'rotate(90deg)' }} />}
                //   /></Dropdown>}

                extra={
                  <div className='flex flex-row gap-2 items-center'>
                    <Button
                      style={{ fontWeight: 600 }}
                      type='text'
                      icon={<EditOutlined />}
                      onClick={() => {
                        setModalOpen(true)
                        setNewUser({
                          id: user.id ?? "",
                          name: user.name ?? "",
                          email: user.email ?? "",
                          groups: user.groups ?? []
                        })
                        form.setFieldsValue({
                          id: user.id ?? "",
                          name: user.name ?? "",
                          email: user.email ?? "",
                          groups: user.groups ?? []
                        })
                      }}
                    />
                    <Button
                      style={{ fontWeight: 700 }}
                      danger
                      type='text'
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        modal.confirm({
                          onCancel: () => { },
                          title: 'Delete User',
                          onOk: async () => {
                            try {
                              const client = await API()
                              await client.DashboardReportsDeleteUser({
                                app_slug: import.meta.env.VITE_APP_SLUG
                              }, {
                                id: user.id ?? ""
                              })
                              getGroups()
                            } catch (e) {
                              void messageApi.error(stringifyError(e))
                            }
                          },
                          content: 'Are you sure you want to delete this user?',
                          icon: <></>
                        })
                      }}
                    />

                  </div>
                }
              >
                <List.Item.Meta
                  avatar={<Avatar shape='square' size={48} src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name ?? "Unknown Visitor"}`} />}
                  title={user.name}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </div>
        <div className='w-[500px] flex flex-col gap-2'>
          <div className='text-lg font-semibold'>White Label Configuration</div>
          <Alert type='info'
            message="This feature allows to access the reporting UI via a custom domain. It currently costs $1200/year. Please contact support@darka.io for more information."
          />
          <Input placeholder='Domain' />
          <Input placeholder='Logo URL' />
          <Button
            style={{ fontWeight: 600 }}
            type='primary'>Save</Button>
        </div>
      </div>


    </ConfigProvider>
  </div>
}
