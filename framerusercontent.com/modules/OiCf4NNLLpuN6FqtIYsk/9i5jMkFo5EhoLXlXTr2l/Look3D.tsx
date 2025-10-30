import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect, cloneElement } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { SettingsMessage } from "https://framer.com/m/Utils-QTIc.js@hDBsItohjMEOACix8wDv"

/**
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth any-prefer-auto
 * @framerIntrinsicWidth 600
 * @framerSupportedLayoutHeight any-prefer-auto
 * @framerIntrinsicHeight 300
 */

export default function CursorRotation(props) {
    const {
        style,
        draggingOptions: { withDragging, withSnapBack, transition },
        rotationOptions: {
            withRotationLimitX,
            withRotationLimitY,
            maxX,
            maxY,
            minX,
            minY,
        },
        perspectiveOptions: { withPerspective, perspectiveValue },
        sensitivity,
    } = props
    const children = Array.isArray(props.children)
        ? props.children[0]
        : props.children

    if (!children || children.length === 0) {
        return (
            <SettingsMessage
                title="Set Up the Component"
                description="Connect a frame to the component."
                containerStyle={{
                    ...props.style,
                    width: "400px",
                    height: "200px",
                    borderRadius: props.borderRadius,
                }}
            />
        )
    }

    const [isDragging, setIsDragging] = useState(false)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    const springConfig = withDragging ? transition : { duration: 0 }
    const rotateXSpring = useSpring(rotateX, springConfig)
    const rotateYSpring = useSpring(rotateY, springConfig)

    const [startingRotation, setStartingRotation] = useState({ x: 0, y: 0 })
    const [startingMousePosition, setStartingMousePosition] = useState({
        clientX: 0,
        clientY: 0,
    })

    useEffect(() => {
        const handleMove = (event) => {
            if (isDragging) {
                event.preventDefault()
            }

            const isTouchEvent = event.type.startsWith("touch")
            const clientX = isTouchEvent
                ? event.touches[0].clientX
                : event.clientX
            const clientY = isTouchEvent
                ? event.touches[0].clientY
                : event.clientY
            const { innerWidth, innerHeight } = window

            let rotationX, rotationY

            if (withDragging) {
                if (isDragging) {
                    const mouseX = clientX - startingMousePosition.clientX
                    const mouseY = clientY - startingMousePosition.clientY

                    const rotationFactorX = mouseY / (10 / sensitivity)
                    const rotationFactorY = -mouseX / (10 / sensitivity)

                    rotationX = startingRotation.x - rotationFactorX
                    rotationY = startingRotation.y - rotationFactorY
                } else if (withSnapBack) {
                    rotationX = 0
                    rotationY = 0
                } else {
                    rotationX = rotateX.get()
                    rotationY = rotateY.get()
                }
            } else {
                const adjustedSensitivity = sensitivity / 10
                const rotationFactorX =
                    (clientY / innerHeight - 0.5) * adjustedSensitivity
                const rotationFactorY =
                    (clientX / innerWidth - 0.5) * adjustedSensitivity

                rotationX = -rotationFactorX * 180
                rotationY = rotationFactorY * 180
            }

            if (withRotationLimitX) {
                rotationX = Math.max(-minX, Math.min(maxX, rotationX))
            }
            if (withRotationLimitY) {
                rotationY = Math.max(-minY, Math.min(maxY, rotationY))
            }

            rotateX.set(rotationX)
            rotateY.set(rotationY)
        }

        window.addEventListener("mousemove", handleMove)
        window.addEventListener("touchmove", handleMove)
        return () => {
            window.removeEventListener("mousemove", handleMove)
            window.removeEventListener("touchmove", handleMove)
        }
    }, [
        isDragging,
        withDragging,
        withSnapBack,
        withRotationLimitX,
        withRotationLimitY,
        maxX,
        maxY,
        sensitivity,
    ])

    useEffect(() => {
        if (!isDragging && withDragging && withSnapBack) {
            rotateX.set(0)
            rotateY.set(0)
        }
    }, [isDragging])

    const handleOnStart = (e) => {
        const isTouchEvent = e.type.startsWith("touch")
        const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX
        const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY
        setIsDragging(true)
        setStartingRotation({ x: rotateX.get(), y: rotateY.get() })
        setStartingMousePosition({ clientX, clientY })
    }

    const handleOnEnd = () => setIsDragging(false)

    // Clone the children and apply preserve-3d to them as well
    const clonedChildren = cloneElement(children, {
        style: {
            ...children.props.style,
            transformStyle: "preserve-3d",
        },
    })

    return (
        <motion.div
            onPanStart={handleOnStart}
            onPanEnd={handleOnEnd}
            onTouchStart={handleOnStart}
            onTouchEnd={handleOnEnd}
            style={{
                ...style,
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
                transformPerspective: withPerspective
                    ? perspectiveValue
                    : undefined,
                userSelect: "none",
                touchAction: "none",
            }}
        >
            {clonedChildren}
        </motion.div>
    )
}

CursorRotation.displayName = "3D Look"

addPropertyControls(CursorRotation, {
    children: {
        title: "Element",
        type: ControlType.ComponentInstance,
    },
    sensitivity: {
        title: "Sensitivity",
        type: ControlType.Number,
        defaultValue: 2,
        step: 1,
        displayStepper: true,
        min: 1,
        max: 10,
    },
    draggingOptions: {
        type: ControlType.Object,
        title: "Dragging",
        controls: {
            withDragging: {
                title: "Enable",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            transition: {
                title: "Transition",
                type: ControlType.Transition,
                defaultValue: { type: "spring", stiffness: 600, damping: 100 },
                hidden(props) {
                    return !props.withDragging
                },
            },
            withSnapBack: {
                title: "Snap Back",
                type: ControlType.Boolean,
                defaultValue: false,
                hidden(props) {
                    return !props.withDragging
                },
            },
        },
    },
    rotationOptions: {
        type: ControlType.Object,
        title: "Rota. Limit",
        controls: {
            withRotationLimitX: {
                title: "Limit X",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            maxX: {
                title: "Max X",
                type: ControlType.Number,
                defaultValue: 90,
                step: 1,
                displayStepper: true,
                min: 0,
                max: undefined,
                hidden(props) {
                    return !props.withRotationLimitX
                },
            },
            minX: {
                title: "Min X",
                type: ControlType.Number,
                defaultValue: 90,
                step: 1,
                displayStepper: true,
                min: 0,
                max: undefined,
                hidden(props) {
                    return !props.withRotationLimitX
                },
            },
            withRotationLimitY: {
                title: "Limit Y",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            maxY: {
                title: "Max Y",
                type: ControlType.Number,
                defaultValue: 90,
                step: 1,
                displayStepper: true,
                min: 0,
                max: undefined,
                hidden(props) {
                    return !props.withRotationLimitY
                },
            },
            minY: {
                title: "Min Y",
                type: ControlType.Number,
                defaultValue: 90,
                step: 1,
                displayStepper: true,
                min: 0,
                max: undefined,
                hidden(props) {
                    return !props.withRotationLimitY
                },
            },
        },
    },
    perspectiveOptions: {
        type: ControlType.Object,
        title: "Perspective",
        description:
            "Need help with the component? Watch [this video](https://youtu.be/WdMR737ptFs).\nMore components at [Framer University](https://frameruni.link/cc).",
        controls: {
            withPerspective: {
                title: "Enable",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            perspectiveValue: {
                title: "Value",
                type: ControlType.Number,
                defaultValue: 1200,
                step: 100,
                min: 500,
                max: 5000,
                hidden(props) {
                    return !props.withPerspective
                },
            },
        },
    },
})
