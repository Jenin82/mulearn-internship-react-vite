import { ReactElement } from "react"

type HeadingProps = {title: string}

export const Heading = ({title}: HeadingProps): ReactElement => {
	return <h1>{title}</h1>
}
