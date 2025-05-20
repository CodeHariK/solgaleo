import { Grid, GridItem, GridLayout, IconDown, ProgressBar, ToggleSwitch, TreeView } from "../src/gen";
import { TestHeader } from "./common";

export function Dashboard() {
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

    </GridLayout>
}