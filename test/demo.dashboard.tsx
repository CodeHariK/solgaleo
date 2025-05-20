import { createSignal, For } from "solid-js";
import { AreaChart, CssUI, Grid, GridItem, GridLayout, HList, IconCheck, IconDown, ProgressBar, TabBar, Table, ToggleSwitch, TreeView } from "../src/gen";
import { TestHeader } from "./common";

export function Dashboard() {

    let [currentTab, setCurrentTab] = createSignal(0)


    return <App />

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





/*CSS:

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.custom-select-container {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-height: 46px;
}

.multi-select-trigger {
  align-items: flex-start;
  min-height: 46px;
  height: auto;
  padding: 8px 12px;
}

.select-trigger:hover {
  border-color: #999;
}

.select-trigger:active {
  transform: translateY(1px);
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  padding-right: 10px;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  background-color: #e6f2ff;
  border: 1px solid #c5e0ff;
  border-radius: 16px;
  padding: 2px 8px;
  font-size: 14px;
  margin-bottom: 4px;
}

.remove-tag {
  background: none;
  border: none;
  color: #666;
  margin-left: 4px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.remove-tag:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.placeholder {
  color: #999;
}

.trigger-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.clear-all {
  background: none;
  border: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
}

.clear-all:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
}

.arrow {
  border: solid #666;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s ease;
}

.arrow.down {
  transform: rotate(45deg);
  margin-top: -3px;
}

.arrow.up {
  transform: rotate(-135deg);
  margin-bottom: -3px;
}

.dropdown-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  transform-origin: top center;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s ease-in-out;
}

.dropdown-closed {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
  visibility: hidden;
  pointer-events: none;
}

.dropdown-open {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
}

.options-list {
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
}

.option:hover,
.option.highlighted {
  background-color: #f0f0f0;
  transform: translateX(2px);
}

.option.selected {
  background-color: #e6f2ff;
}

.checkbox {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.checkbox input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.option-label {
  flex: 1;
}

.search-container {
  padding: 8px;
  border-bottom: 1px solid #eee;
  animation: fadeIn 0.3s ease-in-out;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  outline: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.no-results {
  padding: 12px 16px;
  color: #999;
  font-style: italic;
  text-align: center;
}

.selected-value {
  margin-top: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #4a90e2;
}


*/


function App() {
    // Single select example
    const [selectedValue, setSelectedValue] = createSignal("apple")

    // Multi-select example
    const [selectedValues, setSelectedValues] = createSignal(["banana", "grape"])

    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape" },
        { value: "pineapple", label: "Pineapple" },
        { value: "strawberry", label: "Strawberry" },
        { value: "blueberry", label: "Blueberry" },
        { value: "mango", label: "Mango" },
    ]

    return (
        <div class="container">
            <h1>SolidJS Custom Select</h1>

            <div class="form-group">
                <label for="single-select">Single Select:</label>
                <CustomSelect
                    id="single-select"
                    options={options}
                    value={selectedValue()}
                    onChange={(value) => setSelectedValue(value)}
                    multiple={false}
                />
                <div class="selected-value">
                    <p>
                        Selected value: <strong>{selectedValue()}</strong>
                    </p>
                </div>
            </div>

            <div class="form-group">
                <label for="multi-select">Multi Select:</label>
                <CustomSelect
                    id="multi-select"
                    options={options}
                    value={selectedValues()}
                    onChange={(values) => setSelectedValues(values)}
                    multiple={true}
                />
                <div class="selected-value">
                    <p>
                        Selected values: <strong>{selectedValues().join(", ")}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App

function CustomSelect(props) {
    const [isOpen, setIsOpen] = createSignal(false)
    const [highlightedIndex, setHighlightedIndex] = createSignal(-1)
    const [searchTerm, setSearchTerm] = createSignal("")

    // Handle both single and multiple selection modes
    const isMultiple = () => props.multiple === true

    // Convert single value to array for consistent handling
    const selectedValues = () => {
        if (isMultiple()) {
            return Array.isArray(props.value) ? props.value : []
        } else {
            return props.value ? [props.value] : []
        }
    }

    const selectedOption = () => {
        return props.options.find((option) => option.value === props.value) || props.options[0]
    }

    const selectedOptionsLabels = () => {
        if (!isMultiple()) {
            return selectedOption().label
        }

        return props.options.filter((option) => selectedValues().includes(option.value)).map((option) => option.label)
    }

    const filteredOptions = () => {
        if (!searchTerm()) return props.options
        const term = searchTerm().toLowerCase()
        return props.options.filter((option) => option.label.toLowerCase().includes(term))
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen())
        if (!isOpen()) {
            setHighlightedIndex(-1)
            setSearchTerm("")
        }
    }

    const selectOption = (value) => {
        if (isMultiple()) {
            // For multi-select, toggle the selection
            const currentValues = [...selectedValues()]
            const valueIndex = currentValues.indexOf(value)

            if (valueIndex >= 0) {
                // Remove if already selected
                currentValues.splice(valueIndex, 1)
            } else {
                // Add if not selected
                currentValues.push(value)
            }

            props.onChange(currentValues)
            // Don't close dropdown in multi-select mode
        } else {
            // For single select, replace the value and close
            if (props.value !== value) {
                props.onChange(value)
            }
            setIsOpen(false)
        }
    }

    const isOptionSelected = (value) => {
        return selectedValues().includes(value)
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const removeTag = (value, event) => {
        // Stop propagation to prevent dropdown from opening
        event.stopPropagation()

        const currentValues = [...selectedValues()]
        const valueIndex = currentValues.indexOf(value)

        if (valueIndex >= 0) {
            currentValues.splice(valueIndex, 1)
            props.onChange(currentValues)
        }
    }

    const clearAll = (event) => {
        event.stopPropagation()
        props.onChange(isMultiple() ? [] : "")
    }

    return (
        <div class="custom-select-container">
            <div
                class={`select-trigger ${isMultiple() ? "multi-select-trigger" : ""}`}
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen()}
                id={props.id}
            >
                {isMultiple() ? (
                    <div class="selected-tags">
                        {selectedValues().length > 0 ? (
                            props.options
                                .filter((option) => selectedValues().includes(option.value))
                                .map((option) => (
                                    <span class="selected-tag"
                                    // key={option.value}
                                    >
                                        {option.label}
                                        <button
                                            type="button"
                                            class="remove-tag"
                                            onClick={(e) => removeTag(option.value, e)}
                                            aria-label={`Remove ${option.label}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))
                        ) : (
                            <span class="placeholder">Select options...</span>
                        )}
                    </div>
                ) : (
                    <span class="selected-text">{selectedOption().label}</span>
                )}

                <div class="trigger-buttons">
                    {isMultiple() && selectedValues().length > 0 && (
                        <button type="button" class="clear-all" onClick={clearAll} aria-label="Clear all selections">
                            Clear
                        </button>
                    )}
                    <span class={`arrow ${isOpen() ? "up" : "down"}`}></span>
                </div>
            </div>

            <div class={`dropdown-wrapper ${isOpen() ? "dropdown-open" : "dropdown-closed"}`}>
                <div class="search-container">
                    <input
                        type="text"
                        class="search-input"
                        placeholder="Search options..."
                        value={searchTerm()}
                        onInput={handleSearchChange}
                    />
                </div>

                <ul class="options-list" role={isMultiple() ? "listbox" : "menu"} aria-multiselectable={isMultiple()}>
                    {filteredOptions().length > 0 ? (
                        filteredOptions().map((option, index) => (
                            <li
                                // key={option.value}
                                class={`option ${isOptionSelected(option.value) ? "selected" : ""} ${highlightedIndex() === index ? "highlighted" : ""
                                    }`}
                                onClick={() => selectOption(option.value)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                role="option"
                                aria-selected={isOptionSelected(option.value)}
                            >
                                {isMultiple() && (
                                    <span class="checkbox">
                                        <input
                                            type="checkbox"
                                            checked={isOptionSelected(option.value)}
                                            onChange={() => { }} // Handled by the li click
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </span>
                                )}
                                <span class="option-label">{option.label}</span>
                            </li>
                        ))
                    ) : (
                        <li class="no-results">No matching options</li>
                    )}
                </ul>
            </div>
        </div>
    )
}
