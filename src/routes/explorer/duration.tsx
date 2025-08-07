import { createFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import type { Paths } from '../../openapi'
import { ReportContext } from './route'
import API from '../../api/api'
import { formatDate } from './total_chats_report'
import dayjs from 'dayjs'
import { DatePicker, Select, Spin } from 'antd'
import Chart from "react-apexcharts"

export const Route = createFileRoute('/explorer/duration')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState<Paths.DashboardReportsChatDuration.Responses.$200>()
    const [loading, setLoading] = useState(false)
    const { selectedGroup, agents, tags, groups } = useContext(ReportContext)
    const getTotalChats = async (props: Paths.DashboardReportsChatDuration.RequestBody) => {
        setLoading(true)
        try {
            const client = await API()
            const { data } = await client.DashboardReportsChatDuration({
                app_slug: import.meta.env.VITE_APP_SLUG
            }, props)
            setData(data)

        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const [filters, setFilters] = useState<Paths.DashboardReportsChatDuration.RequestBody>({
        groups: selectedGroup ? [selectedGroup] : undefined,
        from: formatDate(dayjs().subtract(7, 'day')),
        to: formatDate(dayjs()),
        distribution: "day"
    })

    useEffect(() => {
        if (!selectedGroup && selectedGroup !== 0) return

        getTotalChats({
            ...filters,
            groups: filters.groups?.length ? filters.groups : [selectedGroup],
            agents: filters.agents?.length ? filters.agents : undefined,
            tags: filters.tags?.length ? filters.tags : undefined
        })
    }, [selectedGroup, filters])


    return <div className='flex flex-col w-full p-4 max-w-[1200px]'>
        <div className='w-full border-b border-gray-200 mb-4'>
            <div className='p-4 text-lg font-semibold'>Chat Duration Report</div>
        </div>
        {/* FILTERS */}
        <div className='flex flex-row gap-4 items-center px-4 '>
            {/* GROUPS */}
            <div>
                <div className="text-sm font-semibold text-gray-500 mb-2">
                    Groups
                </div>

                <Select
                    options={groups.map((a) => ({ label: a.name, value: a.id }))}
                    placeholder="Groups"
                    mode="multiple"
                    style={{ width: 200 }}
                    value={filters.groups?.length ? filters.groups : (selectedGroup ? [selectedGroup]: [])}
                    onChange={(val) => setFilters({ ...filters, groups: val.length ? val : undefined })}
                    allowClear
                />
            </div>
            {/* DATE RANGE */}
            <div className='flex flex-col gap-2 justify-start'>
                <div className=' text-gray-400 text-[14px]'>Date Range:</div>
                <DatePicker.RangePicker style={{ width: 300 }}
                    disabledDate={(d) => !d || d.isAfter(dayjs())}

                    onChange={(dates, dateStrings) => {
                        if (dateStrings) {

                            setFilters({
                                ...filters,
                                from: dateStrings[0] ? formatDate(dayjs(dateStrings[0])) : formatDate(dayjs().subtract(7, 'day')),
                                to: dateStrings[1] ? formatDate(dayjs(dateStrings[1])) : formatDate(dayjs()),
                            })
                        }
                    }}
                />
            </div>
            {/* AGENTS */}
            <div className='flex flex-col gap-2 justify-start'>
                <div className=' text-gray-400 text-[14px]'>Agents:</div>
                <Select
                    style={{ width: 300 }}
                    mode="multiple"
                    options={agents.map(a => ({ label: a.name, value: a.id }))}
                    placeholder="Agents"
                    onChange={(agents) => {
                        setFilters({
                            ...filters,
                            agents
                        })
                    }}

                />
            </div>
            <div className='flex flex-col gap-2 justify-start'>
                <div className=' text-gray-400 text-[14px]'>Tags:</div>
                {/* TAGS */}
                <Select
                    style={{ width: 300 }}
                    mode="multiple"
                    options={tags
                        .map(t => ({ label: t.name, value: t.name }))}
                    placeholder="Tags"
                    onChange={(tags) => {
                        setFilters({
                            ...filters,
                            tags
                        })
                    }}
                />
            </div>

        </div>
        <Spin spinning={loading}>
            <div className='p-4 w-full '>

                {/* {
              JSON.stringify(data)
          } */}
                <Chart
                    width={"100%"}
                    type={
                        "bar"
                    }

                    series={[
                        {
                            name: "Chat Duration",
                            // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                            data: Object.keys(data?.records ?? {}).map(k => ({
                                x: dayjs(k).toDate().getTime(),
                                y: Math.ceil(((data?.records?.[k].duration ?? 0) / 60) * 100) / 100
                            }))
                        },
                        {
                            name: "Agent Chatting Duration",
                            // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                            data: Object.keys(data?.records ?? {}).map(k => ({
                                x: dayjs(k).toDate().getTime(),
                                y: Math.ceil(((data?.records?.[k].agents_chatting_duration ?? 0) / 60) * 100) / 100
                            }))
                        }
                    ]}
                    options={{
                        chart: {
                            zoom: {
                                enabled: false
                            }
                        },
                        title: {
                            // text: `Total Chats: ${data?.total ?? 0}`,
                        },
                        dataLabels: {
                            enabled: false,

                        },
                        tooltip: {
                            enabled: true
                        },
                        markers: {
                            size: 6,
                            showNullDataPoints: true
                        },
                        stroke: {
                            width: 2,
                            // colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    shadeIntensity: 1,
                                    opacityFrom: 0.7,
                                    opacityTo: 0.9,
                                    stops: [0, 90, 100]
                                }
                            },
                            curve: "straight"
                        },
                        xaxis: {
                            // categories: Object.keys(data?.records ?? {})
                            type: 'datetime'
                        },
                        yaxis: {
                            forceNiceScale: true,
                            labels: {
                                formatter: (value) => {
                                    return `${value} min`
                                }
                            }
                        }
                    }}
                />
            </div>
        </Spin>
    </div>
}
