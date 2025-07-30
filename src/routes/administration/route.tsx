import { createFileRoute } from '@tanstack/react-router'
import { Alert, Button, Form, Input, List, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import API from '../../api/api'
import processError from '../../methods/processError'
import { PlusOutlined } from '@ant-design/icons'
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
  const [groups, setGroups] = useState<Paths.ListGroups.Responses.$200>()
  const [newUser, setNewUser] = useState<{
    name?: string
    email?: string
    password?: string
    groups: number[]
  }>({ groups: [] })

  const [modalOpen, setModalOpen] = useState(false)
  const getGroups = async () => {
    try {
      const client = await API()
      const { data } = await client.listGroups({
        app_slug: import.meta.env.VITE_APP_SLUG
      })
      setGroups(data)
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
            url
          )}`
      }
    })
  }, [])

  useEffect(() => {
    if (status === 'authenticated')
      getGroups()
  }, [status])

  if (status === "loading") return <div
    className='h-screen flex justify-center items-center animate-pulse'
  >Loading</div>
  return <div>
    {contextHolder}
    <Modal title="Create New User" open={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={async () => {
        try {
          if(!newUser.name || !newUser.email || !newUser.password) {
            void messageApi.error('Please enter name, email and password')
            return
          }
          const client = await API()
          await client.DashboardCreateUser({
            app_slug: import.meta.env.VITE_APP_SLUG
          }, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            groups: newUser.groups
          })
          setModalOpen(false)
        } catch (e) {
          void messageApi.error(stringifyError(e))
        }
      }}
    >
      <Form onValuesChange={(_,v) => setNewUser(v as any)} layout='vertical'>
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

    <div className='p-2 flex flex-col gap-2'>
      <div className='text-2xl font-semibold'>Dashboard for LiveChat</div>
      <div className='text-xl font-normal'>User Management</div>
      <div className='w-[500px] flex flex-row gap-2 items-center'>
        <div className='flex-1'><Input.Search placeholder='Search' /></div>
        <Button
          onClick={() => setModalOpen(true)}
          icon={<PlusOutlined />}>Add New User</Button>
      </div>
      <List />
    </div>

  </div>
}
