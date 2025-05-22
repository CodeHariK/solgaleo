import { createSignal, For } from "solid-js";
import { AreaChart, CssUI, Grid, GridItem, GridLayout, HList, IconAddUser, IconCart, IconCheck, IconChevronLeft, IconChevronRight, IconDown, IconEmail, IconHeart, IconHome, IconUpload, ProgressBar, TabBar, Table, ToggleSwitch, TreeView } from "../src/gen";
import { TestHeader } from "./common";

//FN:START
//Dashboard
//FN:DOC
export function Dashboard() {

    let [currentTab, setCurrentTab] = createSignal(0)

    return <GridLayout

        gridStyle={{ 'grid-template-columns': "1fr 4fr 2fr" }}

        header={<TestHeader />}

        left={
            <div class="px4">

                <TreeView
                    treeStyle={{ width: "100%", "padding-bottom": "1rem" }}
                    buttonStyle={{ "margin-bottom": ".8rem", "border-radius": ".5rem", padding: ".6rem" }}
                    id="pages"
                    data={[
                        { id: "Dashboard", label: <span class='flex gap2'><IconHome /> Dashboard</span> },
                        { id: "Diagnostics", label: <span class='flex gap2'><IconAddUser /> Diagnostics</span> },
                        { id: "DataCenter", label: <span class='flex gap2'><IconEmail /> Data Center</span> },
                        { id: "Network", label: <span class='flex gap2'><IconDown /> Network</span> },
                        { id: "Security", label: <span class='flex gap2'><IconChevronRight /> Security</span> },
                        { id: "Console", label: <span class='flex gap2'><IconChevronLeft /> Console</span> },
                        { id: "Communications", label: <span class='flex gap2'><IconHeart /> Communications</span> },
                        { id: "Settings", label: <span class='flex gap2'><IconEmail /> Settings</span> },
                    ]} />

            </div>
        }

        right={
            <div class="p4 flex flex-col gap4">
                <div class="flex flex-col items-center gap4 p4 primary br4">
                    <p>SYSTEM TIME</p>
                    <h3>{new Date().toLocaleTimeString()}</h3>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>

                <div class="flex flex-col p4 gap4 border br4">

                    <h5>Quick Actions</h5>

                    <Grid cols={2} rows={1} spacingX={.5} spacingY={.5}>
                        <GridItem class="flex flex-col items-center gap4 p4 border br4">
                            <IconHeart />
                            <p>Security Scan</p>
                        </GridItem>
                        <GridItem class="flex flex-col items-center gap4 p4 border br4">
                            <IconHeart />
                            <p>Sync Data</p>
                        </GridItem>
                        <GridItem class="flex flex-col items-center gap4 p4 border br4">
                            <IconHeart />
                            <p>Backup</p>
                        </GridItem>
                        <GridItem class="flex flex-col items-center gap4 p4 border br4">
                            <IconHeart />
                            <p>Console</p>
                        </GridItem>
                    </Grid>

                </div>

                <div class="flex flex-col gap4 p4 space-between border br4">
                    <h5>Resource Core System</h5>

                    <ProgressBar title="CPU" progress={() => 30} boxStyle={{ height: "8px" }} progressStyle={{ background: "orange", "border-radius": "10px" }} />
                    <ProgressBar title="Security" progress={() => 30} boxStyle={{ height: "8px" }} progressStyle={{ background: "lightgreen", "border-radius": "10px" }} />
                    <ProgressBar title="Network" progress={() => 30} boxStyle={{ height: "8px" }} progressStyle={{ background: "purple", "border-radius": "10px" }} />
                </div>

                <div class="flex flex-col gap4 p4 space-between border br4">
                    <h5>Environment controls</h5>

                    <ToggleSwitch
                        class="flex space-between items-center"
                        header={<span>Power Management</span>}
                        name="PowerManagement" />
                    <ToggleSwitch
                        class="flex space-between items-center"
                        header={<span>Security Protocol</span>}
                        name="SecurityProtocol" />
                    <ToggleSwitch
                        class="flex space-between items-center"
                        header={<span>Power Saving Mode</span>}
                        name="PowerSavingMode" />
                    <ToggleSwitch
                        class="flex space-between items-center"
                        header={<span>Auto Shutdown</span>}
                        name="AutoShutdown" />
                </div>
            </div>
        }
    >

        <div class="flex flex-col gap4 p4">

            <div class="border p4 br2">

                <div class="flex space-between items-center pb4">
                    <h5 class="flex gap4 items-center"><IconCart />System Overview</h5>
                    <button class={CssUI.ButtonErrorRound}>LIVE <IconUpload /></button>
                </div>

                <hr />

                <Grid cols={3} rows={1} spacingX={1} spacingY={1}
                    style={{ "margin": "20px 0", }}>
                    <For each={[1, 2, 3]} children={() => {
                        return <GridItem class="flex flex-col p4 border br2 gap2">
                            <span class="flex space-between items-center">
                                <p>Hello</p>
                                <IconHeart />
                            </span>
                            <h4 class="bold">30%</h4>
                            <p>Hello</p>
                        </GridItem>
                    }} />
                </Grid>

                <TabBar
                    titles={["Font", "Display", "Grid"]}
                    onTabChange={(i) => { setCurrentTab(i) }}
                />

                <HList
                    index={currentTab}
                    pageStyle={{ padding: "4px" }}
                    pages={[

                        <div class="h-full flex flex-col justify-end">
                            <AreaChart
                                curveType={"catmull-rom"}
                                chartType={"line"}
                                duration={1000}
                                style={{ "max-height": "300px" }}
                                data={[
                                    {
                                        label: "Cpu",
                                        values: [50, 48, 48, 15, 82, 50, 68, 33, 36, 40, 61],
                                        lineColor: "#f01b1b",
                                        areaColor: "#f01b1b55"
                                    },
                                ]}
                            />
                        </div>,

                        <Table

                            style={{
                                margin: "10px 0 0 0",
                                padding: "10px",
                                border: "1px solid var(--surface)",
                                "border-radius": "var(--spacing)"
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
                            <For each={["CPU", "GPU", "Memory", "Disk"]}
                                children={(s) => {
                                    return <GridItem class="p4 border br2 flex flex-col gap2">
                                        <span class="flex space-between">
                                            <p>{s}</p>
                                            <p class={CssUI.ButtonGradient}>SSD</p>
                                        </span>
                                        <ProgressBar title={s} progress={() => 40} />
                                    </GridItem>
                                }} />
                        </Grid>,
                    ]}
                />

            </div>

            <Grid cols={2} rows={1} class="py2" spacingX={1} >
                <GridItem>
                    <div class="flex flex-col gap2 p4 border br2 space-between h-full">

                        <h6 class="flex bold items-center gap2 pb4">
                            <IconHeart strokeWidth={3} style={{ color: "lightgreen" }} />
                            Security Status
                        </h6>

                        <For each={["Firewall", "Intrusion Detection", "Encryption"]}
                            children={(name) => {
                                return <div class="flex pb2 items-center space-between">
                                    <p class="bold">{name}</p>
                                    <p class={CssUI.ButtonGradient}>Active</p>
                                </div>
                            }} />

                        <hr />

                        <div class="flex py2 space-between">
                            <p class="bold">Security Level</p>
                            <p>75%</p>
                        </div>

                        <ProgressBar progress={() => 75} boxStyle={{ height: "8px" }} />
                    </div>
                </GridItem>

                <GridItem>
                    <div class="flex flex-col gap2 p4 border br2 space-between h-full">

                        <h6 class="flex bold items-center gap2 pb4">
                            <IconHeart strokeWidth={3} style={{ color: "orange" }} />
                            System Alerts
                        </h6>

                        <For each={[1, 2, 3, 4]} children={() => {
                            return <div class="flex gap4 br2 pb2">
                                <p class={CssUI.ButtonIcon}><IconCheck /></p>
                                <div class="flex flex-col w-full">
                                    <div class="flex space-between">
                                        <p class="bold pb2">System Adminstrator</p>
                                        <p>15:4:12</p>
                                    </div>
                                    <p>Unusual network activity</p>
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
                        <p class={CssUI.ButtonIcon}><IconCheck /></p>
                        <div class="flex flex-col w-full">
                            <div class="flex space-between">
                                <p class="bold">System Adminstrator</p>
                                <IconHeart />
                            </div>
                            <p>Unusual login attempt blocked from IP 192.168.1.45.</p>
                        </div>
                    </div>

                }} />
            </div>

        </div>

    </GridLayout>
}
//FN:END
