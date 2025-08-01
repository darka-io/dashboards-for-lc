import { createFileRoute } from '@tanstack/react-router'
import { Avatar, DatePicker, Select, Spin, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { formatDate } from './total_chats_report'
import dayjs from 'dayjs'
import { ReportContext } from './route'
import type { Paths } from '../../openapi'
import API from '../../api/api'
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const Route = createFileRoute('/explorer/agent_performance')({
  component: RouteComponent,
})



function RouteComponent() {

  const [filters, setFilters] = useState<Paths.DashboardReportsAgentPerformance.RequestBody>({
    from: formatDate(dayjs().subtract(7, 'day')),
    to: formatDate(dayjs()),
    groups: []
  })

  const { agents, tags, selectedGroup } = useContext(ReportContext)

  const [data, setData] = useState<Paths.DashboardReportsAgentPerformance.Responses.$200>()
  const [loading, setLoading] = useState(false)
  const getPerformanceReport = async (props: Paths.DashboardReportsAgentPerformance.RequestBody) => {
    setLoading(true)
    try {
      const client = await API()
      const { data } = await client.DashboardReportsAgentPerformance({
        app_slug: import.meta.env.VITE_APP_SLUG
      }, props)
      setData(data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!selectedGroup && selectedGroup != 0) return
    getPerformanceReport({
      from: filters.from,
      to: filters.to,
      groups: [selectedGroup]
    })
  }, [filters, selectedGroup])

  const TableItemStyle = `text-gray-600 text-[14px] w-[100px] text-center p-4 bg-gray-100 rounded-lg`
  const TableItemStyle2 = `text-gray-600 text-[14px] w-[100px] text-center p-4 bg-gray-200 rounded-lg`

  return <div className='p-4'>
    {/* TITLE */}
    <div className='text-xl font-semibold'>Agent Performance</div>
    {/* FILTERS */}
    <div className='flex flex-row gap-4 items-center py-4  '>
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
      <div className='flex flex-col gap-2 justify-start'>
        <div className=' text-gray-400 text-[14px]'>Agent:</div>
        <Select
          mode="multiple"
          style={{ width: 300 }}
          showSearch
          allowClear
          options={agents.map(a => { return { label: a.name, value: a.id } })}
          placeholder="Select Agent"
        />
      </div>
    </div>
    {/* TABLE */}
    <Spin spinning={loading}>
      <div className='flex flex-col   gap-2 min-w-[1000px] mt-6 overlow-y-auto'>
        {/* TITLE ROW */}
        <div className='flex itmes-stretch gap-4 justify-start w-full w-[100px]' >
          <div className=' text-gray-400 text-[14px] w-[300px]'>
            Agent
          </div >
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Total Chats
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Satisfaction
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            First Response
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Chating Time
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Accepting
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Efficiency
          </div>
          <div className=' text-gray-400 text-[14px] w-[100px]'>
            Chats Limit
          </div>


        </div>
        {
          agents.map(a => {
            return <div className='flex flex-row gap-4 items-center justify-start w-full'>
              {/* NAME */}
              <div className=' text-gray-400 text-[14px] w-[300px] flex flex-row gap-2 items-center'>
                <Avatar
                  size={40}
                  src={a.avatar ?? `https://api.dicebear.com/9.x/initials/svg?seed=${a.name}`} />
                <div className='flex flex-col  w-[150px]'>
                  <Typography.Text strong ellipsis>{a.name}</Typography.Text>
                  <div>
                    <Typography.Text type='secondary' ellipsis>{a.id}</Typography.Text>
                  </div>
                </div></div>
              {/* TOTAL CHATS */}
              <div className={TableItemStyle}>{data?.records[a.id]?.chats_count ?? 0}</div>
              {/* SATISFACTION */}
              <div className={TableItemStyle2}>{(Math.ceil((data?.records[a.id]?.chats_rated_good ?? 0) * 100 / (data?.records[a.id]?.chats_count ?? 1)) / 100).toFixed(2)}</div>
              {/* FIRST RESPONSE */}
              <div className={TableItemStyle}>{dayjs.duration((data?.records[a.id]?.first_response_time ?? 0)*1000).format("HH:mm:ss")}</div>
              {/* CHATTING TIME */}
              <div className={TableItemStyle2}>{dayjs.duration((data?.records[a.id]?.chatting_time ?? 0) * 1000).format("HH:mm:ss")}</div>
              {/* ACCEPTING TIME */}
              <div className={TableItemStyle}>{dayjs.duration((data?.records[a.id]?.accepting_chats_time ?? 0) * 1000).format("HH:mm:ss")}</div>
              {/* Efiiciency */}
              <div className={TableItemStyle2}>
                {(data?.records[a.id]?.accepting_chats_time && data?.records[a.id]?.chats_count) ? (Math.ceil(((data?.records[a.id]?.chats_count ?? 1) * 100)/((data?.records[a.id]?.accepting_chats_time ?? 0)/3600))/100).toFixed(2) :
                  (data?.records[a.id]?.chats_count ?? 0).toFixed(2)
                }
              </div>
              {/* Chats Limit */}
              <div className={TableItemStyle}>{a.max_chats_count}</div>
            </div>
          })
        }
      </div>
    </Spin>
  </div>
}
