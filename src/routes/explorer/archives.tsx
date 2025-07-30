import { createFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import type { Paths } from '../../openapi'
import API from '../../api/api'
import { ReportContext } from './route'
import { Alert, Avatar, Button, DatePicker, Input, Select, Spin, Typography } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export const Route = createFileRoute('/explorer/archives')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState<Paths.DashboardListArchives.Responses.$200>()
    const [loading, setLoading] = useState(false)
    const [selectedChat, setSelectedChat] = useState<Paths.DashboardListArchives.Responses.$200['chats'][0]>()
    const [filters, setFilters] = useState<Paths.DashboardListArchives.RequestBody>({

    })
    const { selectedGroup } = useContext(ReportContext)
    const getChats = async (props: Paths.DashboardListArchives.RequestBody) => {
        setLoading(true)
        try {
            const client = await API()
            const { data } = await client.DashboardListArchives({
                app_slug: import.meta.env.VITE_APP_SLUG
            }, props)
            setData({ ...data })
            if (!selectedChat) setSelectedChat(data.chats.at(0))
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (!selectedGroup && selectedGroup !== 0) return
        getChats({ ...filters, group_ids: [selectedGroup] })
    }, [selectedGroup, filters])
    return <div className='flex h-screen flex-row'>
        <div className='w-[350px] h-screen border-r border-gray-200 flex flex-col'>
            <div className='p-4 text-lg font-semibold border-b border-gray-200'>Chat Archives</div>
            <div className='flex-1 overflow-y-scroll flex flex-col'>
                {
                    loading && <div className='flex justify-center items-center h-full'>
                        <Spin />
                    </div>
                }
                {
                    (!loading && data?.found_chats == 0) && <div className='p-2 mt-4 text-center text-gray-500 text-sm font-semibold'>No chats found</div>
                }
                {
                    !loading && data?.found_chats ? <div className='mx-4 my-2 text-sm text-gray-500 bor'>
                        Found {data.found_chats} chat(s)
                    </div> : null
                }
                {
                    (!loading && data?.found_chats) ? data?.chats.map(chat => {
                        const customer = chat.users.find(u => u.type === "customer")
                        const lastMessage = chat.thread.events.filter(e => e.type === "message").at(-1)
                        return <div key={chat.id} className={`p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${selectedChat?.thread.id === chat.thread.id ? "bg-gray-100" : ""}`} onClick={() => setSelectedChat(chat)}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${customer?.name ?? "Unknown Visitor"}`} size={36} />
                                    <div className='flex flex-col gap-1 flex-1'>
                                        <div>{customer?.name ?? "Unknown Visitor"}</div>
                                        <div className='w-[200px] '>
                                            <Typography.Text ellipsis italic>
                                                {lastMessage?.text ?? ""}
                                            </Typography.Text>
                                        </div>
                                        <div className='text-xs text-gray-500'>
                                            {lastMessage?.created_at ?
                                                dayjs(lastMessage.created_at).format("DD MMM, YY HH:mm")
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : null
                }

            </div>
           
            <div className='p-2 justify-between w-full flex'>
                <Button
                    onClick={() => getChats({ page_id: data?.previous_page_id })}
                    disabled={!data?.previous_page_id} icon={<ArrowLeftOutlined />}>Previous Page</Button>
                <Button
                    onClick={() => getChats({ page_id: data?.next_page_id })}
                    disabled={!data?.next_page_id} icon={<ArrowRightOutlined />}>Next Page</Button>
            </div>
        </div>
        <div className='flex-1 flex flex-col'>

            {/* FILTERS */}
            <div className='p-4 border-b border-gray-200 flex gap-4 flex flex-wrap items-center'>
                {/* QUERY */}
                <div>
                    <div
                        className='text-sm font-semibold text-gray-500 mb-2'
                    >Query</div>
                    <Input.Search
                        allowClear
                        onSearch={(val) => setFilters({ ...filters, query: val })}
                        style={{ width: 200 }} placeholder="Search" />
                </div>
                {/* RANGE PICKER */}
                <div>
                    <div
                        className='text-sm font-semibold text-gray-500 mb-2'
                    >Date Range</div>
                    <DatePicker.RangePicker
                        allowClear
                        onChange={(val) => setFilters({ ...filters, from: val?.[0]?.format("YYYY-MM-DD"), to: val?.[1]?.format("YYYY-MM-DD") })}
                    />
                </div>
                <div>
                    <div
                        className='text-sm font-semibold text-gray-500 mb-2'
                    >Agents</div>

                    <Select options={[]} placeholder="Agents" style={{ width: 200 }} />
                </div>
                <div>
                    <div
                        className='text-sm font-semibold text-gray-500 mb-2'
                    >Groups</div>

                    <Select options={[]} placeholder="Tags" style={{ width: 200 }} />
                </div>
                <div >
                    <div
                        className='text-sm font-semibold text-gray-500 mb-2'
                    >Rating</div>

                    <Select options={[]} placeholder="Ratings" style={{ width: 200 }} />
                </div>
            </div>
            {/* SELECTED CHAT */}
            <div className='flex-1 overflow-y-scroll flex flex-col w-full items-center justify-start px-6 pb-6 pt-4'>
                {

                    selectedChat && selectedChat.thread.events
                        .filter(e => e.type === "message" || e.type === "system_message")
                        .map(e => {
                            let author = selectedChat.users.find(u => u.id === e.author_id)?.name
                            if (!author) author = "system"
                            // const findAuthor = (id: string) => {
                            //     const author = selectedChat.users.find(u => u.id === id)
                            //     return author
                            // }
                            if (author === "system") return <div
                                className='font-italic text-gray-500 mx-auto my-2 px-6'
                            >{e.text}</div>
                            else if (e.author_id?.includes("@") || !e.author_id?.includes("-")) return <div key={e.id} className='p-4 w-full flex flex-row gap-2'>
                                <div className='flex flex-col gap-1 bg-gray-100 rounded-lg p-2 ml-auto'>
                                    <div className='font-semibold'>{author}</div>
                                    <div className='w-[400px] '>
                                        <Typography.Text italic>
                                            {e.text ?? e.type}
                                        </Typography.Text>
                                    </div>
                                    <div className='text-xs text-gray-500'>
                                        {e.created_at ?
                                            dayjs(e.created_at).format("DD MMM, YY HH:mm")
                                            : ""}
                                    </div>
                                </div>
                                <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${author ?? "Unknown Visitor"}`} size={36} />
                            </div>
                            else return <div key={e.id} className='p-4 w-full flex flex-row gap-2'>
                                {/* <div className='flex items-center gap-2'> */}
                                <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${author ?? "Unknown Visitor"}`} size={36} />
                                <div className='flex flex-col gap-1 bg-gray-100 rounded-lg p-2 '>
                                    <div className='font-semibold'>{author}</div>
                                    <div className='w-[400px] '>
                                        <Typography.Text italic>
                                            {e.text ?? e.type}
                                        </Typography.Text>
                                    </div>
                                    <div className='text-xs text-gray-500'>
                                        {e.created_at ?
                                            dayjs(e.created_at).format("DD MMM, YY HH:mm")
                                            : ""}
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        })
                }
            </div>
        </div>


    </div>
}
