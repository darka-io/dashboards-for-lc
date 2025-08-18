import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { ReportContext } from "./route";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { Paths } from "../../openapi";
import API from "../../api/api";
import stringifyError from "../../methods/stringifyError";
import dayjs from "dayjs";

export const Route = createFileRoute("/explorer/filters_manager")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const { agents, tags, groups, userFilters } = useContext(ReportContext);
  const [currentUserFilters, setCurrentUserFilters] = useState<
    Paths.DashboardListUserFilters.Responses.$200 | undefined
  >(userFilters);

  useEffect(() => {
    setCurrentUserFilters(userFilters);
  }, [userFilters]);

  const isTableLoading = !agents?.length || !tags?.length || !groups?.length;
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, contextModal] = Modal.useModal();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedSet, setSelectedSet] = useState<
    Paths.DashboardListUserFilters.Responses.$200[number]
  >({});
  const [newSet, setNewSet] = useState<{
    name?: string;
    lastDate?: "LAST_7_DAYS" | "LAST_30_DAYS";
    from?: string;
    to?: string;
    agents?: string[];
    tags?: string[];
    groups?: number[];
    rating?: number;
    tagsMode?: "ALL" | "ANY" | "EXCLUDE";
  }>({});
  const [dateMode, setDateMode] = useState<"fromTo" | "lastDates" | undefined>(
    undefined
  );
  const [buttonLoadingID, setButtonLoadingID] = useState<string | undefined>();

  const fetchUserFilters = async () => {
    setLoading(true);
    try {
      const client = await API();
      const { data: filters } = await client.DashboardListUserFilters({
        app_slug: import.meta.env.VITE_APP_SLUG,
      });
      setCurrentUserFilters(filters);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSet && modalOpen) {
      form.setFieldsValue({
        ...selectedSet,
        from: selectedSet.from ? dayjs(selectedSet.from) : null,
        to: selectedSet.to ? dayjs(selectedSet.to) : null,
      });
    } else {
      form.resetFields();
    }
  }, [selectedSet, modalOpen, form]);

  return (
    <div className="flex flex-col w-full p-4 max-w-[1200px]">
      {contextHolder}
      {contextModal}
      <Modal
        title={selectedSet.id ? "Edit filter" : "Add New Set of Filters"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setSelectedSet({});
          setDateMode(undefined);
        }}
        okText={selectedSet.id ? "Save" : "Add"}
        onOk={async () => {
          setLoading(true);
          try {
            if (!newSet.name) {
              void messageApi.error("Name is required");
              return;
            }
            const client = await API();
            await client.DashboardUpsertUserFilter(
              {
                app_slug: import.meta.env.VITE_APP_SLUG,
              },
              {
                ...newSet,
              }
            );
            setModalOpen(false);
          } catch (e) {
            void messageApi.error(stringifyError(e));
          } finally {
            fetchUserFilters();
            setLoading(false);
          }
        }}
      >
        <Form
          form={form}
          onValuesChange={(_, v) => setNewSet(v as any)}
          layout="vertical"
        >
          <Form.Item name={"id"} label="ID" hidden>
            <Input placeholder="ID" />
          </Form.Item>
          <Form.Item name={"name"} label="Name">
            <Input placeholder="Name" />
          </Form.Item>

          <div className="flex gap-2 flex-col">
            <div className="flex-row">Time filter type</div>
            <div className="flex-row mb-2">
              <Select
                showSearch
                placeholder="Select date filter"
                options={[
                  { label: "Last X Days", value: "lastDates" },
                  { label: "From - To", value: "fromTo" },
                ]}
                allowClear
                onClear={() => setDateMode(undefined)}
                onSelect={(val) => {
                  if (val === "fromTo") {
                    setDateMode("fromTo");
                  } else if (val === "lastDates") {
                    setDateMode("lastDates");
                  } else {
                    setDateMode(undefined);
                  }
                }}
              />
            </div>
          </div>

          <Form.Item name={"from"} label="From" hidden={dateMode !== "fromTo"}>
            <DatePicker
              disabled={dateMode != "fromTo"}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              allowClear
              onChange={(v) => {
                if (v) setDateMode("fromTo");
                else setDateMode("lastDates");
              }}
            />
          </Form.Item>
          <Form.Item name={"to"} label="To" hidden={dateMode !== "fromTo"}>
            <DatePicker
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              disabled={dateMode != "fromTo"}
              allowClear
              onChange={(v) => {
                if (v) setDateMode("fromTo");
                else setDateMode("lastDates");
              }}
            />
          </Form.Item>

          <Form.Item
            name={"lastDates"}
            label="Last X Days"
            hidden={dateMode !== "lastDates"}
          >
            <Select
              showSearch
              placeholder="Select last X days"
              options={[
                { label: "Last 7 days", value: "LAST_7_DAYS" },
                { label: "Last 30 days", value: "LAST_30_DAYS" },
              ]}
            />
          </Form.Item>

          <Form.Item name={"groups"} label="Groups">
            <Select
              showSearch
              mode="multiple"
              placeholder="Select Groups"
              options={groups?.map((g) => ({ label: g.name, value: g.id }))}
            />
          </Form.Item>
          <Form.Item name={"agents"} label="Agents">
            <Select
              showSearch
              mode="multiple"
              placeholder="Select Agents"
              options={agents?.map((a) => ({ label: a.name, value: a.id }))}
            />
          </Form.Item>
          <Form.Item name={"tags"} label="Tags">
            <Select
              showSearch
              mode="multiple"
              placeholder="Select Tags"
              options={tags?.map((t) => ({ label: t.name, value: t.name }))}
            />
          </Form.Item>
          <Form.Item name={"tagsMode"} label="Tags Mode">
            <Select
              showSearch
              placeholder="Select Tags Mode"
              options={[
                { label: "Match All", value: "ALL" },
                { label: "Match Any", value: "ANY" },
                { label: "Exclude", value: "EXCLUDE" },
              ]}
            />
          </Form.Item>
          <Form.Item name={"rating"} label="Rating">
            <Select
              showSearch
              placeholder="Select rating"
              options={[
                { label: "Bad", value: 0 },
                { label: "Good", value: 1 },
              ]}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>

      <div className="w-full border-b border-gray-200 mb-4 flex">
        <div className="p-4 text-lg font-semibold">Filters Manager</div>
      </div>
      <div className="flex justify-end mb-4">
        <Button
          style={{ fontWeight: 600 }}
          type="primary"
          onClick={() => {
            setModalOpen(true);
          }}
          icon={<PlusOutlined />}
        >
          Add New Filters Set
        </Button>
      </div>
      <div className="flex gap-4">
        <Table
          loading={isTableLoading || loading}
          pagination={false}
          className="mt-4 flex-1"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Time Filter",
              render: (_, record) => {
                if (record.lastDates) {
                  return "Last " + record.lastDates;
                } else if (record.from && record.to) {
                  return (
                    dayjs(record.from).format("YYYY-MM-DD") +
                    " - " +
                    dayjs(record.to).format("YYYY-MM-DD")
                  );
                } else {
                  return "-";
                }
              },
            },
            {
              title: "Groups",
              render: (_, record) => {
                if (record.groups?.length === 0) {
                  return "-";
                }
                return record.groups
                  ?.map((g) => groups?.find((g2) => g2.id === g)?.name)
                  .join(", ");
              },
            },
            {
              title: "Agents",
              render: (_, record) => {
                if (record.agents?.length === 0) {
                  return "-";
                }
                return record.agents
                  ?.map((a) => agents?.find((a2) => a2.id === a)?.name)
                  .join(", ");
              },
            },
            {
              title: "Tags",
              render: (_, record) =>
                record.tags?.length === 0 ? "-" :
                record.tags?.map((tag, index) => <Tag key={index}>{tag}</Tag>),
            },
            {
              title: "Tags Mode",
              render: (_, record) => {
                if (record.tags?.length === 0) {
                  return "-";
                }
                return record.tagsMode === "ALL" ? "Match All" : record.tagsMode === "ANY" ? "Match Any" : "Exclude";
              },
            },
            {
              title: "Rating",
              render: (_, record) => {
                return record.rating === 0
                  ? "Bad"
                  : record.rating === 1
                    ? "Good"
                    : "-";
              },
            },
            {
              title: "Created At",
              render: (_, record) => {
                return dayjs(record.createdAt).format("DD-MM-YYYY HH:MM");
              },
            },
            {
              title: "Actions",
              render: (_, record) => {
                return (
                  <div className="flex gap-2">
                    <Button
                      loading={buttonLoadingID === record.id}
                      icon={<EditOutlined />}
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (record.lastDates) {
                          setDateMode("lastDates");
                        } else if (record.from && record.to) {
                          setDateMode("fromTo");
                        } else {
                          setDateMode(undefined);
                        }
                        setSelectedSet(record);
                        setModalOpen(true);
                      }}
                    ></Button>
                    <Button
                      loading={buttonLoadingID === record.id}
                      icon={<DeleteOutlined />}
                      key="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        modal.confirm({
                          title: "Remove the Set of Filters",
                          content:
                            "Are you sure you want to remove the chosen set of filters?",
                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          onOk: async () => {
                            setButtonLoadingID(record.id);
                            try {
                              const client = await API();
                              await client.DashboardDeleteUserFilter(
                                {
                                  app_slug: import.meta.env.VITE_APP_SLUG,
                                },
                                { id: record.id ?? "" }
                              );
                              // refresh the table data after delete
                            } catch (e) {
                              console.log(e);
                            }
                            fetchUserFilters();
                            setButtonLoadingID(undefined);
                          },
                        });
                      }}
                    ></Button>
                  </div>
                );
              },
            },
          ]}
          dataSource={currentUserFilters}
          size="small"
          bordered
        />
      </div>
    </div>
  );
}
