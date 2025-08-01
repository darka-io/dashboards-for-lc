import { createFileRoute } from '@tanstack/react-router'
import { DatePicker, Select, Spin } from 'antd'
import { formatDate } from './total_chats_report'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import type { Paths } from '../../openapi'
import { ReportContext } from './route'
import API from '../../api/api'
import Chart from 'react-apexcharts'

export const Route = createFileRoute('/explorer/tags_usage')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState<Paths.DashboardReportsTagsUsage.Responses.$200>()
    const [dataWithoutTags, setDataWithoutTags] = useState<Paths.DashboardReportsTagsUsage.Responses.$200>()
    const [loading, setLoading] = useState(false)
    const { selectedGroup, agents, tags } = useContext(ReportContext)
    const getTotalChats = async (props: Paths.DashboardReportsTagsUsage.RequestBody) => {
        setLoading(true)
        try {
            const client = await API()
            const { data } = await client.DashboardReportsTagsUsage({
                app_slug: import.meta.env.VITE_APP_SLUG
            }, {
                ...props,
                tags: {
                    exists: true
                }
            })
            setData(data)
            const { data: dataWithoutTags } = await client.DashboardReportsTagsUsage({
                app_slug: import.meta.env.VITE_APP_SLUG
            }, {
                ...props,
                tags: {
                    exists: false
                }
            })
            setDataWithoutTags(dataWithoutTags)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const [filters, setFilters] = useState<Paths.DashboardReportsTagsUsage.RequestBody>({
        groups: selectedGroup ? [selectedGroup] : undefined,
        from: formatDate(dayjs().subtract(7, 'day')),
        to: formatDate(dayjs()),
        distribution: "day"
    })

    useEffect(() => {
        if (!selectedGroup && selectedGroup !== 0) return

        getTotalChats({
            ...filters,
            groups: [selectedGroup],
            agents: filters.agents?.length ? filters.agents : undefined,
            tags: filters.tags ? filters.tags : undefined
        })
    }, [selectedGroup, filters])


    return <div className='flex flex-col w-full p-4 max-w-[1200px]'>
        <div className='w-full border-b border-gray-200 mb-4'>
            <div className='p-4 text-lg font-semibold'>Tags Usage Report</div>
        </div>
        {/* FILTERS */}
        <div className='flex flex-row gap-4 items-center px-4 '>
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
                        "line"
                    }

                    series={[
                        {
                            name: "Chats Tagged",
                            // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                            data: Object.keys(data?.records ?? {}).map(k => ({
                                x: dayjs(k).toDate().getTime(),
                                y: data?.records?.[k]?.total ?? 0
                            }))
                        },
                        {
                            name: "Chats Not Tagged",
                            // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                            data: Object.keys(data?.records ?? {}).map(k => ({
                                x: dayjs(k).toDate().getTime(),
                                y: dataWithoutTags?.records?.[k]?.total ?? 0
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
                            text: `Total Chats: ${data?.total ?? 0}`,
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
                                    return value.toFixed(0)
                                }
                            }
                        }
                    }}
                />
            </div>
        </Spin>
    </div>
}
