import { Heading } from "./components/Heading"
import { Section } from "./components/Section"
import Counter from "./components/Counter"
import List from "./components/List"

function App() {
  return (
      <>
				<Heading title="Hello World!" />
				<div>
					<Section title="My First React App with Vite" children="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." />
					<hr />
					<Section title="Testing out the section component">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias adipisci assumenda, voluptatibus enim ducimus vel, quisquam corporis necessitatibus explicabo molestias, laboriosam non? Amet molestias dolor ratione saepe laborum qui vero!
					</Section>
					<Counter />
					<List items={["Test1","Test2","Test3"]} render={(item: string) => <span className="gold">{item}</span>} />
				</div>
			</>
  )
}

export default App
