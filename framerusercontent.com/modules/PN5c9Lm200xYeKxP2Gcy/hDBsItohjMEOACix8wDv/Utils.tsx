import { ControlType } from "framer"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

export const updateChildren = (children, properties) => {
    return [
        {
            ...children,
            props: {
                ...children.props,
                children: {
                    ...children.props.children,
                    props: {
                        ...children.props.children.props,
                        children: {
                            ...children.props.children.props.children,
                            props: {
                                ...children.props.children.props.children.props,
                                ...properties,
                            },
                        },
                    },
                },
            },
        },
    ]
}

export const SettingsMessage = ({ title, description, containerStyle }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "rgba(136, 85, 255, 0.1)",
                overflow: "hidden",
                ...containerStyle,
            }}
        >
            <span role="img" aria-label="icon" style={{ fontSize: "32px" }}>
                ✨
            </span>
            <div style={{ maxWidth: "240px" }}>
                <h1
                    style={{
                        fontSize: 11,
                        color: "#96F",
                        fontWeight: 600,
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        fontSize: 11,
                        color: "rgba(153, 102, 255, 0.7)",
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    )
}

export const getBorder = (border) => {
    if (!border) return { border: "none" }

    const { width, color, style } = border
    return {
        borderWidth: width,
        borderColor: color,
        borderStyle: style,
    }
}

export const borderProperty = (
    title = "Border",
    width = "0px",
    color = "#fff"
) => ({
    title,
    type: ControlType.Object,
    controls: {
        width: {
            title: "Width",
            type: ControlType.Padding,
            defaultValue: width,
        },
        color: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: color,
        },
        style: {
            type: ControlType.Enum,
            defaultValue: "solid",
            options: ["solid", "dashed", "dotted", "double"],
            optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
        },
    },
})

export const getBoxShadow = (property) => {
    const { x, y, blur, color } = property.shadow
    return `${x}px ${y}px ${blur}px ${color}`
}

export const shadowProperty = {
    type: ControlType.Object,
    controls: {
        color: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: "#bfbfbf",
        },
        x: {
            title: "X",
            type: ControlType.Number,
            defaultValue: 0,
            min: -100,
            max: 100,
        },
        y: {
            title: "Y",
            type: ControlType.Number,
            defaultValue: 0,
            min: -100,
            max: 100,
        },
        blur: {
            title: "Blur",
            type: ControlType.Number,
            defaultValue: 0,
            min: 0,
            max: 100,
        },
    },
}

export const heightProperty = {
    height: {
        type: ControlType.Enum,
        defaultValue: "auto",
        displaySegmentedControl: true,
        options: ["auto", "fixed"],
        optionTitles: ["Auto", "Fixed"],
    },
    heightNumber: {
        title: " ",
        type: ControlType.Number,
        defaultValue: 50,
        hidden(props) {
            return props.height === "auto"
        },
    },
}

export const getHeight = (property) => {
    if (property.height === "auto") {
        return property.height
    } else {
        return `${property.heightNumber}px`
    }
}

export const getPageQueryParam = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const pageParam = urlParams.get("page")
    return pageParam ? parseInt(pageParam, 10) : 1
}

export const updatePageQueryParam = (newPage) => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", newPage)
    window.history.replaceState({}, "", url.toString())
}

export const useStore = createStore({
    initialLimit: undefined,
    initialOffset: undefined,
    limit: undefined,
    offset: undefined,
    totalItems: undefined,
    page: 1,
    searchQuery: "",
    totalPages: undefined,
})

export const scrollToTop = (withScroll, scrollTop, scrollBehavior) => {
    if (withScroll) {
        window.scrollTo({ top: scrollTop, behavior: scrollBehavior })
    }
}
