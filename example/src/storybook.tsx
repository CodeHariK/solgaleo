import { SpaceLayout, Header, Footer, ThemeToggle, OutlinedButton, MaterialButton, BaseButton, RedButton, BorderButton, IconButton, H1, H3, H2, H6, H5, H4, P, TextInput, SpaceForm, CheckboxGroup, GlitterCard } from "solgaleo";
import "solgaleo/solgaleo.css";

export function Storybook() {

  return (

    <SpaceLayout two contentCenter={true} title='Storybook'
      header={<Header rightChildren={<ThemeToggle />} />}
      footer={<Footer />}>

      <GlitterCard />

      {/* <GhostComponent />

      <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage> */}

      <section class="light">
        Light
        <Story />
      </section>

      <section class="night">
        Night
        <Story />
      </section>

      <section class="custom">
        Custom
        <Story />
      </section>


    </SpaceLayout>
  )
}

function Story() {
  return <div>
    <BaseButton>BaseButton</BaseButton>
    <MaterialButton>MaterialButton</MaterialButton>
    <OutlinedButton>OutlinedButton</OutlinedButton>
    <BorderButton>BorderButton</BorderButton>
    <RedButton>RedButton</RedButton>
    <IconButton>IconButton</IconButton>

    <SpaceForm id="Hello">
      <TextInput name="Hello" type="text" placeholder="Hello text"></TextInput>
      <CheckboxGroup id="check" checkboxes={[
        {
          name: "Hello",
          label: "Hello"
        },
        {
          name: "Bow",
          label: "Bow"
        },
      ]}></CheckboxGroup>
    </SpaceForm>

    <H1>H1 header</H1>
    <H2>H2 header</H2>
    <H3>H3 header</H3>
    <H4>H4 header</H4>
    <H5>H5 header</H5>
    <H6>H6 header</H6>
    <P>P header</P>

  </div>
}