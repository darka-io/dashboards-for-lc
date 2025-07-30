import { Progress, Tooltip } from "antd"
import dayjs from "dayjs"

export default function HeatMap(props: { data: Record<string, { hour: string, total: number }> }) {

    const converted: Record<string, { hour: string, count: number }[]> = {}

    Object.keys(props.data).map(dateTime => {
        const day = dayjs(dateTime.split(" ")[0]).format("YYYY-MM-DD")
        const hour = dateTime.split(" ")[1]
        // console.log(day, hour, dateTime, props)
        if (!converted[day]) {
            converted[day] = []
        }
        // converted[day].push({ hour, count: props[dateTime]?.total })
    })

    Object.keys(converted).map(day => {
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, "0")
            converted[day].push({ hour: `${hour}:00`, count: props.data[`${day} ${hour}:00` as keyof typeof props.data]?.total ?? 0 })
        }
    })

    //Highest value
    const HV = Math.max(...Object.values(converted).flat().map(v => v.count))
    //from 1 to 5
    const colors = {
        0: "#fff",
        1: "#f2f2f2",
        2: "#b6d0f9",
        3: "#99bdf8",
        4: "#7ba9f7",
        5: "#508df6"
    }

    const calculateLevel = (value: number) => {
        const level = Math.ceil(value / (HV / 5))
        return colors[level as keyof typeof colors] ?? "#fff"
    }
    return (
        //space evenly
        <div className="w-full overflow-x-auto flex flex-col">
            <div className="w-full flex flex-row flex-nowrap min-w-[800px] items-start relative">
                <div className="flex flex-col items-center w-[60px] shadow-md p-1 sticky left-0 bg-white">
                    <div className="text-[10px] font-semibold h-[13px]"></div>
                    {
                        [...Array(24).keys()].map(hour => {
                            return (
                                <div key={hour} className="w-full h-4 text-[10px]">{`${hour.toString().padStart(2, "0")}:00`}</div>
                            )
                        })
                    }
                </div>
                {
                    [...Object.keys(converted)].map(day => {
                        return (
                            <div key={day} className="flex flex-col items-center flex-1 min-w-[40px]">
                                <div className="text-[10px] font-semibold">{dayjs(day).format("MM-DD")}</div>
                                {
                                    converted[day].map(hour => {
                                        return (
                                            <Tooltip title={`${hour.count} chat(s)`} key={hour.hour + day}>
                                                <div key={hour.hour + day} className="w-full h-4 border border-1 border-gray-200 cursor-pointer" style={{ backgroundColor: calculateLevel(hour.count) }}></div>
                                            </Tooltip>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            {/* LEGEND */}
            <div className="flex flex-row items-center justify-center mt-2 gap-2 font-semibold text-[12px] gap-2 text-gray-400 ml-auto border border-1 border-gray-200 p-2 shadow-lg rounded-lg">
                0
                <Progress size="small" percent={100}
                    style={{ width: "200px" }}
                    showInfo={false}

                    strokeColor={{
                        0: "#fff",
                        20: "#f2f2f2",
                        40: "#b6d0f9",
                        60: "#99bdf8",
                        80: "#7ba9f7",
                        100: "#508df6"
                    }} />
                5
            </div>

        </div>
    )
}