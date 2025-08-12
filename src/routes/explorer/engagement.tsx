import { createFileRoute } from "@tanstack/react-router";
import { DatePicker, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import API from "../../api/api";
import type { Paths } from "../../openapi";
import { ReportContext } from "./route";
import { formatDate } from "./total_chats_report";

export const Route = createFileRoute("/explorer/engagement")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] =
    useState<Paths.DashboardReportsChatEngagement.Responses.$200>();
  const [loading, setLoading] = useState(false);
  const { selectedGroup, agents, tags, groups, userFilters } =
    useContext(ReportContext);
  const getTotalChats = async (
    props: Paths.DashboardReportsTotalChats.RequestBody
  ) => {
    setLoading(true);
    try {
      const client = await API();
      const { data } = await client.DashboardReportsChatEngagement(
        {
          app_slug: import.meta.env.VITE_APP_SLUG,
        },
        props
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const [filters, setFilters] =
    useState<Paths.DashboardReportsTotalChats.RequestBody>({
      groups: selectedGroup ? [selectedGroup] : undefined,
      from: formatDate(dayjs().subtract(7, "day")),
      to: formatDate(dayjs()),
      distribution: "day",
    });

  useEffect(() => {
    if (!selectedGroup && selectedGroup !== 0) return;

    getTotalChats({
      ...filters,
      groups: filters.groups?.length ? filters.groups : [selectedGroup],
      agents: filters.agents?.length ? filters.agents : undefined,
      tags: filters.tags?.length ? filters.tags : undefined,
    });
  }, [selectedGroup, filters]);

  return (
    <div className="flex flex-col w-full p-4 max-w-[1200px]">
      <div className="w-full border-b border-gray-200 mb-4">
        <div className="p-4 text-lg font-semibold">Chats Engagement Report</div>
      </div>
      {/* FILTERS */}
      <div className="flex flex-row gap-4 items-center px-4 ">
        {/* GROUPS */}
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">Groups</div>

          <Select
            options={groups.map((a) => ({ label: a.name, value: a.id }))}
            placeholder="Groups"
            mode="multiple"
            value={
              filters.groups?.length
                ? filters.groups
                : selectedGroup
                  ? [selectedGroup]
                  : []
            }
            style={{ width: 200 }}
            onChange={(val) =>
              setFilters({ ...filters, groups: val.length ? val : undefined })
            }
            allowClear
            maxTagCount={3}
          />
        </div>
        {/* DATE RANGE */}
        <div className="flex flex-col gap-2 justify-start">
          <div className=" text-gray-400 text-[14px]">Date Range:</div>
          <DatePicker.RangePicker
            style={{ width: 300 }}
            disabledDate={(d) => !d || d.isAfter(dayjs())}
            onChange={(dates, dateStrings) => {
              if (dateStrings) {
                setFilters({
                  ...filters,
                  from: dateStrings[0]
                    ? formatDate(dayjs(dateStrings[0]))
                    : formatDate(dayjs().subtract(7, "day")),
                  to: dateStrings[1]
                    ? formatDate(dayjs(dateStrings[1]))
                    : formatDate(dayjs()),
                });
              }
            }}
            value={
              filters.from && filters.to
                ? [dayjs(filters.from), dayjs(filters.to)]
                : undefined
            }
          />
        </div>
        {/* AGENTS */}
        <div className="flex flex-col gap-2 justify-start">
          <div className=" text-gray-400 text-[14px]">Agents:</div>
          <Select
            style={{ width: 300 }}
            mode="multiple"
            options={agents.map((a) => ({ label: a.name, value: a.id }))}
            placeholder="Agents"
            onChange={(agents) => {
              setFilters({
                ...filters,
                agents,
              });
            }}
            maxTagCount={3}
            value={filters.agents?.length ? filters.agents : []}
            allowClear
          />
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <div className=" text-gray-400 text-[14px]">Tags:</div>
          {/* TAGS */}
          <Select
            style={{ width: 300 }}
            mode="multiple"
            options={tags.map((t) => ({ label: t.name, value: t.name }))}
            placeholder="Tags"
            onChange={(tags) => {
              setFilters({
                ...filters,
                tags,
              });
            }}
            maxTagCount={3}
            value={filters.tags?.length ? filters.tags : []}
            allowClear
          />
        </div>

        <div className="flex flex-col gap-2 justify-start">
          <div className=" text-gray-400 text-[14px]">Saved Filters:</div>
          {/* SAVED FILTERS */}
          <Select
            options={
              userFilters?.length
                ? userFilters.map((f) => ({ label: f.name, value: f.id }))
                : []
            }
            placeholder="Saved Filters"
            style={{ width: 200 }}
            onChange={(val) => {
              const selectedFilters = userFilters?.find((f) => f.id === val);
              if (selectedFilters) {
                setFilters({
                  ...filters,
                  agents: selectedFilters.agents,
                  tags: selectedFilters.tags,
                  groups: selectedFilters.groups,
                  from:
                    selectedFilters.lastDates === "LAST_7_DAYS"
                      ? dayjs().subtract(7, "day").format("YYYY-MM-DD")
                      : selectedFilters.lastDates === "LAST_30_DAYS"
                        ? dayjs().subtract(30, "day").format("YYYY-MM-DD")
                        : selectedFilters.from
                          ? selectedFilters.from
                          : undefined,
                  to: selectedFilters.lastDates
                    ? dayjs().format("YYYY-MM-DD")
                    : selectedFilters.to
                      ? selectedFilters.to
                      : undefined,
                });
              }
            }}
            allowClear
            onClear={() => {
              setFilters({});
            }}
          />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className="p-4 w-full ">
          {/* {
              JSON.stringify(data)
          } */}
          <Chart
            width={"100%"}
            type={
              dayjs(filters.to).diff(dayjs(filters.from), "day") > 7
                ? "bar"
                : "bar"
            }
            series={[
              {
                name: "Started by Agent",
                // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                data: Object.keys(data?.records ?? {}).map((k) => ({
                  x: dayjs(k).toDate().getTime(),
                  y: data?.records?.[k].started_by_agent ?? 0,
                })),
              },
              {
                name: "Started by Customer",
                // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                data: Object.keys(data?.records ?? {}).map((k) => ({
                  x: dayjs(k).toDate().getTime(),
                  y: data?.records?.[k].started_by_customer_from_greeting ?? 0,
                })),
              },
              {
                name: "Started by Customer Without Greeting",
                // data: Object.keys(data?.records ?? {}).map(k => data?.records?.[k].total ?? 0)
                data: Object.keys(data?.records ?? {}).map((k) => ({
                  x: dayjs(k).toDate().getTime(),
                  y:
                    data?.records?.[k].started_by_customer_without_greeting ??
                    0,
                })),
              },
            ]}
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
              },
              title: {
                text: `Total Chats: ${data?.total ?? 0}`,
              },
              dataLabels: {
                enabled: false,
              },
              tooltip: {
                enabled: true,
              },
              markers: {
                size: 6,
                showNullDataPoints: true,
              },
              stroke: {
                width: 2,
                // colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100],
                  },
                },
                curve: "straight",
              },
              xaxis: {
                // categories: Object.keys(data?.records ?? {})
                type: "datetime",
              },
              yaxis: {
                forceNiceScale: true,
                labels: {
                  formatter: (value) => {
                    return value.toFixed(0);
                  },
                },
              },
            }}
          />
        </div>
        {/* <div className='p-4 text-lg font-semibold mt-4'>
        Chat Engagement Breakpoint
      </div>
      <Table
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
        columns={
          [
            ...Object.keys(data?.records ?? {}).map(k => ({
              title: k,
              dataIndex: k
            })),
            {
              title: "Total Chats",
              dataIndex: "total",
              render: (total: number) => {
                return total
              }
            }
          ]
        } dataSource={
          [
            {
              ...Object.fromEntries(Object.keys(data?.records ?? {}).map(k => [k, data?.records?.[k].started_by_agent ?? 0])),
              total: data?.total
            }
          ]

        }

      /> */}
      </Spin>
    </div>
  );
}
