import { createEffect, createSignal, For } from "solid-js";
import { AreaChart, CheckboxGroup, CssUI, Grid, GridItem, GridLayout, HList, IconCheck, IconCross, IconDown, Input, Modal, ProgressBar, TabBar, Table, ToggleSwitch, TreeView } from "../src/gen";
import { TestHeader } from "./common";

export function Dashboard() {

    let [currentTab, setCurrentTab] = createSignal(0)

    return <GridLayout

        gridStyle={{ 'grid-template-columns': "1fr 4fr 2fr" }}

        header={<TestHeader />}

        left={
            <div style={{ background: "#a396f966", padding: "5px" }}>

                <TreeView
                    style={{ width: "100%" }}
                    id="pages"
                    data={[
                        { id: "Dashboard", label: <><IconDown /> Dashboard</> },
                        { id: "Diagnostics", label: <><IconDown /> Diagnostics</> },
                        { id: "DataCenter", label: <><IconDown /> Data Center</> },
                        { id: "Network", label: <><IconDown /> Network</> },
                        { id: "Security", label: <><IconDown /> Security</> },
                        { id: "Console", label: <><IconDown /> Console</> },
                        { id: "Communications", label: <><IconDown /> Communications</> },
                        { id: "Settings", label: <><IconDown /> Settings</> },
                    ]} />

                <hr />

                Core System
                <ProgressBar boxStyle={{ height: "8px" }} progressStyle={{ background: "blue", "border-radius": "10px" }} />

                Security
                <ProgressBar boxStyle={{ height: "8px" }} progressStyle={{ background: "green", "border-radius": "10px" }} />

                Network
                <ProgressBar boxStyle={{ height: "8px" }} progressStyle={{ background: "yellow", "border-radius": "10px" }} />

            </div>
        }

        right={
            <div>
                <div style={{ border: "1px solid black" }}>
                    <div>
                        time
                    </div>

                    <Grid cols={2} rows={1} spacingX={.5} spacingY={.5}>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Security Scan</GridItem>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Sync Data</GridItem>
                    </Grid>
                </div>

                <div style={{ border: "1px solid black" }}>

                    <Grid cols={2} rows={1} spacingX={.5} spacingY={.5}>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Security Scan</GridItem>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Sync Data</GridItem>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Backup</GridItem>
                        <GridItem style={{ background: "var(--primary-bg)", padding: "5px" }}>Console</GridItem>
                    </Grid>

                </div>

                <div style={{ border: "1px solid black", padding: "5px" }}>

                    Resource Core System
                    <ProgressBar boxStyle={{ height: "8px", margin: "5px" }} progressStyle={{ background: "blue", "border-radius": "10px" }} />

                    Security
                    <ProgressBar boxStyle={{ height: "8px", margin: "5px" }} progressStyle={{ background: "green", "border-radius": "10px" }} />

                    Network
                    <ProgressBar boxStyle={{ height: "8px", margin: "5px" }} progressStyle={{ background: "yellow", "border-radius": "10px" }} />

                </div>

                <div style={{ border: "1px solid black" }}>
                    <h5 class="p2 mb2">Environment controls</h5>

                    <ToggleSwitch
                        style={{ display: "flex", "justify-content": "space-between", "flex-direction": "row", padding: "5px" }}
                        header={<span>Power Management</span>}
                        name="PowerManagement" />
                    <ToggleSwitch
                        style={{ display: "flex", "justify-content": "space-between", "flex-direction": "row", padding: "5px" }}
                        header={<span>Security Protocol</span>}
                        name="SecurityProtocol" />
                    <ToggleSwitch
                        style={{ display: "flex", "justify-content": "space-between", "flex-direction": "row", padding: "5px" }}
                        header={<span>Power Saving Mode</span>}
                        name="PowerSavingMode" />
                    <ToggleSwitch
                        style={{ display: "flex", "justify-content": "space-between", "flex-direction": "row", padding: "5px" }}
                        header={<span>Auto Shutdown</span>}
                        name="AutoShutdown" />
                </div>
            </div>
        }
    >

        <div class="border p4">
            <Grid cols={3} rows={1} spacingX={1} spacingY={1} style={{ "margin-bottom": "20px" }}>
                <For each={[1, 2, 3]} children={() => {
                    return <GridItem class="p4 border br2">
                        <span class="flex space-between">
                            <p>Hello</p>
                            <p class={CssUI.ButtonGradient}>SSD</p>
                        </span>
                        <span class="flex space-between">
                            <p>Hello</p>
                            <p>Hello</p>
                        </span>

                    </GridItem>
                }} />
            </Grid>

            <TabBar
                titles={["Font", "Display", "Grid"]}
                onTabChange={(i) => { setCurrentTab(i) }}
            />

            <HList
                index={currentTab}
                pages={[
                    <AreaChart
                        width={500}
                        height={300}
                        curveType={"catmull-rom"}
                        chartType={"line"}
                        duration={1000}
                        data={[
                            {
                                label: "Cpu",
                                values: [50, 48, 48, 15, 82, 50, 68, 33, 36, 40, 61],
                                lineColor: "#f01b1b",
                                areaColor: "#f01b1b55"
                            },
                        ]}
                    />,
                    <Table

                        tableStyle={{
                            margin: "10px 0 0 0",
                            padding: "10px",
                            border: "1px solid var(--surface)",
                            "border-radius": "var(--spacing)"
                        }}

                        style={{
                            "box-shadow": "rgba(0, 0, 0, 0.1) 0px 0px 6px 2px",
                        }}

                        tableArray={[
                            {
                                headerItems: [
                                    <p>PID</p>,
                                    <p>Process</p>,
                                    <p>User</p>,
                                    <p>CPU</p>,
                                    <p>Memory</p>,
                                    <p>Status</p>,
                                ],
                                rowStyle: {
                                    "grid-template-columns": `1fr 2fr 1fr 1fr 1fr 1fr`
                                },
                                headerStyle: {
                                    "grid-template-columns": `1fr 2fr 1fr 1fr 1fr 1fr`,
                                },
                                headerCellStyle: () => {
                                    return {
                                        margin: "0 .1rem",
                                        padding: "10px",
                                        // background: "var(--secondary-bg)",
                                    };
                                },
                                rowCellStyle: () => {
                                    return {
                                        margin: ".1rem .1rem",
                                        padding: "10px",
                                        // background: "var(--primary-bg)",
                                    };
                                },
                                data: [
                                    { pid: 1024, process: "system_core.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                    { pid: 1024, process: "nexus_service.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                    { pid: 1024, process: "security_monitor.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                    { pid: 1024, process: "network_manager.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                    { pid: 1024, process: "user_interface.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                    { pid: 1024, process: "data_analyzer.exe", user: "SYSTEM", cpu: "12.4%", memory: "345 MB" },
                                ].map((s, _i) => {
                                    return {
                                        rowItems: [
                                            <p>{s.pid}</p>,
                                            <p>{s.process}</p>,
                                            <p>{s.user}</p>,
                                            <p style={{ color: "var(--secondary)" }}>{s.cpu}</p>,
                                            <p style={{ color: "var(--primary)" }}>{s.memory}</p>,
                                            <p class={CssUI.ButtonGradient}>running</p>,
                                        ]
                                    };
                                }
                                )
                            }
                        ]}

                    />,
                    <Grid cols={2} rows={2} spacingX={1} spacingY={1} style={{ padding: "var(--spacing)" }}>
                        <For each={[1, 2, 3, 4]} children={() => {
                            return <GridItem class="p4 border br2">
                                <span class="flex space-between">
                                    <p>Hello</p>
                                    <p class={CssUI.ButtonGradient}>SSD</p>
                                </span>
                                <span class="flex space-between">
                                    <p>Hello</p>
                                    <p>Hello</p>
                                </span>
                                <ProgressBar />
                                <span class="flex space-between">
                                    <p>Hello</p>
                                    <p>Hello</p>
                                </span>

                            </GridItem>
                        }} />
                    </Grid>,
                ]}
            />

        </div>

        <Grid cols={2} rows={1}>
            <GridItem>
                <div class="h-full flex flex-col gap2 p4 border br2">

                    <p>Communications Log</p>

                    <For each={[1, 2, 3]} children={() => {
                        return <div class="flex py2 space-between">
                            <p class="bold">System Adminstrator</p>
                            <p>15:4:12</p>
                        </div>

                    }} />

                    <hr />

                    <div class="flex py2 space-between">
                        <p class="bold">System Adminstrator</p>
                        <p>75%</p>
                    </div>

                    <ProgressBar boxStyle={{ height: "8px" }} />
                </div>
            </GridItem>

            <GridItem>
                <div class="flex flex-col gap2 p2 border br2">

                    <p>Communications Log</p>

                    <For each={[1, 2, 3]} children={() => {
                        return <div class="flex gap4 p2 items-center border br2">
                            <IconCheck />
                            <div class="flex flex-col w-full">
                                <div class="flex space-between">
                                    <p class="bold">System Adminstrator</p>
                                    <p>15:4:12</p>
                                </div>
                                <p>Unusual login attempt blocked from IP 192.168.1.45.</p>
                            </div>
                        </div>

                    }} />
                </div>
            </GridItem>
        </Grid>

        <div class="flex flex-col gap2 p2 border br2">

            <p>Communications Log</p>

            <For each={[1, 2, 3]} children={() => {
                return <div class="flex gap4 p2 items-center border br2">
                    <IconCheck />
                    <div class="flex flex-col w-full">
                        <div class="flex space-between">
                            <p class="bold">System Adminstrator</p>
                            <p>15:4:12</p>
                        </div>
                        <p>Unusual login attempt blocked from IP 192.168.1.45.</p>
                    </div>
                </div>

            }} />
        </div>

    </GridLayout>
}
