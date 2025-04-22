import { NestedTabs, Treeview } from "../src/gen";
import { GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function TabTest() {

    return <GridLayout
        header={<TestHeader />}
        footer={<TestHeader />}
    >

        <div style={{ display: "flex", "flex-direction": "column", height: "100%" }}>

            <div style={{
                display: "flex",
                "flex-direction": "row",
                height: "100%",
            }}>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <NestedTabs
                        tabsData={sampleTabData()}
                        id="two.light"
                        showContent
                        showPathTabs
                        showTreeView
                        styles={{
                            tabContainer: { "flex-direction": "row" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>

                {/* <div style={{ border: "1px solid red", width: "100%" }}>
                    <NestedTabs
                        tabs={sampleTabData()}
                        defaultTab="home"
                        id="two.night"
                        showContent
                        showPathTabs
                        styles={{
                            tabContainer: { "flex-direction": "row" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div> */}

            </div>

            <div style={{
                display: "flex",
                "flex-direction": "row",
                height: "100%",
            }}>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <Treeview
                        tabsData={sampleTabData()}
                        onClick={(node) => {
                            console.log("Leaf clicked:", node);
                        }} />
                </div>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <Treeview
                        tabsData={sampleTabData()}
                        onClick={(node) => {
                            console.log("Leaf clicked:", node);
                        }} />

                </div>
            </div>

        </div>

    </GridLayout>
}

export const sampleTabData = () => [
    {
        id: 'Root',
        label: 'Root',
        content: <div>Root</div>,
        open: true,
        children: [
            {
                id: 'Documents',
                label: 'Documents',
                children: [
                    { id: 'Report', label: 'Report.pdf', content: <div>Report.pdf</div>, },
                    { id: 'Notes', label: 'Notes.txt', content: <div>Notes.txt</div>, }
                ]
            },
            {
                id: 'Pictures',
                label: 'Pictures',
                content: <div>Pictures</div>,
                open: true,
                children: [
                    { id: 'Vacation', label: 'Vacation.jpg', content: <div>Vacation.jpg</div>, open: true },
                    { id: 'Family', label: 'Family.png', content: <div>Family.png</div>, }
                ]
            }
        ]
    },
    {
        id: 'Pictures',
        label: 'Pictures',
        content: <div>Pictures</div>,
        children: [
            {
                id: 'Vacation',
                label: 'Vacation',
                content: <div>Vacation pictures</div>,
            },
        ]
    }
];
