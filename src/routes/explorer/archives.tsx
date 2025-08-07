import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { ThumbUpFilled, ThumbDownFilled } from "@livechat/design-system-icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  Spin,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import API from "../../api/api";
import type { Paths } from "../../openapi";
import { ReportContext } from "./route";

export const Route = createFileRoute("/explorer/archives")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] =
    useState<Paths.DashboardListArchives.Responses.$200>();
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] =
    useState<Paths.DashboardListArchives.Responses.$200["chats"][0]>();
  const [filters, setFilters] =
    useState<Paths.DashboardListArchives.RequestBody>({});
  const { selectedGroup, agents, tags, groups } = useContext(ReportContext);
  const selectedVisitor = selectedChat?.users.find(
    (u) => u.type === "customer"
  );

  // translations showing and hiding
  const [shownTranslations, setShownTranslations] = useState<
    Record<string, boolean>
  >({});
  const toggleTranslation = (id: string) => {
    setShownTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getChats = async (props: Paths.DashboardListArchives.RequestBody) => {
    setLoading(true);
    try {
      const client = await API();
      const { data } = await client.DashboardListArchives(
        {
          app_slug: import.meta.env.VITE_APP_SLUG,
        },
        props
      );
      setData({ ...data });
      if (!selectedChat) setSelectedChat(data.chats.at(0));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!selectedGroup && selectedGroup !== 0) return;
    getChats({
      ...filters,
      group_ids: filters.group_ids?.length ? filters.group_ids : [selectedGroup],
      agents: filters.agents?.length ? filters.agents : undefined,
      tags: filters.tags?.length ? filters.tags : undefined,
    });
  }, [selectedGroup, filters]);

  return (
    <div className="flex h-screen flex-row">
      <div className="w-[350px] h-screen border-r border-gray-200 flex flex-col">
        <div className="p-4 text-lg font-semibold border-b border-gray-200">
          Chat Archives
        </div>
        <div className="flex-1 overflow-y-scroll flex flex-col">
          {loading && (
            <div className="flex justify-center items-center h-full">
              <Spin />
            </div>
          )}
          {!loading && data?.found_chats == 0 && (
            <div className="p-2 mt-4 text-center text-gray-500 text-sm font-semibold">
              No chats found
            </div>
          )}
          {!loading && data?.found_chats ? (
            <div className="mx-4 my-2 text-sm text-gray-500 bor">
              Found {data.found_chats} chat(s)
            </div>
          ) : null}
          {!loading && data?.found_chats
            ? data?.chats.map((chat) => {
                const customer = chat.users.find((u) => u.type === "customer");
                const lastMessage = chat.thread.events
                  .filter((e) => e.type === "message")
                  .at(-1);
                return (
                  <div
                    key={chat.id}
                    className={`p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${selectedChat?.thread.id === chat.thread.id ? "bg-gray-100" : ""}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${customer?.name ?? "Unknown Visitor"}`}
                          size={36}
                        />
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex justify-between items-center">
                            <div>{customer?.name ?? "Unknown Visitor"}</div>
                            {chat.thread.properties.rating?.score === 1 && (
                              <ThumbUpFilled
                                className="text-green-400"
                                width={20}
                                height={20}
                              />
                            )}
                            {chat.thread.properties.rating?.score === 0 && (
                              <ThumbDownFilled
                                className="text-red-400"
                                width={20}
                                height={20}
                              />
                            )}
                          </div>
                          <div className="w-[200px] ">
                            <Typography.Text ellipsis italic>
                              {lastMessage?.text ?? ""}
                            </Typography.Text>
                          </div>
                          <div className="text-xs text-gray-500">
                            {lastMessage?.created_at
                              ? dayjs(lastMessage.created_at).format(
                                  "DD MMM, YY HH:mm"
                                )
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="p-2 justify-between w-full flex">
          <Button
            onClick={() => getChats({ page_id: data?.previous_page_id })}
            disabled={!data?.previous_page_id}
            icon={<ArrowLeftOutlined />}
          >
            Previous Page
          </Button>
          <Button
            onClick={() => getChats({ page_id: data?.next_page_id })}
            disabled={!data?.next_page_id}
            icon={<ArrowRightOutlined />}
          >
            Next Page
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* FILTERS */}
        <div className="p-4 border-b border-gray-200 flex gap-4 flex flex-wrap items-center">
          {/* GROUPS */}
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Groups
            </div>

            <Select
              options={groups.map((a) => ({ label: a.name, value: a.id }))}
              value={filters.group_ids?.length ? filters.group_ids : (selectedGroup ? [selectedGroup]: [])}
              placeholder="Groups"
              mode="multiple"
              style={{ width: 200 }}
              onChange={(val) => setFilters({ ...filters, group_ids: val.length ? val : undefined })}
              allowClear
            />
          </div>
          {/* QUERY */}
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Query
            </div>
            <Input.Search
              allowClear
              onSearch={(val) => setFilters({ ...filters, query: val })}
              style={{ width: 200 }}
              placeholder="Search"
            />
          </div>
          {/* RANGE PICKER */}
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Date Range
            </div>
            <DatePicker.RangePicker
              allowClear
              onChange={(val) =>
                setFilters({
                  ...filters,
                  from: val?.[0]?.format("YYYY-MM-DD"),
                  to: val?.[1]?.format("YYYY-MM-DD"),
                })
              }
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Agents
            </div>

            <Select
              options={agents.map((a) => ({ label: a.name, value: a.id }))}
              placeholder="Agents"
              mode="multiple"
              style={{ width: 200 }}
              onChange={(val) => setFilters({ ...filters, agents: val })}
              allowClear
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">Tags</div>

            <Select
              options={tags.map((t) => ({ label: t.name, value: t.name }))}
              placeholder="Tags"
              style={{ width: 200 }}
              mode="multiple"
              onChange={(val) => setFilters({ ...filters, tags: val })}
              allowClear
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Rating
            </div>

            <Select
              options={[
                { label: "Good", value: 1 },
                { label: "Bad", value: 0 },
              ]}
              placeholder="Ratings"
              style={{ width: 200 }}
              onChange={(val) => setFilters({ ...filters, rating: val })}
              allowClear
            />
          </div>
        </div>
        {/* SELECTED CHAT */}
        <div className="flex flex-1 flex-row overflow-hidden ">
          <div className="flex-1 overflow-y-auto flex flex-col w-full items-center justify-start px-6 pb-6 pt-4">
            {selectedChat &&
              selectedChat.thread.events
                .filter(
                  (e) =>
                    e.type === "message" ||
                    e.type === "system_message" ||
                    e.type === "filled_form"
                )
                .map((e) => {
                  let author = selectedChat.users.find(
                    (u) => u.id === e.author_id
                  )?.name;
                  if (!author) author = "system";
                  // const findAuthor = (id: string) => {
                  //     const author = selectedChat.users.find(u => u.id === id)
                  //     return author
                  // }
                  if (author === "system")
                    return (
                      <div className="font-italic text-gray-500 mx-auto my-2 px-6 text-sm">
                        {e.text}
                      </div>
                    );
                  // pre-cht form
                  else if (
                    e.type === "filled_form" &&
                    e.properties?.lc2?.form_type === "prechat"
                  )
                    return (
                      <div
                        key={e.id}
                        className="p-4 w-full flex flex-row gap-2"
                      >
                        <Card
                          title="Pre-Chat Form"
                          className="w-[400px]"
                          size="small"
                        >
                          {e.fields?.map((field) => (
                            <div key={field.id} className="mb-2">
                              <div className="text-xs text-gray-500">
                                {field.label}
                              </div>
                              {field.answer && (
                                <div className="font-medium">
                                  {field.answer}
                                </div>
                              )}
                              {field.answers &&
                                Array.isArray(field.answers) &&
                                field.answers.length > 0 && (
                                  <div className="font-medium">
                                    {field.answers.join(", ")}
                                  </div>
                                )}
                            </div>
                          ))}
                          <div className="text-xs text-gray-400 mt-2">
                            {e.created_at
                              ? dayjs(e.created_at).format("DD MMM, YY HH:mm")
                              : ""}
                          </div>
                        </Card>
                      </div>
                    );
                  else if (
                    e.type === "filled_form" &&
                    e.properties?.lc2?.form_type === "postchat"
                  )
                    return (
                      <div
                        key={e.id}
                        className="p-4 w-full flex flex-row gap-2"
                      >
                        <Card
                          key={e.id}
                          title="Post-chat Form"
                          className="w-[400px] mr-auto"
                          size="small"
                        >
                          {e.fields?.map((field) => (
                            <div key={field.id} className="mb-2">
                              <div className="text-xs text-gray-500">
                                {field.label}
                              </div>
                              {field.answer && (
                                <div className="font-medium">
                                  {typeof field.answer === "string" ||
                                  typeof field.answer === "number"
                                    ? field.answer
                                    : typeof field.answer === "object" &&
                                        "label" in field.answer
                                      ? (field.answer as { label: string })
                                          .label
                                      : "[Unknown answer]"}
                                </div>
                              )}
                              {Array.isArray(field.answers) &&
                                field.answers.length > 0 && (
                                  <div className="font-medium">
                                    {typeof field.answers[0] === "object"
                                      ? field.answers
                                          .map((a) => a.label)
                                          .join(", ")
                                      : field.answers.join(", ")}
                                  </div>
                                )}
                            </div>
                          ))}

                          <div className="text-xs text-gray-400 mt-2">
                            {e.created_at
                              ? dayjs(e.created_at).format("DD MMM, YY HH:mm")
                              : ""}
                          </div>
                        </Card>
                      </div>
                    );
                  else if (
                    e.author_id?.includes("@") ||
                    !e.author_id?.includes("-")
                  )
                    return (
                      <div
                        key={e.id}
                        className="p-4 w-full flex flex-row gap-2"
                      >
                        <div
                          className={`flex flex-col gap-1 rounded-lg p-2 ml-auto ${
                            e.visibility.includes("agent")
                              ? "bg-orange-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <div className="font-semibold">{author}</div>
                            {e.visibility.includes("agent") && (
                              <div className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                Note
                              </div>
                            )}
                          </div>
                          <div className="w-[400px]">
                            {e.properties?.translation?.target_message ? (
                              <>
                                <div className="mb-2">
                                  <Typography.Text>
                                    {e.properties.translation.target_message}
                                  </Typography.Text>
                                </div>

                                {shownTranslations[e.id] && (
                                  <div className="flex-row items-center gap-2 mb-2">
                                    <Typography.Text italic>
                                      {e.text}
                                    </Typography.Text>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="mb-2">
                                <Typography.Text>{e.text}</Typography.Text>
                              </div>
                            )}

                            <div className="text-xs text-gray-500 justify-between flex items-center">
                              <div>
                                {e.created_at
                                  ? dayjs(e.created_at).format(
                                      "DD MMM, YY HH:mm"
                                    )
                                  : ""}
                              </div>
                              {e.properties?.translation?.target_message && (
                                <div>
                                  Message Translated
                                  <Button
                                    size="small"
                                    type="link"
                                    className="px-0"
                                    onClick={() => toggleTranslation(e.id)}
                                  >
                                    {shownTranslations[e.id] ? (
                                      <div className="text-blue-400">
                                        Hide Translation
                                      </div>
                                    ) : (
                                      <div className="text-blue-400">
                                        Show Translation
                                      </div>
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Avatar
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${author ?? "Unknown Visitor"}`}
                          size={36}
                        />
                      </div>
                    );
                  else
                    return (
                      <div
                        key={e.id}
                        className="p-4 w-full flex flex-row gap-2"
                      >
                        {/* <div className='flex items-center gap-2'> */}
                        <Avatar
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${author ?? "Unknown Visitor"}`}
                          size={36}
                        />
                        <div className="flex flex-col gap-1 bg-gray-100 rounded-lg p-2 ">
                          <div className="font-semibold">{author}</div>
                          <div className="w-[400px]">
                            {e.properties?.translation?.target_message ? (
                              <>
                                <div className="mb-2">
                                  <Typography.Text>
                                    {e.properties.translation.target_message}
                                  </Typography.Text>
                                </div>

                                {shownTranslations[e.id] && (
                                  <div className="flex-row items-center gap-2 mb-2">
                                    <Typography.Text italic>
                                      {e.text}
                                    </Typography.Text>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="mb-2">
                                <Typography.Text>{e.text}</Typography.Text>
                              </div>
                            )}

                            <div className="text-xs text-gray-500 justify-between flex items-center">
                              <div>
                                {e.created_at
                                  ? dayjs(e.created_at).format(
                                      "DD MMM, YY HH:mm"
                                    )
                                  : ""}
                              </div>
                              {e.properties?.translation?.target_message && (
                                <div>
                                  Message Translated
                                  <Button
                                    size="small"
                                    type="link"
                                    className="px-0"
                                    onClick={() => toggleTranslation(e.id)}
                                  >
                                    {shownTranslations[e.id] ? (
                                      <div className="text-blue-400">
                                        Hide Original
                                      </div>
                                    ) : (
                                      <div className="text-blue-400">
                                        Show Original
                                      </div>
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
          </div>
          {/* CHAT DETAILS */}
          <div className="flex-1 flex flex-col max-w-[500px] w-full p-4 space-y-4 overflow-y-auto">
            {/* Header: Avatar + Name */}
            <div className="flex items-center gap-2">
              <Avatar
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedChat?.users[0]?.name ?? "Unknown Visitor"}`}
                size={36}
              />
              <div className="font-semibold">
                {selectedChat?.users[0]?.name ?? "Unknown Visitor"}
              </div>
            </div>
            {/* CHAT INFO */}
            <div className="flex items-center gap-3 flex-col">
              <Card title="Chat Info" className="w-full shadow-sm rounded-xl">
                <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                  <div className="w-[200px]  border-gray-200">Chat ID</div>
                  <div className="text-gray-500 flex-1">{selectedChat?.id}</div>
                </div>
                <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                  <div className="w-[200px]  border-gray-200">
                    Previous Chat ID
                  </div>
                  <div className="text-gray-500 flex-1">
                    {selectedChat?.thread.previous_thread_id ?? "-"}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                  <div className="w-[200px]  border-gray-200">Next Chat ID</div>
                  <div className="text-gray-500 flex-1">
                    {selectedChat?.thread.next_thread_id ?? "-"}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                  <div className="w-[200px] border-gray-200">Rating</div>
                  <div className="flex-1">
                    {selectedChat?.thread?.properties?.rating?.score === 1 ? (
                      <ThumbUpFilled
                        className="text-green-400"
                        width={20}
                        height={20}
                      />
                    ) : selectedChat?.thread?.properties?.rating?.score ===
                      0 ? (
                      <ThumbDownFilled
                        className="text-red-400"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                  <div className="w-[200px]  border-gray-200">Agents</div>
                  <div className="text-gray-500 flex-1">
                    {selectedChat?.thread?.user_ids
                      ? selectedChat.thread.user_ids
                          .filter((id) => !id.includes("-"))
                          .map((id) => agents.find((a) => a.id === id))
                          .filter(Boolean)
                          .map((agent) => agent?.name)
                          .join(", ")
                      : "-"}
                  </div>
                </div>
              </Card>
              {/* TECHNOLOGY */}
              <Card
                title="Visitor Data"
                className="w-full shadow-sm rounded-xl"
              >
                {selectedVisitor?.last_visit ? (
                  <>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">Country</div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.geolocation?.country ??
                          "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">Region</div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.geolocation?.region ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">City</div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.geolocation?.city ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">Timezone</div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.geolocation?.timezone ??
                          "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">Region</div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.geolocation?.region ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">
                        User Agent
                      </div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.user_agent ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center">
                      <div className="w-[200px]  border-gray-200">
                        Last Page
                      </div>
                      <div className="text-gray-500 flex-1">
                        {selectedVisitor.last_visit?.last_pages[0]?.url ?? "-"}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500 flex-1">Empty</div>
                )}
              </Card>

              {/* CUSTOM VARIABLES */}
              <Card
                title="Custom Variables"
                className="w-full shadow-sm rounded-xl"
              >
                {selectedChat?.thread.custom_variables?.length ? (
                  selectedChat.thread.custom_variables.map((v) => (
                    <div
                      key={v.key}
                      className="flex flex-row justify-between border-b gap-2 border-gray-200 p-1 items-center"
                    >
                      <div className="w-[200px] border-gray-200">{v.key}</div>
                      <div className="text-gray-500 flex-1">{v.value}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 flex-1">Empty</div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
